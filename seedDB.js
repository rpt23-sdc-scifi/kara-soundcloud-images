const database = require('./database/database.js');
const bands = require('./bandNames.js');

const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const seedDatabase = () => {
  var imageData = [];
  axios.get(`https://api.unsplash.com/search/photos?query=music&per_page=30&client_id=${apiKey}`)
    .then((response) => {
      // console.log('Response from Image GET: ', response.data.results);
      imageData.push(...response.data.results);
      return imageData;
    })
    .then((results) => {
      for (var i = 0; i < 30; i++) {
        var bandObj = {
          bandId: i + 1,
          bandImageUrl: imageData[i].urls.raw,
          bandName: bands.bandNames[i]
        };
        database.saveImages(bandObj)
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
      // res.sendStatus(500).send(error);
    });
};

seedDatabase();

// look into randomly generating bands/images with song id
// fill out an array to randomly distribute 30 bands to 100 song id's
// .populate()?