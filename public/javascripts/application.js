
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


function new_game() {
	var sorted_anagram, current_possible_answers;


	function correct_answer(attempt)  {
		for (var a in current_possible_answers) {
			if (current_possible_answers[a] == attempt) return true;
		}
		return false;
	}
	
	function output_result(to, value) {
		return $(to).parent().find('.result').html(value);
	}
	
	function have_duplicate_answer(input, attempt) {
		var found_duplicate_answer = false;
		input.parent().parent().find('input').not(input).each(function(index) {
			if ($(this).val() == attempt) found_duplicate_answer = true;
		});
		return found_duplicate_answer;
	}

	function setup_handlers() {
		$('#attempts input').keyup(function() {
			var input = $(this),
				attempt = $(this).val();
			
			input.parent().find('.result').empty();
			if (attempt.length != 7) return;

			if (correct_answer(attempt)) {
				if (have_duplicate_answer(input, attempt)) {
					output_result(input, 'duplicate answer');
				} else {
					output_result(input, 'ok');
					input.attr('readonly', 'readonly');
					input.parent().next().find('input').focus();
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

	function setup_game() {
		var numbers = create_siteswap();
		$('#problem').html(numbers.join(''));
		$('#attempts').empty();
		sorted_anagram = numbers.sort().join('');
		current_possible_answers = siteswap_anagrams[sorted_anagram];
	
		Base.log(current_possible_answers);
		$.each(current_possible_answers, function() {
			$('#attempts').append('<li><input type="text" /><span class="result"></span></li>');
		});
		
		setup_handlers();
	}

	setup_game();
	
	return false;
}

$(document).ready(function() {
	$('#new_game').click(new_game);
	$('#container').submit(function() { return false; });
});