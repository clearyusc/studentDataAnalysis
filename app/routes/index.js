// const ClickHandler = require(`${process.cwd()}/app/controllers/clickHandler.server.js`);
const processData = require(`${process.cwd()}/app/data_processing/processData.js`);
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
        //if (err) done(err); //error handling!
        res.send(results);
        //done(); //how do we handle this here?!
      });
    });
  // .post(clickHandler.addClick)
  // .delete(clickHandler.resetClicks);
};
