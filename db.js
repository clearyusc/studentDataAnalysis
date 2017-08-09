const async = require('async');
const MongoClient = require('mongodb').MongoClient;

const dbFormatter = require(`${process.cwd()}/app/data_processing/databaseFormat.js`);

// Much credit for mongodb testing is due to this tutorial: https://www.terlici.com/2014/09/15/node-testing.html
// TO-DO: refactor this code so it is more similar to my style (return single object for export w/ multi functions)

const state = {
  db: null,
  mode: null,
};

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
const PRODUCTION_URI = 'mongodb://localhost:27017/production';
const TEST_URI = 'mongodb://localhost:27017/test';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

// To connect to either the production or the test database
exports.connect = (mode, done) => {
  if (state.db) return done();

  const uri = mode === exports.MODE_TEST ? TEST_URI : PRODUCTION_URI;

  MongoClient.connect(uri, (err, db) => {
    if (err) return done(err);
    state.db = db;
    state.mode = mode;
    console.log(`Database successfully connected to ${uri}!`);
    done();
  });
};

// To get an active database connection
exports.getDB = () => state.db;

// To clear all collections in the database
exports.drop = (done) => {
  if (!state.db) return done();
  // This is faster then dropping the database
  // state.db.collection('studentData').remove({});
  state.db.collections((err, collections) => {
    async.each(collections, (collection, cb) => {
      if (collection.collectionName.indexOf('system') === 0) {
        return done();
      }
      collection.remove(cb);
    }, done);
  });
};

// Load data from an array of JSON objects into the database
exports.fixtures = (arrayOfJSONs, done) => {
  const db = state.db;
  if (!db) {
    return done(new Error('Missing database connection.'));
  }

  db.createCollection('studentData', (err) => {
    if (err) return done(err);
    const studentData = db.collection('studentData');
    // TODO: NEED TO FORMAT THE DATA THAT WE ARE TESTING AGAINST:
    arrayOfJSONs.forEach((obj) => {
      dbFormatter.keysToFormat().forEach((key) => {
        obj[key] = dbFormatter.format(key, obj[key]);
      });
      // arrayOfJSONs.push(jsonObj);
    });

    try {
      studentData.insertMany(arrayOfJSONs);
    } catch (e) {
      return done(e);
    }
    return done();
  });
};
