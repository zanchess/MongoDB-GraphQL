const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  _id: String,
  name: String,
  genre: Array,
  rating: Number,
  description: String,
  directorId: String,
  directorName: String
});

module.exports = mongoose.model('Movie', movieSchema);

