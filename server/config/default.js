'use strict';

module.exports = {
	url: 'http://localhost',
	ports: {
		app: 3000,
		http: 8000
	},
	rethinkdb: {
		host: process.env.RDB_HOST,
		port: process.env.RDB_PORT,
		db: 'bigvocab'
	}
};
