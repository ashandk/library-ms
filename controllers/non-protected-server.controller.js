var express = require('express');
var router = express.Router();
var config = require('config');
var userController = require('../controllers/user-server.controller.js');

router.post(config.get('user.route.authenticate'), function(req, res) {
        return userController.getAuthenticate(req, res);
});


module.exports = router;