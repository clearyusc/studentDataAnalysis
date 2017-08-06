const csv = require('csvtojson');

const csvFilePath = '<path to csv file>';

const converter = csv({
  delimiter: ';',
});

const csvConverter = {
  csvToJSON: (filepath) => {
    converter.on('json', (jsonObj, rowIndex) => {
      // jsonObj=> {header1:cell1,header2:cell2} 
      // rowIndex=> number 
    });
    return [1, 2];
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
