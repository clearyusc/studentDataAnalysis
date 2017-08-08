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

      processData.avgXForY('G3', 'sex', 'M', studentData, (err, results) => {
        if (err) done(err);

        console.log("___DIS = "+results);
        let a = [];
        a = a.concat(results);
        let b = [];
        a.forEach((element) => {
          console.log(JSON.stringify(element, null, 2));
          b.push(JSON.parse(element));
        }, this);          
        
        console.log("THEES FIRST = "+JSON.stringify(b, null, 2));
        assert.equal(b[0]['avgXValue'], 15);
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
