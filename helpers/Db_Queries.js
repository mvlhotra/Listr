//  Functions to query data out psql

module.exports = (knex) => {
  // Return a count of each list for a user
  function countList(userID) {
    return new Promise((resolve, reject) => {
      knex('list_item').select('users.id', 'list_item.list_id', 'list.cat_code').count('list_item.item_id')
        .join('list', 'list.id', '=', 'list_item.list_id')
        .join('users', 'users.id', '=', 'list.user_id')
        .groupBy('list_item.list_id', 'list.cat_code', 'users.id')
        .having('users.id', '=', userID)
        .orderBy('list_item.list_id')
        .then((countCats) => {
          return resolve(countCats);
        })
        .catch(err => reject(err));
    });
  }

  // Look up a user id by their email
  function findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('users.id')
        .where({ 'users.email': email })
        .then((rows) => {
          const userID = rows;
          return resolve(userID);
        })
        .catch(err => reject(err));
    });
  }

  // Look up user info by id
  function findUserByID(id) {
    return new Promise((resolve, reject) => {
      knex('users')
        .select('users.id', 'first_name', 'last_name', 'email')
        .where({ 'users.id': id })
        .then((rows) => {
          const user = rows;
          return resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  // Return full item list by user and category
  function makeListByCategory(userID, category) {
    return new Promise((resolve, reject) => {
      knex('users').select('item.id', 'item.item_name', 'list.cat_code')
        .join('list', 'list.user_id', '=', 'users.id')
        .join('list_item', 'list_item.list_id', '=', 'list.id')
        .join('item', 'item.id', '=', 'list_item.item_id')
        .where({ 'users.id': userID })
        .where({ 'item.cat_code': category })
        .then((list) => {
          return resolve(list);
        })
        .catch(err => reject(err));
    });
  }

  // Get list id by user and category
  function getListID(userID, cat) {
    return new Promise((resolve, reject) => {
      knex('list').select('list.id')
        .where({ 'list.user_id': userID })
        .where({ 'list.cat_code': cat })
        .then((list) => {
          return resolve(list);
        })
        .catch(err => reject(err));
    });
  }

  // Insert a new item in list by user and category
  async function insertNewItem(userID, itemName, category) {
    const listID = await getListID(userID, category);
    knex('item').insert({ cat_code: category, item_name: itemName })
      .returning('id')
      .then((id) => {
        knex('list_item').insert({ list_id: listID[0].id, item_id: id[0] })
          .catch(err => console.log(err));
      });
  }

  // Update user table field
  function updateUserInfo(userID, input, field) {
    if (field !== 'id') {
      knex('users')
        .where({ id: userID })
        .update({ [field]: input })
        .catch(err => console.log(err));
    }
  }

  // Update item category
  async function updateItemCategory(userID, itemID, oldCat, newCat) {
    const oldListID = await getListID(userID, oldCat);
    const newListID = await getListID(userID, newCat);
    knex('item')
      .where({ id: itemID })
      .update({ cat_code: newCat })
      .catch(err => console.log(err));
    knex('list_item')
      .where({ list_id: oldListID[0].id })
      .where({ item_id: itemID })
      .update({ list_id: newListID[0].id })
      .catch(err => console.log(err));
  }

  // Add new user to Db
  function registerNewUser(firstName, lastName, userEmail, userPassword) {
    knex('users')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        password: userPassword
      })
      .returning('id')
      .then((id) => {
        knex('list')
          .insert({ user_id: id[0], cat_code: 'EAT' })
          .catch(err => console.log(err));
        knex('list')
          .insert({ user_id: id[0], cat_code: 'WAT' })
          .catch(err => console.log(err));
        knex('list')
          .insert({ user_id: id[0], cat_code: 'REA' })
          .catch(err => console.log(err));
        knex('list')
          .insert({ user_id: id[0], cat_code: 'BUY' })
          .catch(err => console.log(err));
      });
  }

  function deleteItem(itemID) {
    knex('list_item')
      .where({ 'list_item.item_id': itemID })
      .del()
      .then(() => {
        knex('item')
          .where({ 'item.id': itemID })
          .del()
          .catch(err => console.log(err));
      });
  }

  return {
    count: countList,
    findByEmail: findUserByEmail,
    findByID: findUserByID,
    makeList: makeListByCategory,
    insertItem: insertNewItem,
    updateUser: updateUserInfo,
    register: registerNewUser,
    updateItem: updateItemCategory,
    delete: deleteItem
  };
};
