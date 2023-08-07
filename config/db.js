const mongoose = require("mongoose");
const uri =
  "mongodb+srv://softwareservices16:1JeYXz4ob0yAnlBD@cluster0.mhipx5u.mongodb.net/food_doner?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to the database", err);
});


db.once("open", () => {
  console.log("Connected to the database");
});

module.exports = db;
