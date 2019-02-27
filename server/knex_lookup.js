const settings = require("./settings"); // settings.json
const myName = process.argv.slice(2)[0];

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

function formatDate(myDate) {
  return (myDate.toISOString().substr(0, 10));
}

function foundOutput(myObj, name) {
  let foundStr = `Found ${myObj.length} person(s) by the name '${name}':`
  myObj.forEach((person, ind) => {
    foundStr += `\n- ${ind + 1}: ${myObj[ind].first_name} ${myObj[ind].last_name}, born '${formatDate(myObj[ind].birthdate)}'`

  });
  return foundStr;

};

knex.select('*').from('famous_people').where({
  'first_name': myName
}).asCallback(function (err, rows) {
  if (err) return console.error(err);
  console.log(foundOutput(rows, myName));
  knex.destroy();
});





