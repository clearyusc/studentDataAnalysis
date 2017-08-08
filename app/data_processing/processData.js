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
    ]).toArray((err, results) => {
      if (err) done(err);
      done(null, results); // 'null' because there is no error
    });
  },

  // e.g. Generate data points for a graph of travel time to overall grade
  compareXAndY: (xKey, yKey, dbCollection, done) => {
    const projectQuery = { _id: `${xKey} vs. ${yKey}` };
    projectQuery[xKey] = true;
    projectQuery[yKey] = true;

    const sortQuery = {};
    sortQuery[xKey] = 1;
    
    dbCollection.aggregate([
      {
        $project: projectQuery,
      },
      {
        $sort: sortQuery,
      },
    ]).toArray((err, results) => {
      if (err) done(err, null);
      
      done(null, results); // 'null' because there is no error
    });
    // dbCollection.aggregate([
    //   {
    //     $project: {
    //       _id: `${xKey} vs. ${yKey}`,
    //       queryXKey: 1,
    //       queryYKey: 1,
    //     },
    //   },
    // ]).toArray((err, results) => {
    //   if (err) done(err);
    //   results.forEach((item) => {
    //     console.log(`RESULT = ${JSON.stringify(item)}`);
    //   });
    //   done(null, results); // 'null' because there is no error
    // });
  },
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