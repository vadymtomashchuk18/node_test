const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const posts = require('./seeds/posts');
const counters = require('./seeds/counters');

MongoClient.connect(db.url, { useNewUrlParser: true }, async (err, database) => {
  const collectionPosts = 'posts';
  const collectionCounters = 'counters';
  const dbs = database.db('node_test_db');

  try {
    await dbs.collection(collectionPosts).drop();
  } catch (e) {
    console.log(e);
  }
  await dbs.collection(collectionPosts).insertMany(posts);

  try {
    await dbs.collection(collectionCounters).drop();
  } catch (e) {
    console.log(e);
  }
  await dbs.collection(collectionCounters).insertOne(counters);
  // dbs.close
  // dbs.collection(collectionPosts).insertMany(posts);
  // dbs.collection(collectionCounters).drop();
  // dbs.collection(collectionCounters).insertOne(counters);
  database.close();
});
