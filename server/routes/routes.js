'use strict';

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

	// app.get('/api/users', function (req, res, next) {

	// });

	// app.get('/api/collections', function (req, res, next) {

	// });

	// app.get('/api/words', function (req, res, next) {

	// });

	///// REST HANDLED BY FRONTEND /////////////////////////////

	app.get('*', function (req, res) {
		res.sendfile('./build/app/index.html');
	});

};
