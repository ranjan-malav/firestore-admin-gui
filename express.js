var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var admin = require("firebase-admin");
// Step 1: Add Service acccount config downloaded from Firebase console in "service-account-key.json"
var serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Step 2: Replace firestore database URL
  databaseURL: "https://xxx-yyy.firebaseio.com"
});

var router = require('./routes/router');

var expressServer = express();
expressServer.use(cors());

// view engine setup
expressServer.set('views', path.join(__dirname, 'views'));
expressServer.set('view engine', 'jade');

expressServer.use(logger('dev'));
expressServer.use(express.json());
expressServer.use(express.urlencoded({ extended: false }));
expressServer.use(cookieParser());
expressServer.use(express.static(path.join(__dirname, 'public')));

expressServer.use('/', router);

// catch 404 and forward to error handler
expressServer.use(function (req, res, next) {
  next(createError(404));
});

// error handler
expressServer.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = expressServer;
