"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || 'development';
const express = require('express');
const bodyParser = require('body-parser');
const sass = require('node-sass-middleware');

const app = express();
const cookieSession = require('cookie-session');

const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require('./routes/users');

// Separate file with user related Db functions
const User = require('./helpers/Db_Queries.js')(knex);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_SECRET || 'development']
}));

// Mount all resource routes
app.use('/api/users', usersRoutes(knex));

// User main lists page
app.get('/lists', (req, res) => {
  if (req.session.id) {
    let ejsTemplate;
    User.findByID(req.session.id)
      .then((user) => {
        ejsTemplate = user[0];
      });
    User.count(req.session.id)
      .then((catCounts) => {
        catCounts.forEach((cat) => {
          ejsTemplate[cat.cat_code] = cat.count;
        });
        res.render('index', ejsTemplate);
      });
  }
  res.redirect('/login');
});

// User individual list page
app.get('/lists/:list', (req, res) => {
  if (req.session.id) {
    let ejsTemplate;
    User.findByID(req.session.id)
      .then((user) => {
        ejsTemplate = user[0];
      });
    User.makeList(req.session.id, req.params.list)
      .then((list) => {
        ejsTemplate.itemName = [];
        list.forEach((item) => {
          ejsTemplate.itemName.push(item.item_name);
        });
        res.render('list_page', ejsTemplate);
      });
  }
  res.redirect('/login');
});

// Force a login without authentication... Yes we know, bad bad
app.get('/login/:email', (req, res) => {
  User.findByEmail(req.params.email)
    .then((user) => {
      req.session.id = user[0].id;
    });
  res.redirect('/lists');
});

// User login page
app.get('/login', (req, res) => {
  if (req.session.id) {
    res.redirect('/lists');
  }
  res.render('login');
});

app.get('/towatch', (req, res) => {

  res.render('list_page');
});

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});
