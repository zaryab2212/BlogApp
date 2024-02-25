const express = require("express");
const {
  createuser,
  loginuser,
  logOutuser,
  userProfile,
  activeUser,
} = require("../controllers/user");
const { Authorized } = require("../services/Autorized");
const router = express.Router();

router.post("/create", createuser);
router.post("/login", loginuser);
router.get("/logout", logOutuser);
router.get("/profile", userProfile);
router.get("/active-user", Authorized, activeUser);

module.exports = router;
