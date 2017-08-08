const express = require('express');
// const mongo = require('mongodb');
const routes = require('./app/routes/index.js');
const db = require('./db.js');

const app = express();

db.connect(db.MODE_PRODUCTION, (err) => {
  if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
  app.use('/public', express.static(`${process.cwd()}/public`));
  app.use('/controllers', express.static(`${process.cwd()}/app/controllers`));

  routes(app, db);

  app.listen(3000, () => {
    console.log('Node.js listening on port 3000...');
  });
});
// mongo.connect('mongodb://localhost:27017/studentData', (err, db) => {
//   app.use('/public', express.static(`${process.cwd()}/public`));
//   app.use('/controllers', express.static(`${process.cwd()}/app/controllers`));

//   routes(app, db);

//   app.listen(3000, () => {
//     console.log('Node.js listening on port 3000...');
//   });
// });
