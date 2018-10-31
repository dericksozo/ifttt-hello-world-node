const express = require('express');
const app = express();

// The status endpoint
app.get('/ifttt/v1/status', (req, res) => {
  res.status(200).send();
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
