'use strict';

module.exports = {
	appUrl: 'http://www.bigvocab.com',
	port: process.env.PORT || 8000,
	rethinkdb: {
		host: process.env.RDB_HOST,
		port: process.env.RDB_PORT,
		db: 'bigvocab'
	}
};