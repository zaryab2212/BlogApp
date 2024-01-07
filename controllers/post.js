const fs = require("fs");
const Post = require("../models/post");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    const { title, summary, content } = req.body;

    const newPost = await Post.create({
      title,
      summary,
      content,
      file: newPath,
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
      .sort({ createdAt: -1 });
    // if (!posts) {
    //   return res.status(400).json({
    //     success: false,

    //     message: "their in no post avaiable",
    //   });
    // }

    res.status(200).json({
      success: true,
      posts,
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

    // if (!posts) {
    //   return res.status(400).json({
    //     success: false,

    //     message: "their in no post avaiable",
    //   });
    // }

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
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { id } = req.params;

  const { title, summary, content } = req.body;
  try {
    const post = await Post.findById(id);

    const updated = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        summary,
        content,
        file: newPath,
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
