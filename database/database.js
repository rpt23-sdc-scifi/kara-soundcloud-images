// ----------- DB CONNECTION ---------- //

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', {
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

// const imageSchema = new mongoose.Schema({
//   songId: {
//     type: Number,
//     unique: true
//   },
//   bandId: {
//     type: Number,
//     unique: true
//   },
//   bandName: String,
//   songImageUrl: String,
//   bandImageUrl: String
// });

const imageSchema = new mongoose.Schema({
  bandId: {
    type: Number,
    unique: true
  },
  bandImageUrl: String
});

const Image = mongoose.model('Image', imageSchema);

// --------- SAVE IMAGE FUNC --------- //

const saveImages = (imageData) => {
  var image = new Image(imageData);
  return image.save();
};

module.exports.saveImages = saveImages;