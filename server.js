'use strict';

let express = require('express'),
		app = express(),
		server = require('http').Server(app),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		methodOverride  = require('method-override'),
		flash = require('connect-flash'),
		passport = require('passport'),
		io = require('socket.io')(server);

// configuration ================================================

const port = process.env.PORT || 8080;

// passport configuration
// require('./config/passport')(passport); // pass passport for configuration

// set up express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/app')); 

// required for passport
app.use(session({secret: 'bigvocabsecret'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


// routes ========================================================
require('./server/routes')(app, passport); // configure our routes

// start app =====================================================
server.listen(port);
console.log('Listening on port: ', port);