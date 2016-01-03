require('dotenv').load();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var resJsonWithStatusCode = require("./middlewares/resJsonWithStatusCode");
var suppressStatusCode = require("./middlewares/suppressStatusCode");

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web/dist')));
app.use(suppressStatusCode);
app.use(resJsonWithStatusCode);

//controllers
var slackController = require('./controller/slack');
var userController = require('./controller/user');

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//test
app.get("/", function (req, res) {
  res.send("The server is working");
})

app.get("/test", function(req, res) {
  res.json({ messsage: "OK"})
})

app.post("/testDatabse", userController.testDatabase);

//sample data
app.get("/sampleData", userController.testData);

//from slack
app.post("/postUrl", slackController.urlFromSlack);

//to users
app.get("/getList", userController.getList);
app.get("/getListByTime", userController.getListByTime);
app.get("/getListById", userController.getListById);

// Authentication via Slack
app.get("/oauth/slack", slackController.requestOAuth);
app.get("/oauth/slack/callback", slackController.callbackOAuth);


module.exports = app;
