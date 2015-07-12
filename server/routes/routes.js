'use strict';

module.exports = function (app, passport) {
	app.get('*', function (req, res) {
		res.sendfile('./app/index.html');
	});
};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
}