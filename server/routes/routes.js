'use strict';

var r = require('../config/rdbdash');

module.exports = function (app, passport) {

	///// AUTHENTICATION ///////////////////////////////////////
	
	app.get('/loggedin', function (req, res) {
		res.send(req.user ? req.user : false);
	});

	app.get('/logout', function (req, res) {
		req.logut();
		res.redirect('/');
	});

	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// once google has authenticated the user
	app.get('/auth/google/callback', 
		passport.authenticate('google', { 
			successRedirect: '/#/main-app/collections',
			failureRedirect: '/#/login',
			successFlash: 'Welcome!',
			failureFlash: true
		})
	);

	///// API //////////////////////////////////////////////////

	// app.get('/api/users', function (req, res) {

	// });

	/*
		/api/collections GET :: String -> Promise({Collection})
	 */
	app.get('/api/collections', function (req, res) {
		var collectionId = req.body;
		console.log(collectionId);

		var collection = r.table('collections')
											.get(collectionId)
											.run();

		console.log(collection);
		res.send(collection);
	});

	/*
		/api/collections POST :: {a} -> Promise({a})
	 */
	app.post('/api/collections', function (req, res) {
		var collection = req.body;
		console.log(collection);

		var addCollection = r.table('collections')
													.insert(collection)
													.run();

		console.log(addCollection);
		res.send(addCollection);
	});

	// app.get('/api/words', function (req, res) {

	// });

	///// REST HANDLED BY FRONTEND /////////////////////////////

	app.get('*', function (req, res) {
		res.sendfile('./build/app/index.html');
	});

};
