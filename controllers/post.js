const fs = require("fs");
const Post = require("../models/Post");
const mongoose = require("mongoose");
const { ImgUploder } = require("../services/cloudinaryy");

exports.createPost = async (req, res) => {
  // const { originalname, path } = req.file;
  try {
    const result = await ImgUploder(req.file);
    if (!result) {
      return res
        .status(400)
        .json({ message: "error uploading image please try again" });
    }
    const { title, summary, content } = req.body;

    const newPost = await Post.create({
      title,
      summary,
      content,
      file: result.url,
      author: req.user,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      newPost,
      message: "Post created succesfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to Create the Post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["name"])
      .sort({ createdAt: -1 })
      .skip(6 * (req.query.page - 1))
      .limit(6);
    if (!posts) {
      return res.status(400).json({
        success: false,

        message: "their in no post avaiable",
      });
    }

    const totalDocument = await Post.countDocuments();

    res.status(200).json({
      success: true,
      posts,
      totalDocument,
      message: "Post found successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to fetch all the Post",
    });
  }
};
exports.getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author");

    if (!post) {
      return res.status(400).json({
        success: false,

        message: "their in no post avaiable",
      });
    }

    res.status(200).json({
      success: true,
      post,
      message: "Post found successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to fetch  the Post",
    });
  }
};
exports.EditPost = async (req, res) => {
  const { id } = req.params;
  const result = await ImgUploder(req.file);
  if (!result) {
    return res
      .status(400)
      .json({ message: "error uploading image please try again" });
  }

  const { title, summary, content } = req.body;
  try {
    const post = await Post.findById(id);

    const updated = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        summary,
        content,
        file: result.url,
        author: req.user,
      }
    );

    res.status(200).json({
      success: true,
      updated,
      message: "Post Updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
      message: "Unabel to update the post  the Post",
    });
  }
};
