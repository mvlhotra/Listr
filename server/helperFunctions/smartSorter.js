//  JS function to take inputted list items from user and
//  determine their type and return JSON object of relevant data

const request = require('request');
require('dotenv').config();

//  OMDB api call
function showFinder(title) {
  console.log("kicked off show");
  const contentTitle = title.split(' ').join('+');
  const authentication = process.env.OMDB;
  const apiLookup = `http://www.omdbapi.com/?t=${contentTitle}&apikey=${authentication}`;
  let showInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).Response === 'True') {
        showInfo = {
          type: JSON.parse(body).Type,
          title: JSON.parse(body).Title,
          year: JSON.parse(body).Year,
          imdbRating: JSON.parse(body).imdbRating,
          response: true
        };
        resolve(showInfo);
      }
      reject(err);
    });
  });
}

//  Open Library API call
async function bookFinder(title) {
  console.log("kicked off book")
  const contentTitle = title.split(' ').join('+');
  const apiLookup = `http://openlibrary.org/search.json?q=${contentTitle}`;
  let bookInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).num_found !== 0 && title.toLowerCase() === JSON.parse(body).docs[0].title.toLowerCase()) {
        bookInfo = {
          type: 'book',
          title: JSON.parse(body).docs[0].title,
          author: JSON.parse(body).docs[0].author_name[0],
          year: JSON.parse(body).docs[0].first_publish_year,
          response: true
        };
        resolve(bookInfo);
      }
      reject(err);
    });
  });

  // await request(apiLookup, (err, response, body) => {
  //   if (title.toLowerCase() === JSON.parse(body).docs[0].title.toLowerCase()) {
  //     bookInfo = {
  //       type: 'book',
  //       title: JSON.parse(body).docs[0].title,
  //       author: JSON.parse(body).docs[0].author_name[0],
  //       year: JSON.parse(body).docs[0].first_publish_year,
  //       response: true
  //     };
  //     return bookInfo;
  //   }
  // });
}

//  Yelp API call
async function restoFinder(title, callback) {
  console.log("kicked off resto")
  const restoTitle = title.split(' ').join('-').toLowerCase();
  const apiLookup = {
    url: `https://api.yelp.com/v3/businesses/search?location=toronto&categories=restaurants,all&term=${restoTitle}&sort_by=best_match`,
    headers: {
      Authorization: `Bearer ${process.env.YELPAPI}`
    }
  };
  let restoInfo = {};
  return new Promise((resolve, reject) => {
    request(apiLookup, (err, response, body) => {
      if (JSON.parse(body).total !== 0 && title === JSON.parse(body).businesses[0].name.slice(0, title.length)) {
        restoInfo = {
          type: 'toEat',
          name: JSON.parse(body).businesses[0].name,
          yelpRating: JSON.parse(body).businesses[0].rating,
          price: JSON.parse(body).businesses[0].price,
          address: JSON.parse(body).businesses[0].location.display_address.join(' '),
          response: true
        };
        resolve(restoInfo);
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

  let showResult = await showFinder(userInput).then().catch(err => console.log(err));
  let bookResult = await bookFinder(userInput).then().catch(err => console.log(err));
  let restoResult = await restoFinder(userInput).then().catch(err => console.log(err));
  if (showResult) {
    searchHits.push(showResult);
  }
  if (bookResult) {
    searchHits.push(bookResult);
  }
  if (restoResult) {
    searchHits.push(restoResult);
  }
  console.log(searchHits);
  //callback(searchHits);
}

searchAll('To Kill a Mockingbird');
//   , (obj) => {
//   console.log(obj);
// });
// showFinder('Big Mouth', (obj) => {
//   console.log(obj);
// });

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
