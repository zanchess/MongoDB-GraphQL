const express = require('express');
const mongoose = require('mongoose');

const PORT = 3001;
const app = express();
const mongoDBUri ="mongodb+srv://aliaksandr:a1993la1993l@cluster0.xrqjx.mongodb.net/Learning?retryWrites=true&w=majority";


mongoose.connect(mongoDBUri)
  .then(() => {
    console.log("[SERVER] Connected to database!");
  })
  .catch(() => {
    console.log("[SERVER] Unable to Connect to database!");
  });

mongoose.Promise = global.Promise;
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});





