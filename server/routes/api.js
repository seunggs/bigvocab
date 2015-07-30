'use strict';

var express = require('express');
var router = express.Router();
var r = require('../config/rdbdash');
var R = require('ramda');

// Users routes ///////////////////////////////////////////////////////
router.route('/users')

	// GET :: () -> [users]
	.get(function (req, res) {
		r.table('users')
			.run()
			.then(function (users) {
				res.json(users);
			})
			.catch(function (err) {	
				res.send(err);
			});
	});

router.route('/users/:userId')

	// GET :: Params -> {user}
	.get(function (req, res) {
		var userId = req.params.userId;

		r.table('users')
			.get(userId)
			.run()
			.then(function (user) {
				res.json(user);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// PUT :: Params -> {user} -> {dbRes}
	.put(function (req, res) {
		var userId = req.params.userId;
		var user = req.body;

		r.table('users')
			.get(userId)
			.update(user)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Colletions routes //////////////////////////////////////////////////
router.route('/collections/:userId')

	// GET :: Params -> [collections]
	.get(function (req, res) {
		var userId = req.params.userId;

		r.table('collections')
			.getAll(userId, { index: 'userId' })
			.map(function (collection) {
				return collection.merge({
					totalWordCount: r.table('words')
						.getAll(collection('id'), { index: 'collectionId' })
						.count()
				});
			})
			.map(function (collection) {
				return collection.merge({
					dueWordCount: r.table('words')
						.getAll(collection('id'), { index: 'collectionId' })
						.filter(function (word) {
							return word('nextReviewEpochTime').lt(r.now().toEpochTime())
						})
						.count()
				});
			})
			.map(function (collection) {
				return collection.merge({
					newWordCount: r.table('words')
						.getAll(collection('id'), { index: 'collectionId' })
						.filter({
							reviewRes: {
								again: 0,
								hard: 0,
								good: 0,
								easy: 0
							}
						})
						.count()
				});
			})
			.run()
			.then(function (collections) {
				console.log(collections);
				res.json(collections);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

router.route('/collections')	

	// POST :: {collection} -> {dbRes}
	.post(function (req, res) {
		var collection = req.body;

		r.table('collections')
			.insert(collection)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

router.route('/collections/:colletionId')

	// GET :: Params -> {collection}
	.get(function (req, res) {
		var collectionId = req.params.collectionId;

		r.table('collections')
			.get(collectionId)
			.run()
			.then(function (collection) {
				res.json(collection);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// PUT :: Params -> {collection} -> {dbRes}
	.put(function (req, res) {
		var collectionId = req.params.collectionId;
		var newCollection = req.body;

		r.table('collections')
			.get(collectionId)
			.update(newCollection)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// DELETE :: Params -> {dbRes}
	.delete(function (req, res) {
		var collectionId = req.params.collectionId;

		r.table('collections')
			.get(collectionId)
			.delete()
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Words routes ///////////////////////////////////////////////////////
router.route('/words/:collectionId')

	// GET :: Params -> [words]
	// GET :: Params -> Query('filter') -> [words]
	.get(function (req, res) {

		var collectionId = req.params.collectionId;

		// get all words in the collection
		switch (req.query.filter) {

			case undefined:
				r.table('words')
					.getAll(collectionId, { index: 'collectionId' })
					.run()
					.then(function (words) {
						res.json(words);
					})
					.catch(function (err) {
						res.send(err);
					});
				break;

			case 'dueToday':
				r.table('words')
					.getAll(collectionId, { index: 'collectionId' })
					.filter(r.row('nextReviewEpochTime').lt(r.now().toEpochTime()))
					.run()
					.then(function (words) {
						res.json(words);
					})
					.catch(function (err) {
						res.send(err);
					});
				break;

		}

	});

router.route('/words')

	// POST :: {word} -> {dbRes}
	.post(function (req, res) {
		var word = req.body;

		r.table('words')
			.insert(word)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

router.route('/words/:wordId')

	// PUT :: Params -> {word} -> {dbRes}
	.put(function (req, res) {
		var wordId = req.params.wordId;
		var wordUpdate = req.body;

		console.log(wordUpdate);

		r.table('words')
			.get(wordId)
			.update(wordUpdate)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// DETELE :: Params -> {dbRes}
	.delete(function (req, res) {
		var wordId = req.params.wordId;

		r.table('words')
			.get(wordId)
			.delete()
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Import routes //////////////////////////////////////////////////////
router.route('/import/anki/:userId')

	// POST :: {collectionId, [files]} -> Params -> {dbRes}
	.post(function (req, res) {
		// TODO: first create collection in collections table; then get collectionId and create words in words table
		var collection = {
			userId: req.params.userId,
			collectionTitle: req.body.collectionTitle
		};

		var files = req.body.files;

		// createWordPairs :: String -> [[a, a]]
		var createWordPairs = R.compose(R.map(R.split('\t')), R.split('\n'));

		// convert txt to word pairs and merge all files
		var mergedWordPairs = R.chain(createWordPairs, files);

		r.table('collections')
			.insert(collection)
			.run()
			.then(function (dbRes) {

				var words = mergedWordPairs.map(function (wordPair) {
					
	        var lastReviewed = moment();
	        var nextReview = moment().add(1, 'minutes');
	        var nextReviewEpochTime = nextReview.unix();

					var word = {
						word: wordPair[0],
						definition: wordPair[1],
						collectionId: dbRes.generated_keys[0],
	          lastReviewed: lastReviewed,
	          interval: 1,
	          nextReview: nextReview,
	          nextReviewEpochTime: nextReviewEpochTime,
	          phase: 'learning',
	          reviewRes: {
	            again: 0,
	            hard: 0,
	            good: 0,
	            easy: 0
	          },
	          easeFactor: 2.5
					};

					return word;

				});

				console.log(words);

				r.table('words')
					.insert(words)
					.run()
					.then(function (dbRes) {
						res.json(dbRes);
					})
					.catch(function (err) {
						res.send(err);
					})

			})
			.catch(function (err) {
				res.send(err);
			});

	});


// Tests routes ///////////////////////////////////////////////////////
// router.route('/tests')

module.exports = router;