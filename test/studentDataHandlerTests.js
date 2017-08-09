const assert = require('assert');

const fixtures = require(`${process.cwd()}/test/fixtures/model-studentData.json`);
const DB = require(`${process.cwd()}/db.js`);
const csvConverter = require(`${process.cwd()}/app/data_processing/csvConverter.js`);
const csvFilepath = `${process.cwd()}/test/student-mat.csv`;
const numObjectsTestCSV = 395;

// 1 - Input data from the csv file into the database
// 2 - Parse the csv data into a JSON object

// TO-DO: implement the following test:
// it('should throw an error if there is an error reading the file', arrayOfJSONs, done(err)); 

// TO-DO: write more tests to cover edge cases

// TO-DO: Figure out why sometimes there is an 'Uncaught MongoError: E11000 duplicate key error collection'

describe('hooks', () => {
  before((done) => {
    DB.connect(DB.MODE_TEST, done);
  });
  beforeEach((done) => {
    DB.drop((err) => {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });

  describe('CSV To MongoDB - test suite', () => {
    describe('#csvToJSON', () => {
      it('should read in the correct number of JSON objects from csv file', (done) => {
        const arrayOfJSONs = [];
        csvConverter.csvToJSON(csvFilepath, arrayOfJSONs, () => {
          assert.equal(arrayOfJSONs.length, numObjectsTestCSV);
          done();
        });
      });
    });


    describe('#csvToJSON', () => {
      it('should correctly read the header (key values)', (done) => {
        const arrayOfJSONs = [];
        const correctKeys = ['school', 'sex', 'age', 'address', 'famsize', 'Pstatus', 'Medu', 'Fedu', 'Mjob', 'Fjob', 'reason',
          'guardian', 'traveltime', 'studytime', 'failures', 'schoolsup', 'famsup', 'paid', 'activities', 'nursery', 'higher',
          'internet', 'romantic', 'famrel', 'freetime', 'goout', 'Dalc', 'Walc', 'health', 'absences', 'G1', 'G2', 'G3'];
        csvConverter.csvToJSON(csvFilepath, arrayOfJSONs, () => {
          assert.deepEqual(Object.keys(arrayOfJSONs[0]), correctKeys);
          done();
        });
      });
    });


    describe('#writeJSONsToDB', () => {
      it('DB.fixtures should properly set up small test data.', (done) => {
        const db = DB.getDB();
        const studentData = db.collection('studentData');

        studentData.find({}).toArray((err, results) => {
          if (err) {
            done(err);
          }
          if (results) {
            results.forEach((result, index) => {
              const keys = Object.keys(result);
              keys.forEach((key) => {
                assert.equal(`${result[key]}`, `${fixtures[index][key]}`); // it wouldn't see that 2 ids were the same unless string()
              });
            });
          }
          done();
        });
      });

      it('JSON data should be correctly written to database.', (done) => {
        const db = DB.getDB();
        csvConverter.writeJSONsToDB(db, fixtures, (err1) => {
          if (err1) done(err1);
          else {
            db.collection('studentData').find({}).toArray((err2, results) => {
              if (err2) {
                done(err2);
                return;
              }
              assert.deepEqual(results, fixtures);
              done();
            });
          }
        });
      });


      describe('#csvToMongoDB', () => {
        it('should find the correct number of csv file objects in the database', (done) => {
          const db = DB.getDB();
          csvConverter.csvToMongoDB(csvFilepath, db, (err1) => {
            if (err1) done(err1);
            else {
              db.collection('studentData').find({}).toArray((err2, results) => {
                if (err2) {
                  done(err2);
                }
                if (results) assert.deepEqual(results.length, numObjectsTestCSV);
                done();
              });
            }
          });
        });
      });

    // it('should make a new collection if none exists', (done) => {
    //   // mock the DB
    //   //
    //   csvConverter.writeJSONsToDB(sandbox.stub(db, 'insertMany')
    //     .returns([{ test1: 'cool', test2: 'neat' }, { test1: 'cool', test2: 'neat' }]));
    // });
    });
  });
});
// }

// 3 - 
// module.exports = testCSVDataParser;
