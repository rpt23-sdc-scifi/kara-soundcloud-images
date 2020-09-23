const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/images', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

const imageSchema = new mongoose.Schema({
  songId: {
    type: Number,
    unique: true
  },
  bandName: String,
  songImageUrl: String,
  bandImageUrl: String
});

const Image = mongoose.model('Image', imageSchema);