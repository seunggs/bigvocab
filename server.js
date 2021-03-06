'use strict';

require('dotenv').load();

var express = require('express');
var app = express();
var server = require('http').Server(app);
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOverride  = require('method-override');
var flash = require('connect-flash');
var passport = require('passport');
var favicon = require('serve-favicon');

var r = require('./server/config/rdbdash');
var moment = require('moment');

var config = require('./server/config/default');


// configuration ================================================
var port = config.port;

// set up express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 
app.use(express.static(__dirname + '/build/app')); 
app.use(favicon(__dirname + '/build/app/images/favicon/favicon.ico'));

// set up passport
require('./server/config/passport')(passport); // pass passport for configuration

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


// recurring code ================================================

function resetStudyCountAtMidnight () {
  function timeToMidnight () {
    var now = new Date();
    var endOfDay = moment().endOf('day');
    return endOfDay - now + 1000;
  }

  var attemptCount = 0;
  console.log(timeToMidnight());

  function resetAtMidnight () {
		r.table('users')
			.update({ studyCountToday: 0 })
			.run()
      .catch(function (err) {
        console.log('Something went wrong (attempt ', attemptCount , '): ', err);
        if (attemptCount <= 5) { // retry 5 times after waiting 2 seconds before each attempt
          attemptCount++;
          setTimeout(resetAtMidnight, 2000);
        }
      })
      .then(function () {
        setTimeout(resetAtMidnight, timeToMidnight());
      });
  }

  setTimeout(resetAtMidnight, timeToMidnight());
}

resetStudyCountAtMidnight();


// start app =====================================================
server.listen(port);
console.log('Listening on port: ', port);
