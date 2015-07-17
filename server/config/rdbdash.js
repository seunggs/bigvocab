'use strict';

var rethinkdbdash = require('rethinkdbdash');

var config = require('./default');

var r = rethinkdbdash({
	db: config.rethinkdb.db, 
	servers: [{
		host: config.rethinkdb.host,
		port: config.rethinkdb.port
	}]
});

/*
r.connect({ host: config.rethinkdb.host, port: config.rethinkdb.port }, function(err, conn) {
  console.log(err);
  console.log(conn);
});
*/

module.exports = r;