var express = require('express');
var router = express.Router();
var config = require('config');
var libraryController = require('../controllers/library-server.controller.js');

router.get(config.get('library.route.getAllBooks'), function(req, res){
            return libraryController.getAllBooks(req, res); // string apifunctions here
});

router.post(config.get('library.route.insertBook'), function(req, res){
    return libraryController.insertBook(req, res); // string apifunctions here
});

router.post(config.get('library.route.deleteBook'), function(req, res){
    return libraryController.deleteBook(req, res); // string apifunctions here
});


module.exports = router;