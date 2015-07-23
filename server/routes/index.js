'use strict';

var express = require('express');
var router = express.Router();

router.use('/auth', require('./auth'));
router.use('/api', require('./api'));

// rest handled by frontend
router.get('*', function (req, res) {
	res.sendfile('../../build/app/index.html');
});

module.exports = router;