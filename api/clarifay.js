require('dotenv').config();

// content of api/clarifay.js
var Clarifai = require('clarifai');

// extends the Clarifai.App
class ImageProcessing extends Clarifai.App {
    analyse(urlString) {
        console.log("predicting from clarifay " + process.env.API_KEY);
        return this.models.predict("e9576d86d2004ed1a38ba0cf39ecb4b1", urlString);
    }
}

// instantiate a new Clarifai app passing in your clientId and clientSecret
module.exports = new ImageProcessing({
  apiKey: process.env.API_KEY
})
