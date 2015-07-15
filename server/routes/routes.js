'use strict';

var config = require('../config/default');

var appUrl = config.url + ':' + config.ports.app;

module.exports = function (app, passport) {

	app.get('/account', isLoggedIn, function (req, res) {
		res.json(req.user);
	});

	app.get('/logout', function (req, res) {
		req.logut();
		res.redirect('/');
	});

	app.get('/auth/google', 
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// once google has authenticated the user
	app.get('/auth/google/callback', 
		passport.authenticate('google', { 
			successRedirect: appUrl + '/dashboard',
			failureRedirect: appUrl + '/login',
			successFlash: 'Welcome!',
			failureFlash: true
		})
	);

	app.get('*', function (req, res) {
		res.sendfile('./app/index.html');
	});

};

function isLoggedIn (req, res, next) {
	if (req.user) {
		return next();
	} else {
		return res.status(401).send('You\'re not logged in');
	}
}