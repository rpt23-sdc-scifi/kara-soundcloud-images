const db = require('./database/database.js');
const bn = require('./bandNames.js');

const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const seedDatabase = () => {
  var imageData = [];
  axios.get(`https://api.unsplash.com/search/photos?query=music&per_page=30&client_id=${apiKey}`)
    .then((response) => {
      console.log('Response from Image GET: ', response.data.results);
      imageData.push(...response.data.results);
      return imageData;
    })
    .then((results) => {
      for (var i = 0; i < imageData.length; i++) {
        var bandObj = {
          bandId: i + 1,
          songId: i + 1,
          bandImageUrl: imageData[i].urls.raw,
          songImageUrl: imageData[i].urls.regular,
          bandName: bn.bandNames[i]
        };
        db.saveImages(bandObj)
          .then((response) => {
            console.log('Response from db save: ', response);
          })
          .catch((error) => {
            console.log('Error saving to db: ', error);
          });
      }
    })
    .catch((error) => {
      console.log('Error making GET request: ', error);
    });
};

seedDatabase();
