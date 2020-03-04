const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: {type: String},
    image: {type: String},
    comment: {type: String},
    tags: {type: String},
    }, {
        collection: 'items',
        versionKey: false,
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
);

const Item = mongoose.model('item', itemSchema);

module.exports = Item;

