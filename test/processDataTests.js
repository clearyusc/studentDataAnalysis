const assert = require('assert');

const fixtures = require(`${process.cwd()}/test/fixtures/model-studentData.json`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
const DB = require(`${process.cwd()}/db.js`);

function prepareTestDatabase() {
  before((done) => {
    DB.connect(DB.MODE_TEST, done);
  });
  beforeEach((done) => {
    DB.drop((err) => {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });
}


describe('Process Data - test suite', () => {
  prepareTestDatabase();

  it('Should correctly calculate the average X for some Y', (done) => {
    const db = DB.getDB();
    const studentData = db.collection('studentData');

    processData.avgXForY('G3', 'sex', studentData, (err, results) => {
      if (err) done(err);

      assert.equal(results[0].avgXValue, 15);
      done();
    });
  });


  describe('#compareXAndY', () => {
    prepareTestDatabase();

    it('Should return the correct data pair for the given input', (done) => {
      const db = DB.getDB();
      const studentData = db.collection('studentData');

      processData.compareXAndY('age', 'G3', studentData, (err, results) => {
        if (err) done(err);
        
        assert.equal(results[0].age, 15);
        assert.equal(results[0].G3, 10);
        done();
      });
    });
  });


  describe('#findsDocsWithValueForKey', () => {
    prepareTestDatabase();

    it('Should find the right number of documents with the given value', (done) => {
      const db = DB.getDB();
      const studentData = db.collection('studentData');

      processData.findDocsWithValueForKey('M', 'sex', studentData, (results) => {
        assert.equal(results.length, 2); // 2 is expected from our data sample
        done();
      });
    });
  });
});
