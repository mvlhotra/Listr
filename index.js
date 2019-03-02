'use strict';

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
// The :status token will be colored red for server error codes, yellow for client error codes,
// cyan for redirection codes, and uncolored for all other codes.
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
  if (req.session) {
    let ejsTemplate = { hello: "hello" }
    User.findByID(req.session.user_id)
      .then((user) => {
        ejsTemplate = user[0];
        ejsTemplate.cookie = req.session;
      });
    User.count(req.session.user_id)
      .then((catCounts) => {
        catCounts.forEach((cat) => {
          ejsTemplate[cat.cat_code] = cat.count;
        });
        res.render('index', { ejsTemplate: ejsTemplate });
      });
  } else {
    res.redirect('/login');
  }
});

// User individual list page
app.get('/lists/:list', (req, res) => {
  if (req.session.user_id) {
    let ejsTemplate;
    User.findByID(req.session.user_id)
      .then((user) => {
        ejsTemplate = user[0];
        ejsTemplate.cookie = req.session;
      });
    User.makeList(req.session.user_id, req.params.list.toUpperCase())
      .then((list) => {
        ejsTemplate.item = [];
        list.forEach((item) => {
          ejsTemplate.item.push(item);
        });
        res.render('list_page', { ejsTemplate: ejsTemplate });
      });
  } else {
    res.redirect('/login');
  }
});

// Force a login without authentication... Yes we know, bad bad
// app.get('/login/:email', (req, res) => {
//   User.findByEmail(req.params.email)
//     .then((user) => {
//       req.session.user_id = user[0].id;
//       res.redirect('/lists');
//     });
// });

app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/lists');
});

// User login page
app.get('/login', (req, res) => {
  const ejsTemplate = { cookie: req.session };
  if (req.session.user_id) {
    res.redirect('/lists');
  } else {
    res.render('login', { ejsTemplate: ejsTemplate });
  }
});

// Register new user
app.get('/register', (req, res) => {
  const ejsTemplate = { cookie: req.session };
  if (req.session.user_id) {
    res.redirect('/lists');
  } else {
    res.render('register', { ejsTemplate: ejsTemplate });
  }
});

// Access user profile
app.get('/profile', (req, res) => {
  const ejsTemplate = { cookie: req.session };
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    res.render('profile', { ejsTemplate: ejsTemplate });
  }
});

// Add new item to a list
app.post('/lists/:list', (req, res) => {
  if (req.session.user_id) {
    User.insert(req.session.user_id, req.body.itemName, req.params.list)
      .then(() => {
        res.status(201).send();
      });
  } else {
    console.log('Must be a user');
  }
});

app.post('/lists/:list/:item', (req, res) => {
  if (req.session.user_id) {
    User.updateItem(req.params.item, req.body.newCat)
      .then(() => {
        res.status(201).send();
      });
  } else {
    console.log('Must be a user');
  }
});

app.post('/profile/:field', (req, res) => {
  if (req.session.user_id) {
    User.updateUser(req.session.user_id, req.body.input, req.params.field)
      .then(() => {
        res.status(201).send();
      });
  } else {
    console.log('Must be a user');
  }
});

// User login page
app.post('/logout', (req, res) => {
  req.session = null;
  res.render('login');
});

app.listen(PORT, () => {
  console.log('listening on ', PORT);
});

// User.updateItem(2, 'REA');

// User.updateUser(1, 'butts', 'last_name');

// User.insertItem(1, 'Insomnia', 'REA')
//   .then(() => {
//     console.log('did done it?');
//   });
