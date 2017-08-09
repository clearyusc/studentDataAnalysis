const csv = require('csvtojson');

const csvConverter = {
  csvToJSON: (filepath, arrayOfJSONs, callback) => {
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
        callback();
      });
  },

  writeJSONsToDB: (db, arrayOfJSONs, callback) => {
    const studentData = db.collection('studentData');
    const sdProjection = { _id: false };


    if (arrayOfJSONs.length <= 0) {
      callback(new Error('Tried to insert an empty array into the database. CSV file read error or emtpy CSV file.'));
    }
    studentData.insertMany(arrayOfJSONs, (err2) => {
      arrayOfJSONs.forEach((obj) => {
        console.log(obj['_id']);
      });
      console.log('#a');
      if (err2) {
        console.log('#b, err= ',err2);
        callback(err2);
        return;
      }

      studentData.find({}, sdProjection).toArray((err3, studentDataResults) => {
        console.log('#c');
        if (err3) {
          callback(err3);
          return;
        }
        console.log(`Found the following student docs: ${JSON.stringify(studentDataResults, null, 2)}`);
        callback(); // successfully callback
      });
    });

    // All we need to do is INSERT for now
    // studentData.findOne({}, sdProjection, (err, result) => {
    //   if (err) {
    //     callback(err);
    //   }

    //   if (result) {
    //     // We want to start with fresh data each time we load this program.

    //     // studentData.bulkWrite(
    //     //   [
    //     //     {
    //     //       deleteMany: {},
    //     //     },
    //     //     {
    //     //       insertMany: 
    //     //     }
    //     //   ]
    //     // )

    //     try {
    //       db.studentData.deleteMany({});
    //     } catch (e) {
    //       callback(e);
    //     }
    //   }
    //   if (arrayOfJSONs.length <= 0) {
    //     callback(new Error('Tried to insert an empty array into the database. CSV file read error or emtpy CSV file.'));
    //   }
    //   studentData.insertMany(arrayOfJSONs, (err2) => {
    //     if (err2) {
    //       callback(err2);
    //     }

    //     studentData.find({}, sdProjection).toArray((err3, studentDataResults) => {
    //       if (err3) {
    //         callback(err3);
    //       }
    //       //console.log(`Found the following student docs: ${JSON.stringify(studentDataResults, null, 2)}`);
    //       callback(); // successfully callback
    //     });
    //   });
    // });

    // callback(); // THIS IS THE WRONG CODE. THIS IS AHHHH!! ITS SYNCHRONOUS!
  },

  csvToMongoDB: (filepath, db, callback) => {
    const arrayOfJSONs = [];
    csvConverter.csvToJSON(filepath, arrayOfJSONs, (err1) => {
      if (err1) callback(err1);
      else {
        csvConverter.writeJSONsToDB(db, arrayOfJSONs, (err2) => {
          if (err2) callback(err2);
          else callback();
        });
      }
    });
  },
};

module.exports = csvConverter;
