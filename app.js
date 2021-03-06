// 加载express框架
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon=require('serve-favicon');
var ejs = require('ejs');

var routes = require('./routes/routes');
var router = express.Router();

// 创建一个express实例
var app = express();

// view engine setup

app.set('views', path.join(__dirname, 'build'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(favicon(__dirname + '/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// 创建session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// 路由配置
routes(app, router);

module.exports = app;
