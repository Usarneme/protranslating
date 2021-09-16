const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema({
  id: String,
  name: String,
  email: String,
  phone: Number,
  providers: [String],
});

module.exports = Client = mongoose.model("Client", ClientSchema);
