#!/usr/local/bin/node

var express = require('express'),
		geoid = require('./geoid'),
		app = express();

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// GET /javascripts/jquery.js
// GET /style.css
// GET /favicon.ico
app.use(express.static(__dirname + '/public'));


app.get('/geoid/:lat/:lng', function(req, res){
	geoid(req.params.lat, req.params.lng, function(err, height){
		res.send(height);
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});


function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

