'use strict';

var r = require('rethinkdb');

var config = require('./default');

r.connect({ host: config.rethinkdb.host, port: config.rethinkdb.port }, function(err, conn) {
  console.log(err);
  console.log(conn);
});

module.exports = r;