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
      const db = DB.getDB();
      const studentData = db.collection('studentData');

      //processData.avgXForY('G3', 'sex', 'M', studentData, arr, (err, results) => {
      processData.avgXForY('G3', 'sex', studentData, (err, results) => {
        if (err) done(err);
        console.log('results1:', JSON.stringify(results));
        let a = [];
        
        results.forEach((elem)=>{
          console.log(JSON.parse(JSON.stringify(elem)));
        });

        console.log("arr length = "+results.length);
        //let k = JSON.parse(JSON.stringify(arr[0]));
        console.log('typeof = '+typeof results[0]);
        console.log("arr[0] = "+JSON.stringify(results[0], null, 2));
        assert.equal(results[0]['avgXValue'], 15);
        done();
      });
    });

    // it('Should correctly calculate the average X for some Y', (done) => {
    //   const db = DB.getDB();
    //   const studentData = db.collection('studentData');

    //   processData.avgXForY('G3', 'sex', 'M', studentData, (results) => {
    //     assert.equal(results[0].avgXValue, 15);
    //     done();
    //   });
    // });
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
