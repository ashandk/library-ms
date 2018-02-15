var user_service = require('../services/user-server.service.js');
var jwt    = require('jsonwebtoken');
var config = require('config');
// ---------------------------------------------------------------//
//                    EXPORT FUNCTIONS 
// ---------------------------------------------------------------//

//getauthanticate
exports.getAuthenticate = function (req, res) {
    var promise = user_service.getAuthenticate(req.body.email);

    promise.then(function (response) {
        if (response) {
          var token = jwt.sign(response, config.get('global.jwt.secret'), {
              expiresIn: 1440 // expires in 1 hour
          });
        res.status(201) // success
          .send({ 'token' : token});
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