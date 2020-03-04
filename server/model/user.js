const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        googleId: {type: String},
        name: {type: String},
        picture: {type: String}
    }, {
        collection: 'users',
        versionKey: false,
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }
);

const User = mongoose.model('user', userSchema);

module.exports = User;

