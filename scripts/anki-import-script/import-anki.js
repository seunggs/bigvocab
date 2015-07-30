'use strict';

var fs = require('fs');
var R = require('ramda');

// var log = function (x) { console.log(x); return x; };

fs.readFile('./anki-books-2015.txt', function (err, data) {
	
	if (err) {
		return console.log(err);
	}

	var words = data.toString();

	var createWordPair = R.compose(R.fromPairs, R.map(R.split('\t')), R.split('\n'));
	var wordPairs = createWordPair(words);

	console.log(wordPairs);

	fs.writeFile('./collection.json', wordPairs, function (err) {
		if (err) {
			return console.log(err);
		}
	});

});

