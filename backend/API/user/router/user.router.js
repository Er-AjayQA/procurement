// ========== REQUIRE STATEMENTS ========== //
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

// ********************* USER LOGICS ROUTES ********************* //
router.post(
  "/create-user",
  upload.single("userImage"),
  UserController.createUser
);
router.put(
  "/update-user/:id",
  upload.single("userImage"),
  UserController.updateUser
);
router.get("/get-user-details/:id", UserController.getUserDetails);
router.post("/get-all-users", UserController.getAllUserDetails);
router.put("/update-user-status/:id", UserController.updateUserStatus);
router.put("/delete-user/:id", UserController.deleteUser);

// ********************* USER LOGIN LOGICS ROUTES ********************* //
router.post("/user-login", upload.none(), UserController.userLogin);
router.post("/send-otp", upload.none(), UserController.sendOTP);
router.post("/verify-otp", upload.none(), UserController.verifyOTP);
router.post("/reset-password", upload.none(), UserController.resetPassword);

// ========== EXPORT ========== //
module.exports = router;
