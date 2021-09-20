const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  providers: {
    type: Schema.Types.ObjectId,
    ref: "Provider",
  },
});

module.exports = Client = mongoose.model("Client", ClientSchema);
