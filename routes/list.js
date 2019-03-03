'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get('/:list/:user', (req, res) => {
    knex('users').select('item.id', 'item.item_name', 'list.cat_code')
      .join('list', 'list.user_id', '=', 'users.id')
      .join('list_item', 'list_item.list_id', '=', 'list.id')
      .join('item', 'item.id', '=', 'list_item.item_id')
      .where({ 'users.id': req.params.user })
      .where({ 'item.cat_code': req.params.list.toUpperCase() })
      .then((list) => {
        res.json(list);
      });
  });

  return router;
};
