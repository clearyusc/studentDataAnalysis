const assert = require('assert');
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

describe('CSV To MongoDB', () => {
  describe('#csvToJSON', () => {
    it('should read in the correct amount of objects', (done) => {
      const arrayOfJSONs = [];
      //assert.equal(15, 0);
      csvConverter.csvToJSON(`${process.cwd()}/student-mat.csv`, arrayOfJSONs, done);
      console.log("array length = "+arrayOfJSONs.length);
      assert.equal(arrayOfJSONs.length, 395);
      //assert.deepEqual(15, 0);
      
    });
  });
});
// }

// 3 - 
// module.exports = testCSVDataParser;
