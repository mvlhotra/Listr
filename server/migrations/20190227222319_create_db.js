
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
    }),
    knex.schema.createTable('category', table => {
      table.string('code').primary();
      table.string('cat_desc');
    }),
    knex.schema.createTable('list', table => {
      table.increments('id').primary();
      table.integer('user_id');
      table.string('cat_code');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.foreign('user_id').references('id').inTable('users');
      table.foreign('cat_code').references('code').inTable('category');
    }),
    knex.schema.createTable('source', table => {
      table.increments('id').primary();
      table.string('cat_code');
      table.string('source_name');
      table.string('source_desc');
      table.string('source_link');
      table.foreign('cat_code').references('code').inTable('category');
    }),
    knex.schema.createTable('item', table => {
      table.increments('id').primary();
      table.string('cat_code');
      table.string('item_name');
      table.date('updated');
      table.foreign('cat_code').references('code').inTable('category');

    }),
    knex.schema.createTable('list_item', table => {
      table.integer('list_id');
      table.integer('item_id');
      table.primary(['list_id', 'item_id']);
      table.foreign('list_id').references('id').inTable('list');
      table.foreign('item_id').references('id').inTable('item');
    })

  ])

};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('list_item'),
    knex.schema.dropTableIfExists('item'),
    knex.schema.dropTableIfExists('source'),
    knex.schema.dropTableIfExists('list'),
    knex.schema.dropTableIfExists('category'),
    knex.schema.dropTableIfExists('users')
  ]);
};