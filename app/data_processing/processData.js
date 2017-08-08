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

  // e.g. Find the average final grade (xKey) for students who had internet at home (yVal for yKey)
  avgXForY: (xKey, yKey, yVal, dbCollection, done) => {
    // check x, y !Exist in data keyset
    // find(query, projection)
    const query = {};
    query[yKey] = yVal;

    // TODO: use allVals = dbCollection.disctint(xKey) to programatically make _id: {xKey:allVals[0..n]}
    // HARD CODE FIRST TO LEARN IT:

    const aggXKey = `$${xKey}`;
    const aggYKey = `$${yKey}`;

    dbCollection.aggregate([
      {
        $group: {
          _id: { sex: aggYKey },
          avgXValue: {
            $avg: aggXKey,
          },
        },
      },
    ]).toArray((err, results) => {
      if (err) done(err);
      results.forEach((item) => {
        console.log("RESULT = "+JSON.stringify(item));
      });
      done(null, results); // 'null' because there is no error
    });


    // processData.avgXForY('G3', 'sex', 'M', studentData, (result))
    //    dbCollection.aggregate([{ $group: { avgXKey: { $avg: xKey } } }]);
    // average final grade based on 
    // dbCollection.aggregate([
    //   {
    //     $group: {
    //       _id: yKey,
    //       avgXValue: {
    //         $avg: xKey,
    //       },
    //     },
    //   },
    // ]).toArray((err, results) => {
    //   results.forEach((item) => {
    //     console.log("RESULT = "+JSON.stringify(item));
    //   });
    //   done(results[0].avgXValue);
    // });

    // dbCollection.aggregate(
    //   [{ $match: query }],
    //   [{ $project: { _id: 0, yKey: 1 } }],
    //   [{ $group: null, avgXKey: { $avg: xKey } }]).toArray((err, results) => {
    //   // [{ $group: null, avg: { $avg: xKey } }]).toArray((err, results) => {
    //   if (err) done(err);

    //   console.log('RESULTS = ');
    //   results.forEach((item) => {
    //     console.log(JSON.stringify(item));
    //   });
    //   done(results.avgXKey);
    // });
    // processData.findDocsWithValueForKey(yVal, yKey, dbCollection, () => {

    // });
    done();
  },
};

module.exports = processData;
