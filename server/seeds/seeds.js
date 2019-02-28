exports.seed = function (knex, Promise) {
  return Promise.all([
    knex('list_item').del(),
    knex('item').del(),
    knex('list').del(),
    knex('category').del(),
    knex('users').del(),

    knex('users').insert({ "id": 1, "first_name": "Katee", "last_name": "Tovey", "email": "ktovey0@mapquest.com", "password": "vhelLDbG6O" }),
    knex('users').insert({ "id": 2, "first_name": "Aila", "last_name": "Beazley", "email": "abeazley1@economist.com", "password": "DS4mAxiDdG" }),
    knex('users').insert({ "id": 3, "first_name": "Durante", "last_name": "Duncanson", "email": "dduncanson2@bloomberg.com", "password": "ciNh75" }),
    knex('users').insert({ "id": 4, "first_name": "Belicia", "last_name": "Kemshell", "email": "bkemshell3@utexas.edu", "password": "G5hKIpFZ" }),
    knex('users').insert({ "id": 5, "first_name": "Nolly", "last_name": "Feeley", "email": "nfeeley4@loc.gov", "password": "1TSf39jV1y5m" }),

    knex('category').insert({ code: 'EAT', cat_desc: 'To Eat' }),
    knex('category').insert({ code: 'WAT', cat_desc: 'To Watch' }),
    knex('category').insert({ code: 'BUY', cat_desc: 'To Buy' }),
    knex('category').insert({ code: 'REA', cat_desc: 'To Sell' })
  ]).then(() => {
    return Promise.all([
      knex('list').insert({ id: 1, user_id: 1, cat_code: 'EAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 2, user_id: 1, cat_code: 'REA', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 3, user_id: 1, cat_code: 'BUY', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 4, user_id: 1, cat_code: 'WAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 5, user_id: 2, cat_code: 'EAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 6, user_id: 2, cat_code: 'REA', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 7, user_id: 2, cat_code: 'BUY', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 8, user_id: 2, cat_code: 'WAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 9, user_id: 3, cat_code: 'EAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 10, user_id: 3, cat_code: 'REA', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 11, user_id: 3, cat_code: 'BUY', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 12, user_id: 3, cat_code: 'WAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 13, user_id: 4, cat_code: 'EAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 14, user_id: 4, cat_code: 'REA', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 15, user_id: 4, cat_code: 'BUY', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 16, user_id: 4, cat_code: 'WAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 17, user_id: 5, cat_code: 'EAT', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 18, user_id: 5, cat_code: 'REA', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 19, user_id: 5, cat_code: 'BUY', created_at: '2018-02-27', updated_at: '2018-02-28' }),
      knex('list').insert({ id: 20, user_id: 5, cat_code: 'WAT', created_at: '2018-02-27', updated_at: '2018-02-28' })
    ]).then(() => {
      return Promise.all([
        knex('item').insert({ id: 1, cat_code: 'WAT', item_name: 'Big Mouth', updated: '2018-02-28' }),
        knex('item').insert({ id: 2, cat_code: 'EAT', item_name: 'Insomnia', updated: '2018-02-28' }),
        knex('item').insert({ id: 3, cat_code: 'BUY', item_name: 'Apples', updated: '2018-02-28' }),
        knex('item').insert({ id: 4, cat_code: 'REA', item_name: 'To Kill a Mockingbird', updated: '2018-02-28' }),
        knex('item').insert({ id: 5, cat_code: 'WAT', item_name: 'A Clockwork Orange', updated: '2018-02-28' }),
        knex('item').insert({ id: 6, cat_code: 'EAT', item_name: 'The Fry', updated: '2018-02-28' }),
        knex('item').insert({ id: 7, cat_code: 'BUY', item_name: 'Television', updated: '2018-02-28' }),
        knex('item').insert({ id: 8, cat_code: 'REA', item_name: 'Catcher in the Rye', updated: '2018-02-28' }),
        knex('item').insert({ id: 9, cat_code: 'WAT', item_name: 'Napoleon Dynamite', updated: '2018-02-28' }),
        knex('item').insert({ id: 10, cat_code: 'EAT', item_name: 'Tacos El Asador', updated: '2018-02-28' }),
        knex('item').insert({ id: 11, cat_code: 'BUY', item_name: 'Mittens', updated: '2018-02-28' }),
        knex('item').insert({ id: 12, cat_code: 'REA', item_name: 'Americanah', updated: '2018-02-28' }),
        knex('item').insert({ id: 13, cat_code: 'WAT', item_name: 'Sound of Music', updated: '2018-02-28' }),
        knex('item').insert({ id: 14, cat_code: 'EAT', item_name: 'Banh Mi Boys', updated: '2018-02-28' }),
        knex('item').insert({ id: 15, cat_code: 'BUY', item_name: 'iPhone', updated: '2018-02-28' }),
        knex('item').insert({ id: 16, cat_code: 'REA', item_name: 'If Beale Street Could Talk', updated: '2018-02-28' }),
        knex('item').insert({ id: 17, cat_code: 'WAT', item_name: 'Fear the Walking Dead', updated: '2018-02-28' }),
        knex('item').insert({ id: 18, cat_code: 'EAT', item_name: 'Mean Bao', updated: '2018-02-28' }),
        knex('item').insert({ id: 19, cat_code: 'BUY', item_name: 'Chair', updated: '2018-02-28' }),
        knex('item').insert({ id: 20, cat_code: 'REA', item_name: 'Eragon', updated: '2018-02-28' })
      ]).then(() => {
        return Promise.all([
          knex('list_item').insert({ list_id: 1, item_id: 6 }),
          knex('list_item').insert({ list_id: 2, item_id: 16 }),
          knex('list_item').insert({ list_id: 3, item_id: 11 }),
          knex('list_item').insert({ list_id: 4, item_id: 1 }),
          knex('list_item').insert({ list_id: 5, item_id: 2 }),
          knex('list_item').insert({ list_id: 6, item_id: 12 }),
          knex('list_item').insert({ list_id: 7, item_id: 7 }),
          knex('list_item').insert({ list_id: 8, item_id: 17 }),
          knex('list_item').insert({ list_id: 9, item_id: 18 }),
          knex('list_item').insert({ list_id: 10, item_id: 8 }),
          knex('list_item').insert({ list_id: 11, item_id: 3 }),
          knex('list_item').insert({ list_id: 12, item_id: 13 }),
          knex('list_item').insert({ list_id: 13, item_id: 14 }),
          knex('list_item').insert({ list_id: 14, item_id: 4 }),
          knex('list_item').insert({ list_id: 15, item_id: 19 }),
          knex('list_item').insert({ list_id: 16, item_id: 9 }),
          knex('list_item').insert({ list_id: 17, item_id: 10 }),
          knex('list_item').insert({ list_id: 18, item_id: 20 }),
          knex('list_item').insert({ list_id: 19, item_id: 15 }),
          knex('list_item').insert({ list_id: 20, item_id: 5 })
        ])
      })
    })
  })




};