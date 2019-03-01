//  Functions to query data out psql

module.exports = (knex) => {
  function countList(userID, listType) {
    return new Promise((resolve, reject) => {
      knex('users').count('*')
        .join('list', 'list.user_id', '=', 'users.id')
        .where({ 'users.id': userID })
        .where({ cat_code: listType })
        .then((count) => {
          return resolve(count);
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

  function getListID(userID, cat) {
    return new Promise((resolve, reject) => {
      knex('list').select(list.id)
        .where({ 'list.user_id': data.userID })
        .where({ 'list.cat_code': data.cat })
        .then ((list) => {
          return resolve(list_id);
        })
        .catch((error) => reject(error));
    });
  }

  function getItemID() {
    return new Promise((resolve, reject) => {
      knex('item').select(max(item.id))
        .then((item) => {
          return resolve(item_id);
        })
        .catch((error) => reject(error));
    });
  }
  // HASNT BEEN TESTED
  async function insertItem(data) {
    knex('item').insert({ cat_code: data.cat, item_name: data.title });
    const listID = await getListID(data.userID, data.cat);
    const itemID = await getItemID();
    knex('list_item').insert({ list_id: listID[0], item_id: itemID[0] });
  }

  return {
    count: countList,
    findByEmail: findUserByEmail,
    findByID: findUserByID,
    insert: insertItem
  };
};

/* data = {
  cat: 'WAT',
  title: 'Batman',
  userID: 2
  }
*/
