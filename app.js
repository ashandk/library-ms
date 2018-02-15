#!/usr/bin/env node

"use strict";

// ---------------------------------------------------------------//
//                    BASE SETUP
// ---------------------------------------------------------------//
//module dependencies.
var express = require('express');
var app = express();
var debug = require("debug")("express:server");
var mongoose = require('mongoose')
var http = require("http");
var bodyParser = require('body-parser');
var multer = require('multer');
var jsyaml = require('js-yaml');
var fs = require('fs');
var config = require('config');
var libraryController = require('./controllers/library-server.controller.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// ---------------------------------------------------------------//
//                        CONNECTIONS
// ---------------------------------------------------------------//
//connect to db
mongoose.connect(config.get('database.library.url'), function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the database");
    }
});

//create http server
var serverPort = normalizePort(process.env.PORT || config.get('server.port'));
// var serverPort = 9954;
var server = http.createServer(app);

// ---------------------------------------------------------------//
//                        ACCESS CONTROL
// ---------------------------------------------------------------//
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization, access_token, organization_token");
        next();
    })
    .options('*', function(req, res, next) {
        res.end();
    });
// ---------------------------------------------------------------//
//                     ROUTERS
// ---------------------------------------------------------------//
/**
 * Respond to get and post requests.
 */
console.log('Library server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
var router = express.Router();
router.route(config.get('library.route.getAllBooks'))
    .get(function(req, res) {
        return libraryController.getAllBooks(req, res); // string apifunctions here
    });
router.route(config.get('library.route.insertBook'))
    .post(function (req, res) {
        return libraryController.insertBook(req, res);
    });
router.route(config.get('library.route.deleteBook'))
    .post(function(req, res) {
        return libraryController.deleteBook(req, res);
    });
app.use('/', router); //uses the routes for the extension

// ---------------------------------------------------------------//
//                    BASE SETUP
// ---------------------------------------------------------------//

//add error handler
//server.on("error", onError);

//start listening on port
///**
/* Normalize a port into a number, string, or false.
 */

server.listen(serverPort);
console.info("Server is listening on port : " + serverPort);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ?
        "Pipe " + port :
        "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ?
        "pipe " + addr :
        "port " + addr.port;
    debug("Listening on " + bind);
}