var express = require("express");
const User = require("../modals/users");
const Items = require("../modals/items");
const mongoose = require("mongoose");
const uploadImage = require("../config/uploadImage");
const ObjectId = mongoose.Types.ObjectId;
var app = express();

/* GET home page. */
app.post("/login", async function (req, res, next) {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  res.send({ success: user ? true : false, data: user });
});

app.post("/addItemDoner", uploadImage, async function (req, res) {
  if (req?.body?.user && JSON.parse(req?.body?.user)?.success) {
    var userData = JSON.parse(req?.body?.user)?.data;
    req.body.location = { coordinates: JSON.parse(req?.body?.location) };
    const data = await Items.create({ ...req.body, user: userData?._id });
    return res.send({ success: true, data });
  }

  return res.status(500).send({ success: false });
});

app.use("/uploadImage", uploadImage);

app.get("/donor/getItemsDonated/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    var data = await Items.find({
      user: new ObjectId(userId),
      quantity: { $gt: 0 },
      expiryDate: { $gte: Date.now() },
    }).sort({
      createdAt: -1,
    });

    res.send({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false });
  }
});

app.delete("/deleteItem/:itemId", async (req, res) => {
  const data = await Items.deleteOne(new ObjectId(req.params.itemId));
  if (data) {
    res.send({ success: true, data });
  } else {
    res.status(500).send({ status: false });
  }
});

module.exports = app;
