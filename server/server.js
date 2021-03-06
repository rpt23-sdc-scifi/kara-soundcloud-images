const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
const db = require('../database/database.js');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressStaticGzip = require('express-static-gzip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/bundle.js'));
});
app.use('/:songId', express.static(path.join(__dirname, '../client')));

app.use('/', expressStaticGzip(path.join(__dirname, '../client'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader("Cache-Control", "client, max-age=31536000");
  }
}));


app.get('/artistBio/:songId', async(req, res) => {
  try {
    const band = await db.findBand(req.params.songId);
    // if !band then error
    if (!band) {
      return res.status(400).json({
        success: false,
        msg: `there is no band with songId ${req.params.songId}`
      });
    }
    res.status(200).send({
      success: true,
      data: band
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      msg: error
    });
  }
});

// ----- UPDATE FOLLOWERS ----- //

app.post('/followers', (req, res) => {
  var bandId = req.body.id;
  var value = req.body.value;
  db.updateFollowers(bandId, value)
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      console.log('Error updating followers: ', error);
      res.sendStatus(500);
    })
})

// ---------------------------- //

app.get('/:current', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(port, () => {
  console.log(chalk.magenta(`Listening on port http://localhost:${port}`));
});

module.exports = app;
