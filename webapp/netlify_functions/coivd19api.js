
var request = require('request');

const apiUrl = 'https://api.covid19api.com/summary';

exports.handler = (event, context, callback) => {

  request(apiUrl, function(error, response, body) {
    callback(null, {
      statusCode: 200,
      body: body
    });
  });
}