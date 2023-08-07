const { mongoose } = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enums: ["ADMIN", "USER"] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
