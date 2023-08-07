const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const app = express();

cloudinary.config({
  cloud_name: "dd5xmivy4",
  api_key: "923637261966858",
  api_secret: "B87zT2dZDud_c86vcfGXMempTQM",
  secure: true,
});

// Create a multer storage object for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Route to handle image upload
app.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }
  const imageUrl = req.file.path;
  res.status(200).send({ imageUrl: imageUrl });
});

module.exports = app;
