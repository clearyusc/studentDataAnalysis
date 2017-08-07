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

  avgXForY: (xAttr, yAttr, yVal, dbCollection) => {
    // check x, y !Exist in data keyset
    // find(query, projection)
    dbCollection.find({ yAttr: { $eq: yVal } }).toArray((err, results) => {
      if (err) {
        done(err);
      }
      if (results) {
        // console.log("results = "+JSON.stringify(results));
        // console.log("fixtures = "+JSON.stringify(fixtures));
        // assert.deepEqual(results, fixtures);
      }
    });
  },
};

module.exports = processData;
