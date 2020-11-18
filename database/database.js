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
  // --- TBD: Why is a single songId assigned to a band? --- //
  songId: {
    type: Number,
    unique: true
  },
  // --- delete between comments if unjustified --- //
  bandName: String,
  bandImageUrl: String,
  followers: Number,
  tracks: Number
});

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
      console.log('DB Error finding band: ', error);
    });
};

// --------- DELETE BANDS FUNC --------- //
// TBD: Is it ever desirable to nuke the database? :|

const deleteBands = function() {
  return Band.deleteMany({})
    .catch((error) => {
      console.log('DB Error deleting bands: ', error);
    });
};

// ------- DELETE ONE BAND ---------- //

const deleteBand = function(id) {
  return Band.deleteOne({bandId: id})
    .catch((error) => {
      console.log('DB Error deleting bands: ', error);
    });
};

// ------ UPDATE FOLLOWERS FUNC ------- //
// TBD: Update its name all-around

const updateFollowers = function(id, val) {
  return Band.updateOne({bandId: id}, {$inc: {followers: val * 1}})
    .catch((error) => {
      console.log('DB Error updating followers', error);
    });
};

// ------ UPDATE TRACKS COUNT FUNC ------- //

const incrementTracks = function(id, val) {
  return Band.updateOne({bandId: id}, {$inc: {tracks: val * 1}})
    .catch((error) => {
      console.log('DB Error incrementing tracks', error);
    });
};

module.exports.saveBands = saveBands;
module.exports.findBand = findBand;
module.exports.deleteBands = deleteBands;
module.exports.deleteBand = deleteBand;
module.exports.updateFollowers = updateFollowers;
module.exports.incrementTracks = incrementTracks;