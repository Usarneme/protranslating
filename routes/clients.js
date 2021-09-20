/**
 * @swagger
 *  /clients:
 *    get:
 *      description: Get all Clients
 *      responses:
 *        201:
 *          description: Returns an array of all Clients
 *        500:
 *          description: There were no Clients found or the process was unable to be completed at this time
 *    post:
 *      description: Post to create a new Client
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: The Client's ID.
 *                  example: 6142d18969edc897f5018121
 *                name:
 *                  type: string
 *                  description: The Client's name.
 *                  example: Alice
 *                email:
 *                  type: string
 *                  description: The Client's email.
 *                  example: alice@email.net
 *                phone:
 *                  type: string
 *                  description: The Client's phone number.
 *                  example: 123-555-1212
 *                providers:
 *                  type: array
 *                  description: The Client's Provider(s) listed by Provider ID.
 *                  example: [
 *                    { "id": 1 }
 *                  ]
 *      responses:
 *        201:
 *          description: Returns the newly-created Client that was saved to the MongoDB
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  data:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                        description: The new Client's name
 *                        example: Client 3
 *                      id:
 *                        type: number
 *                        description: The new Client's ID
 *                        example: Client 3
 *        400:
 *          description: The request was missing information, likely a name for the new Client
 *        500:
 *          description: Creating and saving a new Client was unable to be completed at this time
 */
const express = require("express");
const swaggerJSDoc = require("swagger-jsdoc");
const router = express.Router();

router.get("/", (req, res) => {
  return Client.find((err, response) => {
    if (err)
      return res.status(500).send("unable to find any clients at this time");
    return res.status(201).json(response);
  });
});

router.post("/", (req, res) => {
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
    return res.status(201).json(Client);
  });
});

module.exports = router;
