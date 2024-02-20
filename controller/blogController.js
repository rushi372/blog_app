//blog callbacks controllers

const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//create Blog
exports.createBlog = async (req, res) => {
  try {
    //destructure
    const { title, description, image, user } = req.body;

    //validations
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please fill all the fields",
      });
    }

    //create user
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //create blog
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(201).send({
      success: true,
      message: "Blog added",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in createBlog controller",
      error,
    });
  }
};

//get all Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");

    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "got the blogs",
      BlogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in getAllBlogs controller",
      error,
    });
  }
};

//update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const updateBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "id not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "blog is updated",
      updateBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in updateBlog controller",
      error,
    });
  }
};

//delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user");
    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();
    if (!deleteBlog) {
      return res.status(404).send({
        success: false,
        message: "ID Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "blog has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in deleteBlog controller",
      error,
    });
  }
};

//get Blog
exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const Blog = await blogModel.findById(id, { ...req.body });
    if (!Blog) {
      return res.status(404).send({
        success: false,
        message: "ID Not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "got the blog",
      Blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in getBlog controller",
      error,
    });
  }
};

exports.getUserBlogs = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("blogs");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user/blogs not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "got the blogs for the requested user",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: "error in getUserBlogs controller",
      error,
    });
  }
};
