
function is_valid(values) {
	var to_check,
		places = [],
		period = values.length;
		
	for (var i = 0; i < period; ++i) {
		to_check = (i + values[i]) % period;
		if (places[to_check])
			return false;
		places[to_check] = true;
	}
	
	return true;
}



function numbers_from_string(s) {
	return $.map(s.split(''), function(i){ return parseFloat(i, 10); });
}

function new_game() {
	var numbers = [], sorted_anagram;
	
	for (var i=0; i < 6; ++i) numbers.push(Math.round(Math.random() * 9));

	var sum = 0;
	$.each(numbers, function(i, e) { sum += e; });
	numbers.push(7 - (sum % 7));

	$('#original').html(numbers.join(''));
	sorted_anagram = numbers.sort().join('');

	Base.log(siteswap_anagrams[sorted_anagram]);
	// for(var answer in siteswap_anagrams[sorted_anagram]) {
	// 	$('#answers').append('<li>' + siteswap_anagrams[sorted_anagram][answer] + '</li>');
	// }
}

$(document).ready(function() {

	$('button#give_anagrams').click(function() {
		var value = $('input').val(),
			numbers = numbers_from_string(value),
			sorted_anagram = numbers.sort().join('');
			
		window.console.log('give anagrams', numbers);
		for(var answer in siteswap_anagrams[sorted_anagram]) {
			window.console.log(sorted_anagram, siteswap_anagrams[sorted_anagram], siteswap_anagrams[sorted_anagram][answer]);
			$('#results').prepend('<li>' + siteswap_anagrams[sorted_anagram][answer] + '</li>');
		}
	});
	
	$('button#try').click(function() {
		var value = $('input').val(),
			values = numbers_from_string(value);
		
		if (is_valid(values))
			$('#results').prepend('<li>' + value + ': valid</li>');
		else
			$('#results').prepend('<li>' + value + ': invalid</li>');
		
	});
});