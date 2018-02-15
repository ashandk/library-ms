'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('config');
var uuid = require('uuid');
var db = mongoose.createConnection(config.get('database.library.url'));
// ---------------------------------------------------------------//
//                   SCHEMA
// ---------------------------------------------------------------//

var librarySchema = new Schema({
    bookId: {
        type: String,
        unique: true,
        default: uuid.v1
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    introducedDate: {
        type: Date,
        default: Date.now
    }
});

// ---------------------------------------------------------------//
//                   EXPORT
// ---------------------------------------------------------------//

module.exports = db.model('Library', librarySchema);