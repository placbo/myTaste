const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const URL = "mongodb://localhost:27017/mytaste";
const COLLECTION_NAME = "users";

const findDocuments = (db, callback) => {
  const collection = db.collection(COLLECTION_NAME);
  collection.find({}).toArray(function(err, docs) {
    if (err) throw err;
    console.log(
      `Total number of items in collection ${COLLECTION_NAME}: ${docs.length}`
    );
    console.log(docs);
    callback();
  });
};

MongoClient.connect(
  URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db();
    findDocuments(db, () => {
      client.close();
    });
  }
);
