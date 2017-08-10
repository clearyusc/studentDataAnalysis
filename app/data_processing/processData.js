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
      if (err) done(err);
      if (results) done(results);
    });
  },

  // e.g. Find the average final grade (xKey) based on whether or not a student had internet (yKey)
  avgXForY: (xKey, yKey, dbCollection, done) => {
    const queryXKey = `$${xKey}`;
    const queryYKey = `$${yKey}`;
    dbCollection.aggregate([
      {
        $group: {
          _id: queryYKey,
          avgXValue: {
            $avg: queryXKey,
          },
        },
      },
      { $sort: {
        _id: 1,
      },
      },
    ]).toArray((err, results) => {
      console.log('queryXKey = ', queryXKey);
      console.log('queryYKey = ', queryYKey);
      console.log('axgXForY: DIZZZ IZ HOW MANY= ', results.length);
      if (err) done(err, null);
      done(null, results); // 'null' because there is no error
    });
  },

  // e.g. Generate data points for a graph of travel time to overall grade
  compareXAndY: (xKey, yKey, dbCollection, done) => {
    const queryXKey = `$${xKey}`;
    const queryYKey = `$${yKey}`;
    const projectQuery = {
      _id: `${xKey} vs. ${yKey}`,
      x: queryXKey,
      y: queryYKey,
    };

    const sortQuery = {};
    sortQuery[xKey] = 1;

    // console.log('projQuery = ', JSON.stringify(projectQuery));
    // console.log('sortQuery = ', JSON.stringify(sortQuery));
    dbCollection.aggregate([
      {
        $sort: sortQuery,
      },
      {
        $project: projectQuery,
      },
    ]).toArray((err, results) => {
      if (err) done(err, null);
      //   if (Object.keys(result).includes(xKey) === false) {
      //     results.splice(index, 1);
      //   }
      console.log(`DEEEZ= ${JSON.stringify(results, null, 3)}`);

      done(null, results); // 'null' because there is no error
    });
  },
};

module.exports = processData;
