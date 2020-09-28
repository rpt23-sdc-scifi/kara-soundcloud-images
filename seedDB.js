const db = require('./database/database.js');
const bn = require('./bandNames.js');

const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const seedDatabase = () => {
  var imageData = [];
  for (var j = 0; j < 10; j++) {
    axios.get(`https://api.unsplash.com/search/photos?query=music&page=${j + 1}&per_page=10&client_id=${apiKey}`)
      .then((response) => {
        imageData.push(...response.data.results);
        return imageData;
      })
      .catch((error) => {
        console.log('Error making GET request: ', error);
      });
  }

  setTimeout(() => {
    for (var i = 0; i < imageData.length; i++) {
      var bandObj = {
        bandId: i + 1,
        bandImageUrl: imageData[i].urls.raw,
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
  }, 1000);

};

seedDatabase();
