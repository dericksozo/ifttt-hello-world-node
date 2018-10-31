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

app.listen(3000, () => {
  console.log("Listening on 3000");
});
