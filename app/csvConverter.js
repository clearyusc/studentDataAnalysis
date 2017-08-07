const csv = require('csvtojson');

const csvConverter = {
  csvToMongoDB: (filepath, db, callback) => {
    const arrayOfJSONs = [];
    this.csvToJSON(filepath, arrayOfJSONs, () => {
      // callback function
    });
  },

  parseCSVHeader: (filepath, arrayOfKeys, callback) => {
    callback();
  },

  csvToJSON: (filepath, arrayOfJSONs, callback) => {
    console.log('CSV FILE = '+filepath);
    
    // csv({
    //   delimiter: ';',
    // })
    //   .fromFile(filepath)
    //   .on("end_parsed",function(arrayOfJSONs){ //when parse finished, result will be emitted here.
    //     console.log(arrayOfJSONs); 
    //     callback();
    //   })

    // const parser = csvParse({ delimiter: ';' }, (err, data) => {
    //   console.log(data);
    // });
    // fs.createReadStream(filepath).pipe(parser);

    csv({
      delimiter: ';',
    })
      .fromFile(filepath)
      .on('json', (jsonObj) => {        
        arrayOfJSONs.push(jsonObj);
        // combine csv header row and csv line to a json object 
        // jsonObj.a ==> 1 or 4 
      })
      .on('done', (error) => {
        if (error) callback(error);
        // arrayOfJSONs.forEach((obj) => {
        //   console.log(JSON.stringify(obj, undefined, 2));
        // });
        console.log('end csv to JSON');
        callback();
      }); 

    // converter.on('json', (jsonObj, rowIndex) => {
    //   // jsonObj=> {header1:cell1,header2:cell2} 
    //   // rowIndex=> number 
    //   const testObj = { cat: 1, dog: 2 };
    //   arrayOfJSONs.push(testObj);
    // });
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
        // res.json(result);
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
