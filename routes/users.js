"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
<<<<<<< HEAD
      .from("users")
=======
      .from("items")
>>>>>>> jquery
      .then((results) => {
        res.json(results);
      });
  });

  return router;
};
