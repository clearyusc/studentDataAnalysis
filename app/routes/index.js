// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
const csvConverter = require(`${process.cwd()}/app/data_processing/csvConverter.js`);


module.exports = (app, db) => {
  // const clickHandler = new ClickHandler(db);

  app.route('/')
    .get((req, res) => res.sendFile(`${process.cwd()}/public/index.html`));

  app.route('/api/data/:x/:y')
    .get((req, res) => {
      const dbColl = db.collection('studentData');
      console.log(`ZERO: xParam = ${req.params.x}, yParam = ${req.params.y}`);
      processData.avgXForY(req.params.x, req.params.y, dbColl, (err, results) => {
        console.log('ALPHA= ', JSON.stringify(results));
        if (err) {
          // 500 = Internal Server Error
          return res.status(500).send(err);
        }
        return res.send(results);
      });
    });

  app.route('/api/data/graph/:x/:y')
    .get((req, res) => {
      const dbColl = db.collection('studentData');
      // processData.compareXAndY(req.params.x, req.params.y, dbColl, (err, results) => {
        processData.avgXForY(req.params.x, req.params.y, dbColl, (err, results) => {
        if (err) {
          // 500 = Internal Server Error
          return res.status(500).send(err);
        }
        return res.send(results);
      });
    });


  app.route('/api/data/csvtomongo')
    .get((req, res) => {
      const filepath = `${process.cwd()}/test/student-mat.csv`;
      csvConverter.csvToMongoDB(filepath, db, (err) => {
        if (err) {
          // 500 = Internal Server Error
          return res.status(404).send(err);
          // res.send('Error! Problem parsing csv and storing it on the database:', err);
        }
        return res.send('Successfully stored the csv on the database!');
      });
    });


  app.route('/api/data/reset')
    .get((req, res) => {
      db.collection('studentData').drop((err) => {
        if (err) {
          // 500 = Internal Server Error
          return res.status(404).send(err);
          // res.send('Error! Problem parsing csv and storing it on the database:', err);
        }
        return res.send('Successfully reset the database!');
      });
    });

  // app.use((req, res, next) => {
  //   res.status(404);

  //   // respond with html page
  //   if (req.accepts('html')) {
  //     res.render('404', { url: req.url });
  //     return;
  //   }

  //   // respond with json
  //   if (req.accepts('json')) {
  //     res.send({ error: 'Not found' });
  //     return;
  //   }

  //   // default to plain-text. send()
  //   res.type('txt').send('Not found');
  // });

  // .post(clickHandler.addClick)
  // .delete(clickHandler.resetClicks);
};
