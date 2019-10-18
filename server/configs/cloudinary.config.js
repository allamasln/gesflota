const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');


cloudinary.config({

  cloud_name: process.env.API_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name',
  allowerFormats: ['jpg', 'png'],

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadCloud = multer({storage: storage})

module.exports = uploadCloud;
