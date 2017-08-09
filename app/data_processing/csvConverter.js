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

    // All we need to do is INSERT for now
    studentData.findOne({}, sdProjection, (err, result) => {
      if (err) {
        callback(err);
      }

      if (result) {
        // res.json(result);
        // We want to start with fresh data each time we load this program.
        db.studentData.deleteMany({});
      } else {
        studentData.insertMany(arrayOfJSONs, (err2) => {
          if (err2) {
            callback(err2);
          }

          studentData.find({}, sdProjection).toArray((err3, studentDataResults) => {
            if (err3) {
              callback(err3);
            }

            console.log(`Found the following student docs: ${studentDataResults}`);
          });
        });
      }
    });

    callback();
  },

  csvToMongoDB: (filepath, db, callback) => {
    const arrayOfJSONs = [];
    csvConverter.csvToJSON(filepath, arrayOfJSONs, () => {
      csvConverter.writeJSONsToDB(db, arrayOfJSONs, () => {
        callback();
      });
    });
  },
};

module.exports = csvConverter;
