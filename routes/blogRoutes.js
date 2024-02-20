const express = require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlog, getUserBlogs } = require('../controller/blogController');

//router object
const router = express.Router();

//all blogs
router.get('/all-blogs', getAllBlogs);

//create blog
router.post('/create', createBlog);

//update blog
router.put('/update/:id', updateBlog);

//delete blog
router.delete('/delete/:id', deleteBlog);

//get blog
router.get('/blog/:id', getBlog);

//getUserBlogs
router.get('/user-blogs/:id', getUserBlogs);

module.exports = router;