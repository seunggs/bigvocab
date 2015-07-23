'use strict';

var express = require('express');
var router = express.Router();
var r = require('../config/rdbdash');

// Users routes ----------------------
// router.route('/users');

// Colletions routes ----------------------
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
		console.log(collection);

		r.table('collections')
			.insert(collection)
			.run()
			.then(function (dbRes) {
				console.log(dbRes);
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

router.route('/collections/:colletionId')

	// GET :: Params(String) -> {collection}
	.get(function (req, res) {
		var collectionId = req.params.collectionId;
		console.log(collectionId);

		r.table('collections')
			.get(collectionId)
			.run()
			.then(function (collection) {
				console.log(collection);
				res.json(collection);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// PUT :: Params(String) -> {collection} -> {dbRes}
	.put(function (req, res) {
		var collectionId = req.params.collectionId;
		var newCollection = req.body;
		console.log(collectionId);
		console.log(newCollection);

		r.table('collections')
			.get(collectionId)
			.update(newCollection)
			.run()
			.then(function (dbRes) {
				console.log(dbRes);
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	})

	// DELETE :: Params(String) -> {dbRes}
	.delete(function (req, res) {
		var collectionId = req.params.collectionId;
		console.log(collectionId);

		r.table('collections')
			.get(collectionId)
			.delete()
			.run()
			.then(function (dbRes) {
				console.log(dbRes);
				res.json(dbRes);
			})
			.catch(function (err) {
				res.send(err);
			});
	});

// Words routes ----------------------
// router.route('/words');

module.exports = router;