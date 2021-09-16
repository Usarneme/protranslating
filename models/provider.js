const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProviderSchema = new Schema({
  id: String,
  name: String,
});

module.exports = Provider = mongoose.model("Provider", ProviderSchema);
