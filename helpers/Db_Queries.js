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

  function insertEat()

  return {
    count: countList,
    findByEmail: findUserByEmail,
    findByID: findUserByID
  };
};
