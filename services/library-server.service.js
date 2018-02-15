var Library = require('../models/library-server.model.js');
// ---------------------------------------------------------------//
//                    EXPORT FUNCTIONS 
// ---------------------------------------------------------------//

exports.getAllBooks = function () {
    return Library.find({}).sort({ 'bookName': 1 }).then(function (books) {
        if (books) {
            console.info(books.length);
            return {
                'success': true,
                'books': books
            };
        }else{
            return {
                'success': false
            };
        }
    }, function (error) {
        console.log(error);
        return {
            'success': false
          
        };
    });

};

exports.addBook = function (bookInfo) {
    var book = Library(bookInfo);

    return book.save().then(function (result) {
        return Library.find({}).sort({ 'bookName': 1 }).then(function (books) {
            if (books) {
                console.info(books.length);
                return {
                    'success': true,
                    'books': books
                };
            }else{
                return {
                    'success': false

                };
            }
        }, function (error) {
            console.log(error);
            return {
                'success': false

            };
        });


    }, function (error) {
        console.log(error);
        return {
            'success': false
        };
    });

};


//schedule this
exports.deleteBook = function (bookId) {
    return Library.remove({ 'bookId': bookId }).then(function (result) {
        return Library.find({}).sort({ 'bookName': 1 }).then(function (books) {
            if (books) {
                console.info(books.length);
                return {
                    'success': true,
                    'books': books
                };
            }else{
                return {
                    'success': false

                };
            }
        }, function (error) {
            console.log(error);
            return {
                'success': false

            };
        });

    }, function (error) {
        var errorCode = "Can't find book" + error;
        console.log(errorCode);
        return {
            'success': false,
            'error' : errorCode
        };

    });
};