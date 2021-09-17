const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ProTranslating Take Home Test (MEVN Stack REST API)",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Tom/Usarneme",
        url: "https://github.com/Usarneme",
      },
    },
    servers: [
      {
        url: "http://localhost:1337/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(swaggerOptions);
const clientRoutes = require("./routes/clients");
const providerRoutes = require("./routes/providers");

const app = express();
app.use(morgan("tiny"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/clients", clientRoutes);
app.use("/providers", providerRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
const port = 1337;

const mongoose = require("mongoose");
const Client = require("./models/Client");
const Provider = require("./models/Provider");
mongoose.connect("mongodb://localhost/protranslating");

app.listen(port, () => {
  console.log(`Express app now running on http://localhost:${port}`);
});
