module.exports = () => {
  //  JS function to take inputted list items from user and
  //  determine their type and return JSON object of relevant data
  const request = require('request');
  const buyAPI = require('./toBuy');
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
            type: 'WAT',
            name: JSON.parse(body).Title,
            released: JSON.parse(body).Released,
            rating: JSON.parse(body).imdbRating,
            plot: JSON.parse(body).Plot,
            img: JSON.parse(body).Poster,
            response: true
          };
          resolve(watchInfo);
        }
        reject(err);
      });
    });
  }

  //  Open Library API call
  function readFinder(title) {
    const contentTitle = title.split(' ').join('+');
    const apiLookup = `http://openlibrary.org/search.json?q=${contentTitle}`;
    let readInfo = {};
    return new Promise((resolve, reject) => {
      request(apiLookup, (err, response, body) => {
        if (JSON.parse(body).num_found !== 0 && title.toLowerCase() === JSON.parse(body).docs[0].title.toLowerCase()) {
          readInfo = {
            type: 'REA',
            name: JSON.parse(body).docs[0].title,
            author: JSON.parse(body).docs[0].author_name[0],
            released: JSON.parse(body).docs[0].first_publish_year,
            response: true
          };
          resolve(readInfo);
        }
        reject(err);
      });
    });
  }

  //  Yelp API call
  function eatFinder(title) {
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
            type: 'EAT',
            name: JSON.parse(body).businesses[0].name,
            rating: JSON.parse(body).businesses[0].rating,
            price: JSON.parse(body).businesses[0].price,
            address: JSON.parse(body).businesses[0].location.display_address.join(' '),
            img: JSON.parse(body).businesses[0].image_url,
            response: true
          };
          resolve(eatInfo);
        }
        reject(err);
      });
    });
  }

  //  Retail API call
  function buyFinder(title) {
    let buyInfo = {};
    return new Promise((resolve, reject) => {
      buyAPI.forEach(item => {
        if (item.name === title) {
          buyInfo = item;
          buyInfo.type = 'BUY';
          buyInfo.response = true;
          resolve(buyInfo);
        }
      });
      reject(err);
    });
  }

  async function searchAll(userInput, callback) {
    const searchHits = [];

    const watchResult = await watchFinder(userInput).then().catch(err => console.log(err));
    const readResult = await readFinder(userInput).then().catch(err => console.log(err));
    const eatResult = await eatFinder(userInput).then().catch(err => console.log(err));
    const buyResult = await buyFinder(userInput).then().catch(err => console.log(err));
    if (buyResult) {
      searchHits.push(buyResult);
    }
    if (watchResult) {
      searchHits.push(watchResult);
    }
    if (readResult) {
      searchHits.push(readResult);
    }
    if (eatResult) {
      searchHits.push(eatResult);
    }
    return searchHits;
  }

  return {
    watch: watchFinder,
    read: readFinder,
    eat: eatFinder,
    buy: buyFinder,
    search: searchAll
  };
};
// searchAll('Tacos El Asador');

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

