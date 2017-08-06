const assert = require('assert');
// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const csvConverter = require(`${process.cwd()}/app/csvConverter.js`);
//const csvConverter = require('/Users/ryancleary/Development/Projects/studentDataAnalytics/app/csvCo')

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
console.log(`THE FILEPATH = ${process.cwd()}/app/csvConverter.js`);
assert.equal(
  csvConverter.csvToJSON(`${process.cwd()}/student-mat.csv`)
    .length,
  395);
// }

// 3 - 
// module.exports = testCSVDataParser;
