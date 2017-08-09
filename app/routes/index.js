// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
const csvConverter = require(`${process.cwd()}/app/data_processing/csvConverter.js`);

module.exports = (app, db) => {
  // const clickHandler = new ClickHandler(db);

  app.route('/')
    .get((req, res) => {
      return res.sendFile(`${process.cwd()}/public/index.html`);
    });

  app.route('/api/data/:x/:y')
    .get((req, res) => {
      const dbColl = db.collection('studentData');
      processData.avgXForY(req.params.x, req.params.y, dbColl, (err, results) => {
        // if (err) done(err); //error handling!
        return res.send(results);
        // done(); //how do we handle this here?!
      });
    });

  app.route('/api/data/csvtomongo')
    .get((req, res) => {
      console.log('HOW MANY TIMES IS THIS BEING CALLED12345?');
      const filepath = `${process.cwd()}/test/student-mat.csv`;
      csvConverter.csvToMongoDB(filepath, db, (err) => {
        console.log('#1 being called?');
        if (err) {
          // 500 = Internal Server Error
          console.log('#2 being called?');
          return res.status(404).send(err);
          // res.send('Error! Problem parsing csv and storing it on the database:', err);
        } else {
          console.log('#3 being called?');
          return res.send('Successfully stored the csv on the database!');
        }
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
