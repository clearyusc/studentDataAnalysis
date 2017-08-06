import each from 'async/each';

const MongoClient = require('mongodb').MongoClient;
const fixtures = require(`${process.cwd()}/test/fixtures/model-studentData.json`);
// Much credit for mongodb testing is due to this tutorial: https://www.terlici.com/2014/09/15/node-testing.html
// TO-DO: refactor this code so it is more similar to my style (return single object for export w/ multi functions)
// async = require('async');

const state = {
  db: null,
  mode: null,
};

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
const PRODUCTION_URI = 'mongodb://localhost/production';
const TEST_URI = 'mongodb://localhost/test';

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
    done();
  });
};

// To get an active database connection
exports.getDB = function () {
  return state.db;
};

// To clear all collections in the database
exports.drop = (done) => {
  if (!state.db) return done();
  // This is faster then dropping the database
  state.db.collections((err, collections) => {
    each(collections, (collection, cb) => {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb();
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
    try {
      studentData.insertMany(arrayOfJSONs);
    } catch (e) {
      return done(e);
    }
  });
  //const names = Object.keys(data.collections);
  // each(array, (name, cb) => {
  //   db.createCollection(name, (err, collection) => {
  //     if (err) return cb(err);
  //     collection.insert(data.collections[name], cb);
  //   });
  // }, done);
};
