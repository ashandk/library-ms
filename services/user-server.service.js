var User = require('../models/user-server.model.js');
// ---------------------------------------------------------------//
//                    EXPORT FUNCTIONS 
// ---------------------------------------------------------------//

exports.getAuthenticate = function (email) {
    return User.findOne({"email" : email}).lean().exec(function(err, user){
        if (user) {
            console.info(user)
            return {
                'success': true,
                'user' : user
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