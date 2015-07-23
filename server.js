'use strict';

require('dotenv').load();

var express = require('express');
var app = express();
var server = require('http').Server(app);
//var io = require('socket.io')(server);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride  = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');

var config = require('./server/config/default');


// configuration ================================================

var port = config.port;

// passport configuration
require('./server/config/passport')(passport); // pass passport for configuration

// set up express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/build/app')); 

// required for passport
app.use(session({
	secret: 'bigvocabsecretkeyplease',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


// routes ========================================================
app.use('/', require('./server/routes'));

// start app =====================================================
server.listen(port);
console.log('Listening on port: ', port);
