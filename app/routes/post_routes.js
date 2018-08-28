// import { ObjectID } from 'mongodb';
// import mongoAutoincrement from 'mongodb-autoincrement';
const ObjectID = require('mongodb').ObjectId;
const mongoAutoincrement = require('mongodb-autoincrement');

module.exports = (app, db) => {
  const collectionName = 'posts';
  // Read
  // Get by id
  app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const details = { _id: new ObjectID(id) };
    db.collection(collectionName).findOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'Something wrong in getting item' });
      } else {
        res.send(item);
      }
    });
  });
  // Get all
  app.get('/posts', (req, res) => {
    db.collection(collectionName).find({}).toArray((err, result) => {
      if (err) {
        res.send({ error: 'Error with getting data!' });
      } else {
        res.send(result);
      }
    });
  });

  // Delete
  app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const details = { _id: new ObjectID(id) };
    db.collection(collectionName).deleteOne(details, (err, item) => {
      if (err) {
        res.send({ error: 'Deleting error' });
      } else {
        res.send(item);
      }
    });
  });

  // Update
  app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = {
      title: req.body.title, author: req.body.author, content: req.body.content,
    };
    const details = { _id: new ObjectID(id) };
    db.collection(collectionName).update(details, { $set: post }, (err, result) => {
      if (err) {
        res.send({ error: 'error has occured (udating).' });
      } else {
        res.send(result);
      }
    });
  });

  // Insert
  app.post('/posts', (req, res) => {
    mongoAutoincrement.getNextSequence(db, collectionName, (err, autoIndex) => {
      const post = {
        id: autoIndex.toString(),
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
      };
      if (err) {
        res.send({ error: 'Something wrong with autoincrement' });
      } else {
        db.collection(collectionName).insertOne(post, (er, result) => {
          if (er) {
            res.send({ error: 'An error has occurred' });
          } else {
            res.send(result.ops[0]);
          }
        });
      }
    });
  });
};
