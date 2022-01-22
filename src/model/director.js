const mongoose = require('mongoose');

const { Schema } = mongoose;

const directorSchema = new Schema({
  _id: String,
  country: String,
  director: String
});

module.exports = mongoose.model('Director', directorSchema);

