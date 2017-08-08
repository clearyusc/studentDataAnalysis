/* 
1. Calculate avg final grade based on other variable
  IDEA: Pass in the comparison operator. Makes it VERY flexible.
2. Calculate graph data of overall final grade based on any other variable
3. Optional: “Smart Analytics”
*/

const processData = {

  findDocsWithValueForKey: (value, key, dbCollection, done) => {
    const query = {};
    query[key] = value;
    dbCollection.find(query).toArray((err, results) => {
      if (err) {
        done(err);
      }
      if (results) {
        done(results);
      }
    });
  },

  // e.g. Find the average final grade (xKey) based on whether or not a student had internet (yKey)
  avgXForY: (xKey, yKey, dbCollection, done) => {
    const queryXKey = `$${xKey}`;
    const queryYKey = `$${yKey}`;
    //console.log(dbCollection);
    dbCollection.aggregate([
      {
        $group: {
          _id: queryYKey,
          avgXValue: {
            $avg: queryXKey,
          },
        },
      },
    ]).toArray((err, results) => {
      if (err) done(err);
      results.forEach((item) => {
        console.log('RESULT = ' + JSON.stringify(item));
        //resultsArray.push(item);
      });
      done(null, results); // 'null' because there is no error
    });
    //done();
  },

  // // e.g. Generate data points for a graph of travel time to overall grade
  // compareXAndY: (xKey, yKey, dbCollection, resultsArray, done) => {
  //   const queryXKey = `$${xKey}`;
  //   const queryYKey = `$${yKey}`;

  //   dbCollection.aggregate([
  //     {
  //       $projection: {
  //         _id: `${xKey} vs. ${yKey}`,
  //         xKey: 1,
  //         yKey: 1,
  //       },
  //     },
  //   ]).toArray((err, results) => {
  //     if (err) done(err);
  //     results.forEach((item) => {
  //       console.log('RESULT = ' + JSON.stringify(item));
  //       resultsArray.push(item);
  //     });
  //     done(null, results); // 'null' because there is no error
  //   });
  //   done();
  // },
};

module.exports = processData;

/*
dbCollection.aggregate([
      {
        $group: {
          _id: { yKey: aggYKey },
          avgXValue: {
            $avg: aggXKey,
          },
        },
      },
      */
