/*
 * This file is part of the benatespina.com.
 *
 * Copyright (c) 2015 Beñat Espiña <benatespina@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

'use strict';

var app, bodyParser, cookieParser, express, routes, session;

express = require('express');
cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
session = require('express-session');
routes = require('./routing');

app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(session({
  secret: 'benatespinapersonalweb',
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.set('view engine', 'jade');

app.set('views', './views');
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/'));
routes(app);

var port = process.env.PORT || 8081;
app.listen(port);
console.log('benatespina\'s web started on port ' + port);
