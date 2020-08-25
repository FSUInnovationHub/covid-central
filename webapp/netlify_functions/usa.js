var request = require('request');

const apiUrl = 'https://api.covidtracking.com/v1/us/daily.json';

exports.handler = (event, context, callback) => {

  request(apiUrl, function(error, response, body) {
    callback(null, {
      statusCode: 200,
      body: body
    });
  });
}