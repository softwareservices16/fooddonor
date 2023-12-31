var express = require("express");
const User = require("../modals/users");
const Items = require("../modals/items");
const { ObjectId } = require("mongodb");
const pickup = require("../modals/pickup");
var app = express();

app.post("/signup", async function (req, res, next) {
  const userExists = await User.findOne({
    email: req.body.email,
    role: "USER",
  });
  if (userExists) {
    return res
      .status(500)
      .send({ success: false, message: "User already exists." });
  } else {
    const data = await User.create({ ...req.body, role: "USER" });
    return res.send({ success: data ? true : false, data });
  }
});

app.get("/getItemsDonated/:id", async (req, res) => {
  try {
    // const userId = req.params.id;
    const { latitude, longitude } = req?.query;
    const radiusKm = 100;

    const data = await Items.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          distanceField: "distance",
          includeLocs: "dist.location",
          spherical: true,
          // maxDistance: radiusKm * 1000,
          distanceMultiplier: 0.001,
        },
      },
      {
        $match: {
          quantity: { $gt: 0 },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.send({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).send({ status: false });
  }
});

app.post("/pickup/:itemId", async (req, res) => {
  const itemId = req.params.itemId;
  const data = await Items.findOne(new ObjectId(itemId));
  if (data?.quantity > 0) {
    await pickup.create({ ...req.body, item: itemId });
    res.send({ success: true, data });
  } else {
    res.status(500).send({ success: false });
  }
});

app.get("/getItemsPicked/:userId", async (req, res) => {
  const userId = req.params.userId;
  let data = await pickup.find({ userId: userId }).populate("item");
  res.send({ status: true, data })
});

module.exports = app;
