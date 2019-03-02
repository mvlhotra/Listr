//  Functions to query data out psql

module.exports = (knex) => {
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

  function getListID(userID, cat) {
    return new Promise((resolve, reject) => {
      knex('list').select(list.id)
        .where({ 'list.user_id': data.userID })
        .where({ 'list.cat_code': data.cat })
        .then((list) => {
          return resolve(list_id);
        })
        .catch((error) => reject(error));
    });
  }

  function getItemID() {
    return new Promise((resolve, reject) => {
      knex('item').max(item.id)
        .then((item) => {
          return resolve(item_id);
        })
        .catch((error) => reject(error));
    });
  }
  // HASNT BEEN TESTED
  async function insertItem(user, itemName, category) {
    knex('item').insert({ cat_code: category, item_name: itemName });
    const listID = await getListID(user, category);
    const itemID = await getItemID();
    knex('list_item').insert({ list_id: listID[0], item_id: itemID[0] });
  }

  function updateUserInfo(user, input, field) {
    knex('user')
      .update(field, 'input');
  }

  return {
    count: countList,
    findByEmail: findUserByEmail,
    findByID: findUserByID,
    makeList: makeListByCategory,
    insert: insertItem,
    updateUser: updateUserInfo
  };
};
