'use strict';

module.exports = {
	port: process.env.PORT || 8000,
	rethinkdb: {
		host: process.env.RDB_HOST || 'localhost',
		port: process.env.RDB_PORT || 28015,
		db: 'bigvocab'
	}
};
