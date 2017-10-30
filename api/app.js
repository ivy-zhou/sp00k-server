const express = require('express')
const bodyParser = require('body-parser');
const clarifay = require('./clarifay')

const THRESHOLD = 0.95;

const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', function (req, res) {
  var urls = req.body.urls;
  var spooks = req.body.spooks;

  spooks = spooks == null ?
    [] : spooks.map(function(spook) { return spook.toLowerCase() });

  console.log("filtering \"" + urls + "\" for \"" + spooks + "\"");

  const message = {
    data: []
  }

  if(urls == null || urls.length == 0) {
    res.status(200).send(message);
  }

  urls.forEach(imageUrl => {
      clarifay
        .analyse(imageUrl)
        .then(
        response => {
          if(response.status.code == 10000) {
            var isScary = false;
            // Should only have 1 output
            var concepts = response.outputs[0].data.concepts;
            concepts.forEach(concept => {
                // TODO: Implement NLP integration to filter similar words
                if(spooks.indexOf(concept["name"]) != -1
                  && concept["value"] > THRESHOLD) {
                    isScary = true;
                }
            });
          }

          message.data.push({
            url: response.outputs[0].input.data.image.url,
            scary: isScary
          });

          if(message.data.length == urls.length) {
            res.status(200).send(message);
          }
        },
        err => console.error(err)
        );
  });
});

// get the tags from the Clarifay API
const serialize = (array) => {
  let subjects = [];
  array.forEach(function (element) {
    subjects.push(element.name)
  });
  // get only the best of 3 results
  return subjects.slice(0, 3)
}

module.exports = app
