// content of api/clarifay.js
var Clarifai = require('clarifai');

// extends the Clarifai.App
class ImageProcessing extends Clarifai.App {
    analyse(urlString) {
        console.log("predicting from clarifay " + process.env.CLARIFAI_KEY);
        return this.models.predict("aaa03c23b3724a16a56b629203edc62c", urlString);
    }
}

// instantiate a new Clarifai app passing in your clientId and clientSecret
module.exports = new ImageProcessing({
  apiKey: process.env.CLARIFAI_KEY
})
