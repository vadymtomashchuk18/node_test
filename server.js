const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const chalk = require('chalk');
const db = require('./config/db');

const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) => {
  if (err) console.log(err);

  /* eslint-disable global-require */
  const dbs = database.db('node_test_db');
  require('./app/routes')(app, dbs);
  /* eslint-disable global-require */

  app.listen(port, () => {
    console.log(`Listening on port ${chalk.green(port)}`);
  });
});
