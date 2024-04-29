const express = require('express');
const router = express.Router();
const { postmodel } = require("../Model/user");

// CREATE - POST request to create a new post
router.post('/posts', async (req, res, next) => {
  try {
    const newPost = await postmodel.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// READ - GET request to get all posts
router.get('/posts', async (req, res, next) => {
  try {
    const posts = await postmodel.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// READ - GET request to get a specific post by ID
router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await postmodel.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE - PUT request to update a post by ID
router.put('/posts/:id', async (req, res, next) => {
  try {
    const updatedPost = await postmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE - DELETE request to delete a post by ID
router.delete('/posts/:id', async (req, res, next) => {
  try {
    const deletedPost = await postmodel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
