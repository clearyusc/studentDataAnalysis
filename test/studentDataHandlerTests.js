const assert = require('assert');
const sinon = require('sinon');
const mongo = require('mongodb');

// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const csvConverter = require(`${process.cwd()}/app/csvConverter.js`);
// const csvConverter = require('/Users/ryancleary/Development/Projects/studentDataAnalytics/app/csvCo')

// describe('Array', () => {
//   describe('#indexOf()', () => {
//     it('should return -1 when the value is not present', () => {
//       assert.equal(-1, [1, 2, 3].indexOf(4));
//     });
//   });
// });


// 1 - Input data from the csv file into the database
// 2 - Parse the csv data into a JSON object

// function testCSVDataParser() {
// let studentDataObjects = csvConverter.csvToJSON(`${process.cwd()}/student-mat.csv`);
// console.log(`THE FILEPATH = ${process.cwd()}/app/csvConverter.js`);

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
    let sandbox;
    beforeEach(() => {
      sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should be an empty collection at the start', () => {
      assert.equal(sandbox.stub(mongo.database.collection, 'findOne').return({}), {});
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
