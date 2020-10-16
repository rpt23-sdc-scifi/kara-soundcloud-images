// ----------- DB CONNECTION ---------- //

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bands', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

// ------------- DB SCHEMA ------------ //

const bandSchema = new mongoose.Schema({
  bandId: {
    type: Number,
    unique: true
  },
  songId: {
    type: Number,
    unique: true
  },
  bandName: String,
  bandImageUrl: String,
  followers: Number,
  tracks: Number
});

// for loop 1-100, off of band array, assign band name to each song
// songid will be primary key in mongo
// must store 100 peices of data
// frankie send me song id, i return band name
// new endpoint where frankie does get request w/ song id
// i send response of band name string

const Band = mongoose.model('Band', bandSchema);

// --------- SAVE BAND FUNC --------- //

const saveBands = (bandData) => {
  var band = new Band(bandData);
  return band.save()
    .catch((error) => {
      console.log('Error saving to database: ', error);
    });
};

// --------- FIND BAND FUNC --------- //

const findBand = function(id) {
  return Band.findOne({songId: id})
    .catch((error) => {
      console.log('Error finding band in database: ', error);
    });
};

// --------- DELETE BANDS FUNC --------- //

const deleteBands = function() {
  return Band.deleteMany({})
    .catch((error) => {
      console.log('Error deleting bands in database: ', error);
    });
};

module.exports.saveBands = saveBands;
module.exports.findBand = findBand;
module.exports.deleteBands = deleteBands;