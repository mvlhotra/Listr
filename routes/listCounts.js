"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/:user", (req, res) => {
    knex('list_item').select('users.id', 'list_item.list_id', 'list.cat_code').count('list_item.item_id')
      .join('list', 'list.id', '=', 'list_item.list_id')
      .join('users', 'users.id', '=', 'list.user_id')
      .groupBy('list_item.list_id', 'list.cat_code', 'users.id')
      .having('users.id', '=', req.params.user)
      .orderBy('list_item.list_id')
      .then((countCats) => {
        res.json(countCats);
      });
  });
  return router;
};
