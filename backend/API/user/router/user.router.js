// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const multer = require("multer");

// ========== SETUP MULTER STORAGE ========== //
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },

  filename: (req, file, cb) => {
    const fileSuffix = Date.now();
    cb(null, fileSuffix + "-" + file.originalname);
  },
});

// ========== CHECK FILE TYPE BEFORE UPLOADING ========== //
const checkFileType = (file, cb) => {
  // Allowed file extensions
  const allowedFileTypes = /jpeg|jpg|png|svg/;
  // Check the file extension
  const extname = allowedFileTypes.test(file.originalname.toLowerCase());
  // Check the mime type
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Error: Images Only! (jpeg, jpg, png, gif)"));
  }
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit (optional)
  },
});

// ========== ROUTES ========== //
router.post(
  "/create-user",
  upload.single("userImage"),
  UserController.createUser
);
router.post(
  "/update-user/:id",
  upload.single("userImage"),
  UserController.updateUser
);
router.post("/get-user-details/:id", UserController.getUserDetails);
router.post("/get-all-users", UserController.getAllUserDetails);
router.post("/update-user-status/:id", UserController.updateUserStatus);
router.post("/delete-user/:id", UserController.deleteUser);

// ========== EXPORT ========== //
module.exports = router;
