'use strict';

var config = require('./default');

var httpUrl = config.url + ':' + config.ports.http;

module.exports = {
	googleAuth: {
		clientID: '214976268586-3bvvotanee7gco45b7c65u00oapa3rkf.apps.googleusercontent.com',
		clientSecret: '8yIVBYZtmYTKuvo-qY8D0-bN',
		callbackURL: httpUrl + '/auth/google/callback'
	}
};
