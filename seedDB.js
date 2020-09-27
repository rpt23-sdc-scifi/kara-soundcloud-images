const db = require('./database/database.js');

const apiKey = require('./config.js');
const axios = require('axios');
const bodyParser = require('body-parser');

const seedDatabase = () => {
  var imageData = [];
  for (var j = 0; j < 10; j++) {
    axios.get(`https://api.unsplash.com/search/photos?query=music&page=${j + 1}&per_page=10&client_id=${apiKey}`)
      .then((response) => {
        imageData.push(...response.data.results);
        // console.log(imageData.length);
        return imageData;
      })
      .then((data) => {
        console.log('What is this: ', data.length);
      })
      .catch((error) => {
        console.log('Error making GET request: ', error);
      });
  }

  setTimeout(() => {
    // console.log('Length of data: ', imageData.length);
    for (var i = 0; i < imageData.length; i++) {
      var bandObj = {
        bandId: i + 1,
        bandImageUrl: imageData[i].urls.raw
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

// Notes:
// iterate through json returned from API call to unsplash
// seed db...
// save 100 images to db
// create script in package.json
