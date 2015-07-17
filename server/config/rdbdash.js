'use strict';

var r = require('rethinkdb');

var config = require('./default');

module.exports = r.connect({ host: config.rethinkdb.host, port: config.rethinkdb.port });