const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

require('dotenv').config();

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 3001;
const mongoDBUri = process.env.DATABASE_URL || '';

async function startApplication() {
  try {
    console.log('Connecting to Database');
    await mongoose.connect(mongoDBUri);
    console.log('Database was connected');

    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  } catch (error) {
    console.log(`Database wasn't connected, reason: ${error}`);
  }
}

mongoose.Promise = global.Promise;
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);

startApplication();
