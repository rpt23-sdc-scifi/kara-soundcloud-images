const express = require('express');
const app = express();
const path = require('path');
const port = 2000;
const db = require('../database/database.js');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.static('client'));
app.use(cors());

app.get('/artistBio/:bandId', async(req, res) => {
  try {
    const band = await db.findBand(req.params.bandId);
    // if !band then error
    if (!band) {
      return res.status(400).json({
        success: false,
        msg: `there is no band with id ${req.params.bandId}`
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