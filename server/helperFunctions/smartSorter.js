//  JS function to take inputted list items from user and
//  determine their type and return JSON object of relevant data
const request = require('request');
require('dotenv').config();

//  OMDB api call
function watchFinder(title) {
  const contentTitle = title.split(' ').join('+');
  const authentication = process.env.OMDB;
  const apiLookup = `http://www.omdbapi.com/?t=${contentTitle}&apikey=${authentication}`;
  let watchInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).Response === 'True') {
        watchInfo = {
          type: JSON.parse(body).Type,
          title: JSON.parse(body).Title,
          year: JSON.parse(body).Year,
          imdbRating: JSON.parse(body).imdbRating,
          response: true
        };
        resolve(watchInfo);
      }
      reject(err);
    });
  });
}

//  Open Library API call
async function readFinder(title) {
  const contentTitle = title.split(' ').join('+');
  const apiLookup = `http://openlibrary.org/search.json?q=${contentTitle}`;
  let readInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).num_found !== 0 && title.toLowerCase() === JSON.parse(body).docs[0].title.toLowerCase()) {
        readInfo = {
          type: 'book',
          title: JSON.parse(body).docs[0].title,
          author: JSON.parse(body).docs[0].author_name[0],
          year: JSON.parse(body).docs[0].first_publish_year,
          response: true
        };
        resolve(readInfo);
      }
      reject(err);
    });
  });
}

//  Yelp API call
async function eatFinder(title) {
  const restoTitle = title.split(' ').join('-').toLowerCase();
  const apiLookup = {
    url: `https://api.yelp.com/v3/businesses/search?location=toronto&categories=restaurants,all&term=${restoTitle}&sort_by=best_match`,
    headers: {
      Authorization: `Bearer ${process.env.YELPAPI}`
    }
  };
  let eatInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).total !== 0 && title === JSON.parse(body).businesses[0].name.slice(0, title.length)) {
        eatInfo = {
          type: 'toEat',
          name: JSON.parse(body).businesses[0].name,
          yelpRating: JSON.parse(body).businesses[0].rating,
          price: JSON.parse(body).businesses[0].price,
          address: JSON.parse(body).businesses[0].location.display_address.join(' '),
          response: true
        };
        resolve(eatInfo);
      }
      reject(err);
    });
  });
}

//  Retail API call
// function buyFinder(title, callback) {
//   const restoTitle = title.split(' ').join('-').toLowerCase();
//   const apiLookup = {
//     url: `https://api.yelp.com/v3/businesses/search?location=toronto&categories=restaurants,all&term=${restoTitle}&sort_by=best_match`,
//     headers: {
//       Authorization: `Bearer ${process.env.YELPAPI}`
//     }
//   };
//   console.log(apiLookup.url);
//   let restoInfo = {};
//   request(apiLookup, (err, response, body) => {
//     restoInfo = JSON.parse(body).businesses[0];
//     callback(restoInfo);
//   });
// }

async function searchAll(userInput, callback) {
  const searchHits = [];

  const watchResult = await watchFinder(userInput).then().catch(err => console.log(err));
  const readResult = await readFinder(userInput).then().catch(err => console.log(err));
  const eatResult = await eatFinder(userInput).then().catch(err => console.log(err));
  if (watchResult) {
    searchHits.push(watchResult);
  }
  if (readResult) {
    searchHits.push(readResult);
  }
  if (eatResult) {
    searchHits.push(eatResult);
  }
  console.log(searchHits);
}

searchAll('To Kill a Mockingbird');

// //  Google Books api call
// function bookFinder(title, callback) {
//   const contentTitle = title.split(' ').join('+');
//   const authentication = process.env.GOOGLE;
//   const apiLookup = `https://www.googleapis.com/books/v1/volumes?q=${contentTitle}&key=${authentication}`;
//   let bookInfo = {};
//   request(apiLookup, (err, response, body) => {
//     bookInfo = JSON.parse(body);
//     // {
//     //   type: JSON.parse(body).Type,
//     //   title: JSON.parse(body).Title,
//     //   year: JSON.parse(body).Year,
//     //   imdbRating: JSON.parse(body).imdbRating,
//     //   response: JSON.parse(body).Response
//     // };
//     // console.log(JSON.parse(body).Type);
//     callback(bookInfo);
//   });
// }