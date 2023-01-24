const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },

  filename: function (req, file, cb) {
    cb(null, "profile" + "-" + Date.now() + path.extname(file.originalname));
  },
});
//

module.exports = {
  upload_profile: multer({ storage: storage }),
};
