const express = require("express");
const app = express();
const port = 1337;

app.get("/clients", (req, res) => {
  res.send("C working...");
});

app.get("/providers", (req, res) => {
  res.send("P working...");
});

app.listen(port, () => {
  console.log("Express app now running on http://localhost:", port);
});
