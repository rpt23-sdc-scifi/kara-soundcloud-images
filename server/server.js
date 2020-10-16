const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
const db = require('../database/database.js');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use('/:songId', express.static('client'));
app.use(cors());

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

app.listen(port, () => {
  console.log(chalk.magenta(`Listening on port http://localhost:${port}`));
});

module.exports = app;

// if local deployment equals true, instead of making get request, use sample json blob as if you made a get request
// async await to retireve data response from get to API to find bandId matching songId
