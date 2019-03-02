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
        .catch((error) => reject(error));
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
        .catch((error) => reject(error));
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
        .catch((error) => reject(error));
    });
  }

  // Return full item list by user and category
  function makeListByCategory(userID, category) {
    return new Promise((resolve, reject) => {
      knex('users').select('item.id', 'item.item_name')
        .join('list', 'list.user_id', '=', 'users.id')
        .join('list_item', 'list_item.list_id', '=', 'list.id')
        .join('item', 'item.id', '=', 'list_item.item_id')
        .where({ 'users.id': userID })
        .where({ 'item.cat_code': category })
        .then((list) => {
          return resolve(list);
        })
        .catch((error) => reject(error));
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
        .catch((error) => reject(error));
    });
  }

  // Get item PK for newest item added
  function getItemID() {
    return new Promise((resolve, reject) => {
      knex('item').max('item.id')
        .then((item) => {
          return resolve(item);
        })
        .catch((error) => reject(error));
    });
  }

  // Insert a new item in list by user and category
  async function insertNewItem(userID, itemName, category) {
    console.log(userID, itemName, category);
    knex('item').insert({ 'cat_code': category, 'item_name': itemName })
      .then(console.log('item should be in there'));
    const listID = await getListID(userID, category);
    const itemID = await getItemID();
    console.log('listid: ', listID[0].id, '\nitemid: ', itemID[0].max);
    knex('list_item').insert({ 'list_id': listID[0].id, 'item_id': itemID[0].max })
      .then(console.log('list_item-erino'));
  }

  // Update user table field
  function updateUserInfo(userID, input, field) {
    if (field !== 'id') {
      knex('user')
        .where({ id: userID })
        .update({ [field]: input });
    }
  }

  // Update item category
  function updateItemCategory(itemID, newCat) {
    knex('item')
      .where({ id: itemID })
      .update('cat_code', newCat);
  }

  return {
    count: countList,
    findByEmail: findUserByEmail,
    findByID: findUserByID,
    makeList: makeListByCategory,
    insertItem: insertNewItem,
    updateUser: updateUserInfo,
    updateItem: updateItemCategory
  };
};
