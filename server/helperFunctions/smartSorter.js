//  JS function to take inputted list items from user and
//  determine their type and return JSON object of relevant data

const request = require('request');
require('dotenv').config();

//  OMDB api call
function showFinder(searchItem, callback) {
  const contentTitle = searchItem.split(' ').join('+');
  const authentication = process.env.OMDB;
  const apiLookup = `http://www.omdbapi.com/?t=${contentTitle}&apikey=${authentication}`;
  request(apiLookup, (err, response, body) => {
    callback(body);
  });
}

function smartSorter(searchItem, callback) {


smartSorter('Big Mouth', (obj) => {
  console.log(obj);
});
