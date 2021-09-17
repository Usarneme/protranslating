/**
 * @swagger
 *  /providers:
 *    get:
 *      description: Get all Providers
 *      responses:
 *        201:
 *          description: Returns an array of all Providers
 *        500:
 *          description: There were no Providers found or the process was unable to be completed at this time
 *    post:
 *      description: Post to create a new Provider
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The Provider's name.
 *                  example: Provider 1
 *      responses:
 *        201:
 *          description: Returns the newly-created Provider that was saved to the MongoDB
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
 *                        description: The new Provider's name
 *                        example: Provider 3
 *                      id:
 *                        type: number
 *                        description: The new Provider's ID
 *                        example: Provider 3
 *        400:
 *          description: The request was missing information, likely a name for the new Provider
 *        500:
 *          description: Creating and saving a new Provider was unable to be completed at this time
 */
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  return Provider.find((err, response) => {
    if (err)
      return res.status(500).send("unable to find any providers at this time");
    return res.status(201).json(response);
  });
});

router.post("/", (req, res) => {
  console.log("posting to providers with req.body:", req.body);
  if (!req.body.name)
    return res.status(400).send("Please include a name for the new provider.");
  const newProvider = new Provider({
    name: req.body.name,
  });
  newProvider.save((err, Provider) => {
    if (err)
      return res
        .status(500)
        .send("Unable to create new provider at this time. Please try again.");
    return res.status(201).json(Provider);
  });
});

module.exports = router;
