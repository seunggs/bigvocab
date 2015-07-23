'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/loggedin', function (req, res) {
	res.send(req.user ? req.user : false);
});

router.get('/logout', function (req, res) {
	req.logut();
	res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

// once google has authenticated the user
router.get('/google/callback', 
	passport.authenticate('google', { 
		successRedirect: '/#/main-app/collections',
		failureRedirect: '/#/login',
		successFlash: 'Welcome!',
		failureFlash: true
	})
);

module.exports = router;