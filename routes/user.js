const express = require("express");
const {
  createuser,
  loginuser,
  logOutuser,
  userProfile,
} = require("../controllers/user");
const { Authorized } = require("../services/Autorized");
const router = express.Router();

router.post("/create", createuser);
router.post("/login", loginuser);
router.get("/logout", logOutuser);
router.get("/profile", userProfile);

module.exports = router;
