
// not used anymore
// expects an array of integers whose sum is divisible by the length
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


String.prototype.rotate = function() {
	return this.substring(1) + this.substring(0, 1);
};


function more_info(info) {
	$('#more_info').append(info);
	$('#more_info').append('<br/>');
}



function Game() {
	var	current_possible_answers,
		score = 0,
		seconds_taken = 0,
		timer = null;


	function equal_siteswap(a, b) {
		for(var i = 0; i < b.length; ++i) {
			if (a == b) return true;
			b = b.rotate();
		}
		return false;
	}

	function correct_answer(attempt)  {
		for (var a in current_possible_answers) {
			if (equal_siteswap(current_possible_answers[a], attempt)) return true;
		}
		return false;
	}
	
	function show_score() {
		$('#score .value').html(score);
	}
	
	function show_time_taken() {
		$('#time_taken .value').html(seconds_taken);
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
	
	function stop_timer() {
		clearInterval(timer);
	}

	function score_form() {
		var name_label = $('<label>').attr('for', 'score_name').html('Name:'),
			name = $('<input name="score[name]" id="score_name" type="text" />'),
			score_input = $('<input name="score[score]" type="hidden" />').val(score),
			time = $('<input name="score[time]" type="hidden" />').val(seconds_taken),
			submit = $('<input type="submit" value="post score" />'),
			authenticity_token = $('<input type="hidden" name="authenticity_token" />').val(Base.authenticity_token),
			form = $('<form action="/scores" method="post" />');
		return form.append(name_label).append(name).append(score_input).append(time).append(authenticity_token).append(submit);
	}

	function finish_game() {
		stop_timer();
		$('#attempts input').attr('readonly', 'readonly');
		more_info('Game Over!');
		more_info(score_form());
	};

	function tick() {
		++seconds_taken;
		show_time_taken();
	}

	function setup_game() {
		new_problem();
		show_score();
		show_time_taken();
		$('#more_infos').empty();
		$('#done').click(finish_game);
		timer = setInterval(tick, 1000);
	}

	setup_game();
	
	// cheat
	// more_info($('<button></button>').html('Cheat').click(function() { $.each(current_possible_answers, function(i,e){ more_info(e); }); return false; }));
}

$(document).ready(function() {
	$('#new_game').click(function() { document.location.reload(); return false; }); // new_game doesn't work because there is no way to stop the timer yet
	$('#container').submit(function() { return false; });
	var game = new Game();
	
	$('#scores_button').click(function() { document.location = Base.scores_path; });
	$('#play_again').click(function() { document.location = Base.root_path; });
});