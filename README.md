# sp00k-server
Node server using Clarifai to filter out sp00ky images.

**URL**

[https://sp00k-server.herokuapp.com/api](https://sp00k-server.herokuapp.com/api)

**Method:**

  `POST`

 **Data Params**

  Requires an `urls` array containing URLs of photos to be evaluated for spookiness.
  URLs should be public.

  Requires a `spooks` array containing concepts to filter out.

  ```
    {
      {
        "spooks": ["dog"],
	      "urls": ["https://samples.clarifai.com/dog1.jpeg", "https://samples.clarifai.com/dog2.jpeg]
      }
    }
  ```

  TODO: Support sending image as base64 data.

**Response:**

  Returns a `data` array of objects containing the URL and whether or not it is scary.

  **Code:** 200

  **Content:**
  ```
    {
      "data": [
        {
            "url": "https://samples.clarifai.com/dog1.jpeg",
            "scary": true
        },
        {
            "url": "https://developer.clarifai.com/static/images/model-samples/nsfw-002.jpg",
            "scary": false
        }
      ]
    }
  ```
