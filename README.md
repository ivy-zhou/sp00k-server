# sp00k-server
Node server using Clarifai to filter out sp00ky images.

**URL**

[https://sp00k-server.herokuapp.com/api](https://sp00k-server.herokuapp.com/api)

**Method:**

  `POST`

 **Data Params**

  Requires an `urls` array containing URLs of photos to be evaluated for spookiness.
  URLs should be public.

  ```
    {
      {
	       "urls": ["https://samples.clarifai.com/dog1.jpeg", "https://samples.clarifai.com/dog2.jpeg]
      }
    }
  ```

  TODO: Support sending image as base64 data.

**Response:**

  Returns the requested list of urls back along with a data array of true/false values determining
  whether the respective images are spooky.

  **Code:** 200

  **Content:**
  ```
    {
      "urls": ["https://samples.clarifai.com/dog1.jpeg", "https://samples.clarifai.com/dog2.jpeg],
      "result": [false, false]
    }
  ```
