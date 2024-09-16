const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "cv") {
    // Accept pdf only for CV
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed for CV!"), false);
    }
  } else if (file.fieldname === "video") {
    // Accept mp4 only for video
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      cb(new Error("Only MP4 files are allowed for video!"), false);
    }
  } else {
    cb(new Error("Unexpected field"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 50 }, // 50MB limit
});

module.exports = upload;