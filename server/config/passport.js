'use strict';

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var r = require('./rdbdash');

var configAuth = require('./oauth');

module.exports = function (passport) {

	// serialize the user for the session
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	// deserialize the user for the session
	passport.deserializeUser(function (id, done) {
		r.table('users')
			.get(id)
		 	.run()
		 	.then(function (user) {
		 		done(null, user);
		 	});
	});

	passport.use(new GoogleStrategy({
			clientID: configAuth.googleAuth.clientID,
			clientSecret: configAuth.googleAuth.clientSecret,
			callbackURL: configAuth.googleAuth.callbackURL
		}, loginCallbackHandler (function (profile) {
			return {
				login: profile.id,
				email: profile.emails[0].value,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				avatarUrl: profile.image.url,
				type: 'google'
			};
		}, 'google')
	));

};

function loginCallbackHandler (objMapper, type) {
	return function (token, refreshToken, profile, done) {
		if (token !== null) {
			console.log(profile);

			r.table('users')
				.getAll(profile.id, { index: 'login' })
				.filter({ type: type })
				.run()
				.then(function (users) {
					console.log(users);
					if (users.length > 0) {
						return done(null, users[0]);
					} else {
						r.table('users')
							.insert(objMapper(profile))
							.run()
							.then(function (dbRes) {
                return r.table('users')
			                  .get(dbRes.generated_keys[0])
			                  .run();
							})
							.then(function (newUserKey) {
								return done(null, newUserKey);
							});
					}
				})
				.catch(function (err) {
					console.log('Error getting User', err);
				});
		}
	};
}