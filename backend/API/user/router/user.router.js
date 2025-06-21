// ========== IMPORT STATEMENTS ========== //
const express = require("express");
const router = express.Router();
const UserController = require("../controller/user.controller");

// ========== ROUTES ========== //
router.post("/createUser", UserController.createUser);

// ========== EXPORT ========== //
module.exports = router;
