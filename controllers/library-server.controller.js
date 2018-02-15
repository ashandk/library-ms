var library_service = require('../services/library-server.service.js');

// ---------------------------------------------------------------//
//                    EXPORT FUNCTIONS 
// ---------------------------------------------------------------//

//getAllBooks
exports.getAllBooks = function (req, res) {
    var promise = library_service.getAllBooks();
    promise.then(function (response) {
      if (response.success == true) {
        res.status(201) // success
          .send(response.books);
      }
      if (response.success == false) {
        res.status(201) // success
          .send({
            'success': false,
            'reason': "Failed to read books list"
          });
      }
    }, function (error) {
      if (error) {
        res.status(400) // failure
          .send({
            'success': false,
            'reasonCode': "service not found"
          });
      }
    });
}

module.exports.insertBook = function addBook(req, res, next) {
    var requestMessage = req.body;

    if (!requestMessage) {
        //error code
        var errorCode = "The request body was incomplete or incorrect.";
        res.status(401) // failure
                .send({
                  'success': false,
                  'reasonCode': errorCode
        });
        return;
    }

    var updatedPromise = library_service.addBook(requestMessage)
        .then(function (response) {
            if (response.success == true) {
              res.status(200) // success
                .send(response.books);
            }
            else if (response.success == false) {
                res.status(201) // success
                  .send({
                    'success': false,
                    'reason': "Failed to read books list"
                  });
              }
          }, function (error) {
            if (error) {
              res.status(400) // failure
                .send({
                  'success': false,
                  'reasonCode': "service not found"
                });
            }
          });
}


exports.deleteBook = function (req, res) {
    if (!req.params.bookId) {
        //error code
        var errorCode = "Cannot find bookId in the request.";
        res.status(401) // failure
                .send({
                  'success': false,
                  'reasonCode': errorCode
        });
        return;
    }

    var updatedPromise = library_service.deleteBook(req.params.bookId)
        .then(function (response) {
            if (response.success == true) {
              res.status(200) // success
                .send(response.books);
            }
            else if (response.success == false) {
                res.status(201) // success
                  .send({
                    'success': false,
                    'reason': "Failed to delete book"
                  });
              }
          }, function (error) {
            if (error) {
              res.status(400) // failure
                .send({
                  'success': false,
                  'reasonCode': "service not found"
                });
            }
          });
}