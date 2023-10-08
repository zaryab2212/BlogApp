const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });

const express = require("express");
const {
  createPost,
  getAllPosts,
  getSinglePost,
  EditPost,
} = require("../controllers/post");
const { Authorized } = require("../services/Autorized");

const router = express.Router();

router.post("/create", Authorized, uploadMiddleware.single("file"), createPost);
router.get("/", Authorized, getAllPosts);
router.get("/single-post/:id", Authorized, getSinglePost);
router.put(
  "/post-edit/:id",
  Authorized,
  uploadMiddleware.single("file"),
  EditPost
);

module.exports = router;
