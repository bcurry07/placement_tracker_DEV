//sandbox server.js

var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//var routes = require('./routes/index');

var placementModel = require('./server/models/Placement');
var placements = require('./server/controllers/placements');


//set environment variable to development by default
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//create express app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);



//**************************************************************************



if(env === 'development') {
    //EDIT: change "untitled" to name of app root directory
    mongoose.connect('mongodb://localhost/sandbox');
} else {
    //EDIT: mongolab.com hosted db connection string
    mongoose.connect('mongodb://sandbox:sandbox@ds051858.mongolab.com:51858/sandbox');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('db opened');
});

placementModel.createDefaultPlacements();

//*****************************************************************************

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});

app.get('/api/placements/:placementId', placements.getPlacement);

app.get('/api/placements', placements.getPlacements);

app.put('/api/placements/:placementId', placements.updatePlacement);

app.post('/api/placements', placements.addPlacement);

app.get('/api/billingclients', placements.getBillingClients);

app.delete('/api/placements/:placementId', placements.deletePlacement);

app.all('/api/*', function(req, res) {
   res.send(404);
});

//creates a "catch-all" route that always serves up index page and leaves routing responsibility to client-side (caution: dangerous if routing is messed up)
//app.get('*', function(req, res) {
//    res.render('index');
//});

app.get('*', function(req, res) {
    res.render('index');
});














//******************************************************************************





/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

//I created this but it should work standard for all apps
var port = process.env.PORT || 8000;
app.listen(port);
