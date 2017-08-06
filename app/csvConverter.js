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
  },

  writeJSONsToDB: (db, arrayOfJSONs, callback) => {
    const studentData = db.collection('studentData');
    const sdProjection = { _id: false };
    
    // All we need to do is INSERT for now
    studentData.findOne({}, sdProjection, (err, result) => {
      if (err) {
        throw err;
      }

      if (result) {
        //res.json(result);
        // We want to start with fresh data each time we load this program.
        db.studentData.deleteMany({});
      } else {
        studentData.insertMany(arrayOfJSONs, (err2) => {
          if (err2) {
            throw err2;
          }

          studentData.find({}, sdProjection).toArray((err3, studentDataResults) => {
            if (err3) {
              throw err3;
            }

            console.log(`Found the following student docs: ${studentDataResults}`);
          });
        });
      }
    });
  },

};

module.exports = csvConverter;
