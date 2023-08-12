const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const pickUpSchema = new Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Items",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mobile: String,
    name: String,
    email: String,
    pickUpDateTime: String,
    status: {
      type: String,
      enums: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

const pickup = mongoose.model("pickup", pickUpSchema);

module.exports = pickup;
