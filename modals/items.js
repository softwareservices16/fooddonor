const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const itemsSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    selectedOption: String,
    selectedOptionSubCat: String,
    title: String,
    desc: String,
    quantity: Number,
    expiryDate: Date,
    pickUpDateTime: String,
    address: String,
    noOfDaysAvailable: String,
    imageUrl: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Items = mongoose.model("Items", itemsSchema);
Items.collection.createIndex({ location: '2dsphere' });

module.exports = Items;
