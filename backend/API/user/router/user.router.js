// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");
const multer = require("multer");

// ========== ROUTES ========== //
router.post("/createUser", UserController.createUser);

// ========== EXPORT ========== //
module.exports = router;
