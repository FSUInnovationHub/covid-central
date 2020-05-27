var request = require('request');

const newsApiUrl = 'https://newsapi.org/v2/top-headlines?q=coronavirus&sortBy=datePublished&pageSize=100&language=en&apiKey=529598811e16401eab135acc171f35b8';

exports.handler = (event, context, callback) => {

  request(newsApiUrl, function(error, response, body) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  });
}