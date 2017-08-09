// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
const csvConverter = require(`${process.cwd()}/app/data_processing/csvConverter.js`);

module.exports = function (app, db) {
  // const clickHandler = new ClickHandler(db);

  app.route('/')
    .get((req, res) => {
      res.sendFile(`${process.cwd()}/public/index.html`);
    });

  app.route('/api/data/:x/:y')
    .get((req, res) => {
      const dbColl = db.collection('studentData');
      processData.avgXForY(req.params.x, req.params.y, dbColl, (err, results) => {
        // if (err) done(err); //error handling!
        res.send(results);
        // done(); //how do we handle this here?!
      });
    });

  app.route('/api/data/csvtomongo')
    .get((req, res) => {
      const filepath = `${process.cwd()}/student-mat.csv`;
      csvConverter.csvToMongoDB(filepath, db, (err) => {
        if (err) {
          res.send('Error! Problem parsing csv and storing it on the database:', err);
        } else {
          res.send('Successfully stored the csv on the database!');
        }
      });
    });

  // .post(clickHandler.addClick)
  // .delete(clickHandler.resetClicks);
};
