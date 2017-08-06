const assert = require('assert');

const fixtures = require(`${process.cwd()}/test/fixtures/model-studentData.json`);
const DB = require(`${process.cwd()}/db.js`);
const csvConverter = require(`${process.cwd()}/app/csvConverter.js`);

// 1 - Input data from the csv file into the database
// 2 - Parse the csv data into a JSON object

describe('CSV To MongoDB - test suite', () => {
  describe('#csvToJSON', () => {
    it('should read in the correct amount of objects', (done) => {
      const arrayOfJSONs = [];
      csvConverter.csvToJSON(`${process.cwd()}/student-mat.csv`, arrayOfJSONs, done);
      assert.equal(arrayOfJSONs.length, 395);
    });

    // TO-DO: implement this test
    // it('should throw an error if there is an error reading the file', arrayOfJSONs, done(err)); 
  });

  describe('#writeJSONsToDB', () => {
    before((done) => {
      DB.connect(DB.MODE_TEST, done);
    });
    beforeEach((done) => {
      DB.drop((err) => {
        if (err) return done(err);
        DB.fixtures(fixtures, done);
      });
    });

    it('see if db fixtures set up is working', (done) => {
      const db = DB.getDB();
      const studentData = db.collection('studentData');
      // const sdProjection = { _id: false };

      studentData.find({}).toArray((err, results) => {
        if (err) {
          done(err);
        }
        if (results) {
          // console.log("results = "+JSON.stringify(results));
          // console.log("fixtures = "+JSON.stringify(fixtures));
          assert.deepEqual(results, fixtures);
        }
        done();
      });
    });

    it('see if the JSON data is being correctly written to database', (done) => {
      const db = DB.getDB();
      try {
        csvConverter.writeJSONsToDB(db, fixtures, () => {     
          db.collection('studentData').find({}).toArray((err, results) => {
            if (err) {
              done(err);
            }
            if (results) assert.deepEqual(results, fixtures);
          });
        });
      } catch (e) {
        done(e);
      }
      done();
    });

    // it('should make a new collection if none exists', (done) => {
    //   // mock the DB
    //   //
    //   csvConverter.writeJSONsToDB(sandbox.stub(db, 'insertMany')
    //     .returns([{ test1: 'cool', test2: 'neat' }, { test1: 'cool', test2: 'neat' }]));
    // });
  });
});
// }

// 3 - 
// module.exports = testCSVDataParser;
