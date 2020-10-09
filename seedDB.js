const database = require('./database/database.js');
const bands = require('./bandNames.js');
const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const seedDatabase = () => {
  var bandData = [];
  axios.get(`https://api.unsplash.com/search/photos?query=music&per_page=30&client_id=${apiKey}`)
    .then((response) => {
      // console.log('Response from Image GET: ', response.data.results);
      bandData.push(...response.data.results);
      return bandData;
    })
    .then((results) => {
      for (var i = 0; i < 30; i++) {
        var bandObj = {
          bandId: i + 1,
          bandImageUrl: bandData[i].urls.raw,
          bandName: bands.bandNames[i],
          followers: Math.floor(Math.random() * Math.floor(100)),
          tracks: Math.floor(Math.random() * Math.floor(25))
        };
        database.saveBands(bandObj)
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
      res.sendStatus(400).send('Could Not Find Images');
    });
};

seedDatabase();
