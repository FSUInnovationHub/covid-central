var request = require('request');

const apiUrl = 'https://covidtracking.com/api/v1/states/daily.json';

exports.handler = (event, context, callback) => {

  request(apiUrl, function(error, response, body) {
    callback(null, {
      statusCode: 200,
      body: body
    });
  });
}