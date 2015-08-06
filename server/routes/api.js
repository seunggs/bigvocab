'use strict';

var express = require('express');
var router = express.Router();
var r = require('../config/rdbdash');
var moment = require('moment');
var R = require('ramda');
var $q = require('bluebird');

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
		var userUpdate = req.body;

		r.table('users')
			.get(userId)
			.update(userUpdate)
			.run()
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Colletions routes //////////////////////////////////////////////////

router.route('/:userId/collections')

	// GET :: Params -> [collections]
	.get(function (req, res) {
		var userId = req.params.userId;

		r.table('users')
			.get(userId)
			.run()
			.then(function (user) {
				var maxDailyWords = user.maxDailyWords;

				return r.table('collections')
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
												return word('nextReviewEpochTime').lt(r.now().toEpochTime());
											})
											.limit(maxDailyWords)
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
								.run();
			})
			.then(function (collections) {
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

router.route('/collections/:collectionId')

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
				console.log(dbRes);
				return r.table('words')
								.getAll(collectionId, { index: 'collectionId' })
								.delete()
								.run();
			})
			.then(function (dbRes) {
				console.log(dbRes);
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

router.route('/collections/merge/:collectionId')

	// PUT :: Params -> String -> {dbRes}
	.put(function (req, res) {

		var collectionId = req.params.collectionId;
		var newCollectionId = req.body.newCollectionId;

		r.table('words')
			.getAll(collectionId, { index: 'collectionId' })
			.update({ collectionId: newCollectionId })
			.run()
			.then(function () {
				return r.table('collections')
								.get(collectionId)
								.delete()
								.run();
			})
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});

	});

// Words routes ///////////////////////////////////////////////////////

router.route('/:collectionId/words')

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
				r.table('collections')
					.get(collectionId)
					.run()
					.then(function (collection) {
						var userId = collection.userId;

						return r.table('users')
										.get(userId)
										.run();
					})
					.then(function (user) {
						var maxDailyWords = user.maxDailyWords;

						return r.table('words')
										.getAll(collectionId, { index: 'collectionId' })
										.filter(r.row('nextReviewEpochTime').lt(r.now().toEpochTime()))
										.limit(maxDailyWords)
										.run();
					})
					.then(function (words) {
						res.json(words);
					})
					.catch(function (err) {
						res.send(err);
					});

				break;
		}

	});

router.route('/:collectionId/words/:word')

	// GET :: Params -> Params -> {word}
	// GET :: Params -> Params -> Query -> {word}
	.get(function (req, res) {

		var collectionId = req.params.collectionId;
		var word = req.params.word;
		var exists = req.query.exists !== undefined ? true : undefined;
		var sendBack;
		console.log('exists: ', exists);

		r.table('words')
			.getAll(collectionId, { index: 'collectionId' })
			.filter({ word: word })
			.run()
			.then(function (word) {
				if (word.length > 0) {
					sendBack = exists === undefined ? word : true;
					console.log('sendBack: ', sendBack);
					res.json(sendBack);
				} else {
					sendBack = exists === undefined ? word : false;
					console.log('sendBack: ', sendBack);
					res.json(sendBack);
				}
			})
			.catch(function (err) {
				res.send(err);
			});

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

// all words for the user, not just in a collection
router.route('/words/all/:userId')

	// GET :: Params -> [a]
	.get(function (req, res) {
		var userId = req.params.userId;

		r.table('collections')
			.getAll(userId, { index: 'userId' })
			.run()
			.then(function (collections) {
				var promises = [];
				collections.forEach(function (collection) {
					var collectionId = collection.id;

					promises.push(r.table('words')
													.getAll(collectionId, { index: 'collectionId' })
													.run()
					);
				});

				return $q.all(promises);
			})
			.then(function (wordsArray) {
				var words = wordsArray.reduce(function (prev, curr) {
					return prev.concat(curr);
				}, []);

				res.json(words);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Import routes //////////////////////////////////////////////////////

router.route('/import/anki/:userId')

	// POST :: {collectionId, [files]} -> Params -> {dbRes}
	.post(function (req, res) {

		var collection = {
			userId: req.params.userId,
			title: req.body.collectionTitle
		};

		var files = req.body.files;

		// convert txt file content to word pairs
		// createWordPairs :: {a} -> [[String, String]]
		var createWordPairs = R.compose(R.map(R.split('\t')), R.split('\n'), R.prop('content'));

		// merge multiple word pair collections from multiple files
		// mergeWordPairs :: [[[String, String]]] -> [[String, String]]
		var mergeWordPairs = R.chain(createWordPairs);
		var mergedWordPairs = mergeWordPairs(files);

		// set up the import to start 100 words per day
		var wordsPerDay = 500; 

		r.table('collections')
			.insert(collection)
			.run()
			.then(function (dbRes) {

				var counter = 0;

				var words = mergedWordPairs
					.filter(function (wordPair) {
						return wordPair[0] !== '';
					})
					.map(function (wordPair) {

						counter++;

			      var lastReviewed = moment();
			      var lastReviewedEpochTime = lastReviewed.unix();

			      // start 100 words per day
			      var nextReview = moment().add(1, 'minutes').add(Math.floor(counter / wordsPerDay), 'days');
			      var nextReviewEpochTime = nextReview.unix();

						var word = {
							word: wordPair[0],
							definition: wordPair[1],
							collectionId: dbRes.generated_keys[0],
							lastReviewed: lastReviewedEpochTime,
							interval: 1,
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

				return r.table('words')
								.insert(words)
								.run();
			})
			.then(function (dbRes) {
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});

	});

// Tests routes ///////////////////////////////////////////////////////

// router.route('/tests')

module.exports = router;