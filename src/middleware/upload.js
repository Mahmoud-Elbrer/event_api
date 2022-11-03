const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb://localhost/eventDB",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "agarPhotos",
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

//var uploadFiles = multer({ storage: storage }).array("images", 8);
 var uploadFiles = multer({ storage: storage }).single("images");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
