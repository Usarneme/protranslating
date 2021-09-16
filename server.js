const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 1337;
const mongoose = require("mongoose");
const Client = require("./models/client");
const Provider = require("./models/provider");
mongoose.connect("mongodb://localhost/protranslating");

app.get("/", (req, res) => {
  res.send("/ working...");
});

app.get("/clients", (req, res) => {
  return Client.find((err, response) => {
    if (err) res.status(500).send("unable to find any clients at this time");
    res.json(response);
  });
});

app.post("/clients", (req, res) => {
  console.log("posting to clients with req.body:", req.body);
  if (!req.body.name || !req.body.email || !req.body.phone)
    return res
      .status(400)
      .send(
        "Please include a name, email, and phone number for the new client."
      );
  const newClient = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    providers: [],
  });
  newClient.save((err, Client) => {
    if (err)
      return res
        .status(500)
        .send("Unable to create new client at this time. Please try again.");
    return res.status(200).json(Client);
  });
});

app.get("/providers", (req, res) => {
  return Provider.find((err, response) => {
    if (err) res.status(500).send("unable to find any providers at this time");
    res.json(response);
  });
});

app.listen(port, () => {
  console.log("Express app now running on http://localhost:", port);
});
