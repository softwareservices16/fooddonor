const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const pickUpSchema = new Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "items",
    },
    mobile: String,
    name: String,
    pickUpDateTime: String,
  },
  { timestamps: true }
);

const pickup = mongoose.model("pickup", pickUpSchema);

module.exports = pickup;
