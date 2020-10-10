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
  return Band.findOne({bandId: id});
};

module.exports.saveBands = saveBands;
module.exports.findBand = findBand;