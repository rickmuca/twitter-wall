var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Twitter = require('twitter');

var twitter_client = new Twitter({
    consumer_key: 'l0RgpgwZqmFHELC4mLFbweiPn',
    consumer_secret: 'elePPB56ILavK7sGmcpvZqn1LuENe5B6ikLMYILpZIyH1w2HDd',
    access_token_key: '1903965426-BX530HWvnDW6uEt7F8ezpnsuCzNjGlrjVpY2Lwd',
    access_token_secret: '4iZ6r19k7tWlxT4nYa4oQbj2KMFeUyK9vEweYdpgaQ7Gf'
});

twitter_client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
    stream.on('data', function(tweet) {
        console.log(tweet.text);
    });

    stream.on('error', function(error) {
        throw error;
    });
});

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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


module.exports = app;
