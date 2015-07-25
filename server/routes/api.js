'use strict';

var express = require('express');
var router = express.Router();
var r = require('../config/rdbdash');

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
router.route('/collections')

	// GET :: () -> [collections]
	.get(function (req, res) {
		r.table('collections')
			.run()
			.then(function (collections) {
				res.json(collections);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

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
router.route('/words')

	// GET :: () -> [words]
	.get(function (req, res) {
		r.table('words')
			.run()
			.then(function (words) {
				res.json(words);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

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

router.route('/words/:word')

	// PUT :: Params -> {word} -> {dbRes}
	.put(function (req, res) {
		var word = req.params.word;
		var newWord = req.body;

		r.table('words')
			.getAll(word, { index: 'word' })
			.update(newWord)
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
		var word = req.params.word;

		r.table('words')
			.getAll(word, { index: 'word' })
			.delete()
			.run()
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