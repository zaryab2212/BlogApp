const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  EditPost,
} = require("../controllers/post");
const { Authorized } = require("../services/Autorized");
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = express.Router();

router.get("/", getAllPosts);
router.post("/create", Authorized, upload.single("file"), createPost);
router.get("/single-post/:id", getSinglePost);
router.put("/post-edit/:id", Authorized, upload.single("file"), EditPost);

module.exports = router;
