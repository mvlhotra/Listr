//  JS function to take inputted list items from user and
//  determine their type and return JSON object of relevant data

const request = require('request');
require('dotenv').config();

//  OMDB api call
function showFinder(title, callback) {
  const contentTitle = title.split(' ').join('+');
  const authentication = process.env.OMDB;
  const apiLookup = `http://www.omdbapi.com/?t=${contentTitle}&apikey=${authentication}`;
  let showInfo = {};
  request(apiLookup, (err, response, body) => {
    showInfo = {
      type: JSON.parse(body).Type,
      title: JSON.parse(body).Title,
      year: JSON.parse(body).Year,
      imdbRating: JSON.parse(body).imdbRating,
      response: JSON.parse(body).Response
    };
    console.log(JSON.parse(body).Type);
    callback(showInfo);
  });
}

//  Open Library API call
function bookFinder(title, callback) {
  const contentTitle = title.split(' ').join('+');
  // const authentication = process.env.GRGET;
  const apiLookup = `http://openlibrary.org/search.json?q=${contentTitle}`;
  let bookInfo = {};
  request(apiLookup, (err, response, body) => {
    if (title.toLowerCase() === JSON.parse(body).docs[0].title.toLowerCase()) {
      bookInfo = {
        type: 'book',
        title: JSON.parse(body).docs[0].title,
        author: JSON.parse(body).docs[0].author_name[0],
        year: JSON.parse(body).docs[0].first_publish_year

      };
    }
    callback(bookInfo);
  });
}

//  Yelp API call
function restoFinder(title, callback) {
  const restoTitle = title.split(' ').join('-').toLowerCase();
  const apiLookup = {
    url: `https://api.yelp.com/v3/businesses/search?location=toronto&categories=restaurants,all&term=${restoTitle}&sort_by=best_match`,
    headers: {
      Authorization: `Bearer ${process.env.YELPAPI}`
    }
  };
  console.log(apiLookup.url);
  let restoInfo = {};
  request(apiLookup, (err, response, body) => {
    restoInfo = JSON.parse(body).businesses[0];
    callback(restoInfo);
  });
}

//  API call
function buyFinder(title, callback) {
  const restoTitle = title.split(' ').join('-').toLowerCase();
  const apiLookup = {
    url: `https://api.yelp.com/v3/businesses/search?location=toronto&categories=restaurants,all&term=${restoTitle}&sort_by=best_match`,
    headers: {
      Authorization: `Bearer ${process.env.YELPAPI}`
    }
  };
  console.log(apiLookup.url);
  let restoInfo = {};
  request(apiLookup, (err, response, body) => {
    restoInfo = JSON.parse(body).businesses[0];
    callback(restoInfo);
  });
}

// search/?location=Toronto&radius=10000&categories=restaurants&term=${restoTitle}

// function smartSorter(userTitle, callback) {
//   const searchHits = [];
//   //  Check if exists shows
//   showFinder(userTitle, (resObj) => {
//     if (resObj.response === 'True') {
//       console.log(searchHits);
//     }
//   });
//   callback(searchHits)
// }

restoFinder('Insomnia', (obj) => {
  console.log(obj);
});

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
