'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('config');
var uuid = require('uuid');
console.info(config.get('database.library.url'));
var db = mongoose.createConnection(config.get('database.library.url'));
// ---------------------------------------------------------------//
//                   SCHEMA
// ---------------------------------------------------------------//

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        default: uuid.v1
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

// ---------------------------------------------------------------//
//                   EXPORT
// ---------------------------------------------------------------//

module.exports = db.model('User', userSchema);