var request = require('request');

const apiUrl = 'https://covidtracking.com/api/v1/states/current.json';

exports.handler = (event, context, callback) => {

  request(apiUrl, function(error, response, body) {
    callback(null, {
      statusCode: 200,
      body: body
    });
  });
}