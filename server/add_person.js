const myName = process.argv.slice(2);
const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

function addPerson(first, last, dob) {
  knex('famous_people').insert({
    first_name: first,
    last_name: last,
    birthdate: dob
  }).asCallback(function (err) {
    if (err) return console.error(err);
    knex.destroy();
    console.log(`Added ${first} ${last}`)
  });
}

addPerson(myName[0], myName[1], myName[2]);