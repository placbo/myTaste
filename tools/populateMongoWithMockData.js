const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mockData = [
    {
        id: 1,
        title: "Idun ketchupPCB",
        comment: "kjedelig",
        imageLink: "2.jpg",
        tags: null,
        diceValue: 3
    },
    {
        id: 2,
        title: "TORO kakemix",
        comment: "grei",
        imageLink: "1.jpg",
        tags: null,
        diceValue: 4
    },
    {
        id: 3,
        title: "TORO kakemix2",
        comment: "grei",
        imageLink: "1.jpg",
        tags: null,
        diceValue: 4
    },
    {
        id: 4,
        title: "TORO kakemix3",
        comment: "grei",
        imageLink: "1.jpg",
        tags: null,
        diceValue: 4
    },
    {
        id: 5,
        title: "TORO kakemix4",
        comment: "grei",
        imageLink: "1.jpg",
        tags: null,
        diceValue: 4
    }
];

const url = 'mongodb://localhost:27017';
const DB_NAME = 'mytaste';
const COLLECTION_NAME = 'items';

const insertDocuments = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);
    collection.insertMany(mockData, (err, result) => {
        if (err) throw err;
        console.log(`Inserted ${result.insertedCount} documents into the collection`);
        callback(result);
    });
};

const findDocuments = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);
    collection.find({}).toArray(function (err, docs) {
        if (err) throw err;
        console.log(`total number of items in collection : ${docs.length}`);
        callback(docs);
    });
};

const dropCollection = (db, callback) => {
    const collection = db.collection(COLLECTION_NAME);
    collection.drop((err, delOK) => {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        callback(delOK);
    });
};


MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(DB_NAME);
    dropCollection(db, () => {
        insertDocuments(db, () => {
            findDocuments(db, () => {
                client.close();
            });
        });
    })
});



