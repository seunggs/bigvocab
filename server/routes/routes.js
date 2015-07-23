'use strict';

var r = require('../config/rdbdash');

module.exports = function (app, passport, router) {

	// AUTHENTICATION /////////////////////////////////////////////////
	
	router.get('/loggedin', function (req, res) {
		res.send(req.user ? req.user : false);
	});

	router.get('/logout', function (req, res) {
		req.logut();
		res.redirect('/');
	});

	router.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// once google has authenticated the user
	router.get('/auth/google/callback', 
		passport.authenticate('google', { 
			successRedirect: '/#/main-app/collections',
			failureRedirect: '/#/login',
			successFlash: 'Welcome!',
			failureFlash: true
		})
	);

	// API ////////////////////////////////////////////////////////////

	// app.get('/api/users', function (req, res) {

	// });

	/*
	/api/collections 
	 */
	router.route('/collections')

		// GET :: String -> Promise({Collection})
		.get('/api/collections', function (req, res) {
			var collectionId = req.body;
			console.log(collectionId);

			var collection = r.table('collections')
												.get(collectionId)
												.run();

			console.log(collection);
			res.send(collection);
		});

		// POST :: {a} -> Promise({a})
		.post('/api/collections', function (req, res) {
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
	
	// REGISTER OUR ROUTES
	// all of our routes will be prefixed with /api
	app.use('/api', router);
	
	// REST HANDLED BY FRONTEND ///////////////////////////////////////

	router.get('*', function (req, res) {
		res.sendfile('./build/app/index.html');
	});

};
