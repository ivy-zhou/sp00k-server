//content of api/app.js
const express = require('express')
const bodyParser = require('body-parser');
// const multer = require('multer')
const clarifay = require('./clarifay')

// const upload = multer({ storage })
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', function (req, res) {
  var urls = req.body.urls;
  console.log(urls);

  const message = { "data": [] }
  urls.forEach(imageUrl => {
      // predict the contents of an image by passing in base 64 encoded file
      clarifay
        .analyse(imageUrl)
        .then(
        response => {
          if(response.status.description == "Ok") {
            var curData = false;
            // Should only have 1 output
            var concepts = response.outputs[0].data.concepts;
            var scaryVal = -1;
            var notScaryVal = -1;
            concepts.forEach(concept => {
                if(concept["name"] == "sfw") {
                  notScaryVal = concept["value"];
                } else if (concept["name"] == "nsfw") {
                  scaryVal = concept["value"];
                }
            });
          }

          // scaryVal takes precedence
          if(scaryVal > 0.8) {
            curData = true;
          } else if (scaryVal == -1 && notScaryVal < 0.15) {
            curData = true;
          }

          message.data.push(curData);

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
