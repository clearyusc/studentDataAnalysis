const csv = require('csvtojson');

const csvFilePath = '<path to csv file>';

const converter = csv({
  delimiter: ';',
});

const csvConverter = {
  csvToMongoDB: (filepath, db, callback) => {
    const arrayOfJSONs = [];
    this.csvToJSON(filepath, arrayOfJSONs, () => {
      // callback function
    });
  },

  csvToJSON: (filepath, arrayOfJSONs, callback) => {
    converter.on('json', (jsonObj, rowIndex) => {
      // jsonObj=> {header1:cell1,header2:cell2} 
      // rowIndex=> number 
      const testObj = { cat: 1, dog: 2 };
      arrayOfJSONs.push(testObj);
    });
    const testObj = { cat: 1, dog: 2 };
      arrayOfJSONs.push(testObj);
  },


};


// const csvConverter = () => {
//   this.csvToJSON = (filepath) => {
//     converter.on('json', (jsonObj, rowIndex) => {
//       // jsonObj=> {header1:cell1,header2:cell2} 
//       // rowIndex=> number 
//     });
//     return 20;
//   };
// };


module.exports = csvConverter;
