const assert = require('assert');

const fixtures = require(`${process.cwd()}/test/fixtures/model-studentData.json`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
const DB = require(`${process.cwd()}/db.js`);


describe('Process Data - test suite', () => {
  describe('#averageXBasedOnY', () => {
    before((done) => {
      DB.connect(DB.MODE_TEST, done);
    });
    beforeEach((done) => {
      DB.drop((err) => {
        if (err) return done(err);
        DB.fixtures(fixtures, done);
      });
    });

    it('Should correctly calculate the average X for some Y', (done) => {      
      //  avgXForY: (xKey, yKey, yVal, dbCollection) => {
      const db = DB.getDB();
      const studentData = db.collection('studentData');

      processData.avgXForY('G3', 'sex', 'M', studentData, (result) => {
        assert.equal(result, 15);
      });
    });
  });


  describe('#findsDocsWithValueForKey', () => {
    before((done) => {
      DB.connect(DB.MODE_TEST, done);
    });
    beforeEach((done) => {
      DB.drop((err) => {
        if (err) return done(err);
        DB.fixtures(fixtures, done);
      });
    });

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
