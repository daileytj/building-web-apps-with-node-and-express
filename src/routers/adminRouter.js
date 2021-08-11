const express = require('express');
const debug = require('debug')('app:adminRouter');
// const mongodb = require('mongodb');
const { MongoClient } = require('mongodb'); // Since we're only using mongodb.MongoClient we can just import like this instead of importing all of mongodb
const sessionsData = require('../data/sessions.json');

const adminRouter = express.Router();

adminRouter.route('/').get((req, res) => {
  const url = 'mongodb+srv://dbUser:wgHWqXMGdCYQnpAb@globomantics.o8jsw.mongodb.net?retryWrites=true&w=majority'
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const response = await db.collection('sessions').insertMany(sessionsData);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
  }())
});

module.exports = adminRouter;