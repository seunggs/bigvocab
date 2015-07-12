'use strict';

let rethinkdbdash = require('rethinkdbdash');

let r = rethinkdbdash({db: 'bigvocab'});

module.exports = r;