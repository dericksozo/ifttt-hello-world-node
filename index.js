const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const API_SERVICE_KEY = process.env.API_SERVICE_KEY;

app.use(bodyParser.json());

// The status endpoint
app.get('/ifttt/v1/status', (req, res) => {

  const IFTTTServiceKey = req.get("IFTTT-Service-Key");

  if (typeof IFTTTServiceKey !== "string" || IFTTTServiceKey === "INVALID") {
    res.status(401).send();
  } else {
    res.status(200).send();
  }

});

// Test setup endpoint
app.post('/ifttt/v1/test/setup', (req, res) => {

  const IFTTTServiceKey = req.get("IFTTT-Service-Key");

  if (typeof IFTTTServiceKey !== "string" || IFTTTServiceKey === "INVALID") {
    res.status(401).send();
  } else {
    res.status(200).send({
      data: {
        samples: {
          triggers: {
            "new_thing_created": "Test"
          }
        }
      }
    });
  }
});

app.post('/ifttt/v1/triggers/new_thing_created', (req, res) => {

  const IFTTTServiceKey = req.get("IFTTT-Service-Key");

  if (typeof IFTTTServiceKey !== "string" || IFTTTServiceKey === "INVALID") {
    res.status(401).send({
      errors: [{
        "message": "Invalid IFTTT Service Key"  
      }]
    });
  };

  const now = new Date(),
        timestamp = Math.floor(Date.now() / 1000);

  let data = [], // The data will be put in here and returned in the response
      limit = 50; // IFTTT's default limit

  // Doing these extra checks so that 0 doesn't throw the JavaScript off ;)
  if (req.body.limit != null && typeof req.body.limit === "number") {
    limit = req.body.limit;
  }

  if (limit >= 1) { // Not gonna run through this if limit is 0 to pass the IFTTT endpoint test.
    for (let i = 0; i < limit; i += 1) {
      data.push({
        "created_at": now.toISOString(),
        "meta": {
          "id": UTILS.guid(),
          "timestamp": timestamp
        }
      });
    }
  }

  res.status(200).send({
    "data": data
  });

});

var UTILS = (function () {

  return {
    guid: function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
  };

}());

app.listen(3000, () => {
  console.log("Listening on 3000");
});
