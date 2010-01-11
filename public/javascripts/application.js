
// not used anymore
function is_valid(values) {
	var catch_position,
		catches = [],
		period = values.length;
		
	for (var i = 0; i < period; ++i) {
		catch_position = (i + values[i]) % period;
		if (catches[catch_position])
			return false;
		catches[catch_position] = true;
	}
	
	return true;
}



function numbers_from_string(s) {
	return $.map(s.split(''), function(i){ return parseFloat(i, 10); });
}


function more_info(info) {
	$('#more_info').append(info);
	$('#more_info').append('<br/>');
}

function new_game() {
	var	current_possible_answers,
		score = 0,
		seconds_left = 2 * 60,
		timer = null;


	function correct_answer(attempt)  {
		for (var a in current_possible_answers) {
			if (current_possible_answers[a] == attempt) return true;
		}
		return false;
	}
	
	function show_score() {
		$('#score .value').html(score);
	}
	
	function show_time_left() {
		$('#time_left .value').html(seconds_left);
	}
	
	function output_result(to, value) {
		return $(to).parent().find('.result').html(value);
	}
	
	function have_duplicate_answer(input, attempt) {
		var found_duplicate_answer = false;
		input.parent().parent().find('input').not(input).each(function() {
			if ($(this).val() == attempt) found_duplicate_answer = true;
		});
		return found_duplicate_answer;
	}
	
	function all_finished() {
		var found_unfinished = false;
		$('#attempts input').each(function() {
			if (!$(this).attr('readonly')) found_unfinished = true;
		});
		return !found_unfinished;
	}

	function setup_handlers() {
		$('#attempts input').keyup(function() {
			var input = $(this),
				attempt = $(this).val();
				
			if (input.attr('readonly')) return;
			input.parent().find('.result').empty();
			if (attempt.length != 7) return;

			if (correct_answer(attempt)) {
				if (have_duplicate_answer(input, attempt)) {
					output_result(input, 'duplicate answer');
				} else {
					output_result(input, 'ok');
					input.attr('readonly', 'readonly');
					input.parent().next().find('input').focus();
					++score;
					show_score();
					
					if (all_finished()) {
						$('#attempts').append('<li><button id="next">Next</button></li>');
						$('#attempts #next').click(new_problem);
					}
				}
			} else {
				output_result(input, 'incorrect');
			}
		});
	}

	function create_siteswap() {
		var period = 7, numbers = [];
		// start with random numbers
		for (var i=0; i < period-1; ++i) numbers.push(Math.round(Math.random() * 9));

		// determine the last number to make the sum divisible by the period
		var sum = 0;
		$.each(numbers, function(i, e) { sum += e; });
		numbers.push(period - (sum % period));
		return numbers;
	}

	function new_problem() {
		var numbers = create_siteswap(), sorted_anagram = numbers.sort().join('');
		$('#problem').html(numbers.join(''));
		$('#attempts').empty();
		current_possible_answers = siteswap_anagrams[sorted_anagram];
	
		Base.log(current_possible_answers);
		$.each(current_possible_answers, function() {
			$('#attempts').append('<li><input type="text" /><span class="result"></span></li>');
		});
		
		setup_handlers();
	}

	function finish_game() {
		$('#attempts input').attr('readonly', 'readonly');
		more_info('Game Over!');
	}

	function countdown() {
		--seconds_left;
		show_time_left();
		if (seconds_left == 0) {
			finish_game();
			clearInterval(timer);
		}
	}

	function setup_game() {
		new_problem();
		show_score();
		show_time_left();
		$('#more_infos').empty();
		timer = setInterval(countdown, 1000);
	}

	setup_game();
	
	// cheat
	// more_info($('<button></button>').html('Cheat').click(function() { $.each(current_possible_answers, function(i,e){ more_info(e); }); return false; }));
	return false;
}

$(document).ready(function() {
	$('#new_game').click(new_game);
	$('#container').submit(function() { return false; });
	new_game();
});