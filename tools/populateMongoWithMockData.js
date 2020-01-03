const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mockData = require('./mockData');

const URL = 'mongodb://localhost:27017/mytaste';
const COLLECTION_NAME = 'items';

const insertDocuments = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);


    collection.insertMany(mockData, (err, result) => {
        if (err) throw err;
        console.log(`Inserted ${result.insertedCount} documents into the collection ${COLLECTION_NAME}`);
        callback();
    });
};

const findDocuments = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err;
        console.log(`Total number of items in collection ${COLLECTION_NAME}: ${docs.length}`);
        callback();
    });
};

const dropCollection = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);
    collection.drop((err) => {
        (err && err.codeName === "NamespaceNotFound") ?
            console.log(`Collection ${COLLECTION_NAME} does not exist - nothing to delete`):
            console.log(`Collection ${COLLECTION_NAME} deleted`) ;
        callback();
    });
};


MongoClient.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db();
    dropCollection(db, () => {
        insertDocuments(db, () => {
            findDocuments(db, () => {
                client.close();
            });
        });
    })
});



