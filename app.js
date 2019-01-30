var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
connection();

var Register = require('./models/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
//HTML 페이지 파싱
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

/**
 * DB 접속
 */
function connection(){

    var db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function () {
        console.log("Connected to mongod server");
    });

    mongoose.connect('mongodb://localhost/regbus');
}

var router = require('./routes/index.js');
router(app,Register);

/// catch 404 and forwarding to error handler
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

// development error handler
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

//app.use(function(err,req,res,next){
//    res.status(err.status || 500);
//    res.render('error',{
//        message:err.message,
//        error:{}
//    });
//});

app.listen(80);
module.exports = app;