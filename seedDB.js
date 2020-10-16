const database = require('./database/database.js');
const bands = require('./bandNames.js');
const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const seedDatabase = async () => {
  var deleted = await database.deleteBands();
  var bandData = [];
  axios.get(`https://api.unsplash.com/search/photos?query=music&per_page=30&client_id=${apiKey}`)
    .then((response) => {
      // console.log('Response from Image GET: ', response.data.results);
      bandData.push(...response.data.results);
      return bandData;
    })
    .then((results) => {
      for (var i = 0; i < 100; i++) {
        var bandObj = {
          bandId: i + 1,
          songId: i + 1,
          bandImageUrl: bandData[getRandomInt(29)].urls.raw,
          bandName: bands.bandNames[i],
          followers: getRandomInt(100),
          tracks: getRandomInt(25)
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
