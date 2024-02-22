const express = require('express');
const router = express.Router();
const { usermodel } = require("../Model/user");


// CREATE - POST request to create a new user
router.post('/users', async (req, res, next) => {
  try {
    const newUser = await usermodel.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// READ - GET request to get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await usermodel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// READ - GET request to get a specific user by ID
router.get('/users/:id', async (req, res, next) => {
  try {
    const user = await usermodel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// UPDATE - PUT request to update a user by ID
router.put('/users/:id', async (req, res, next) => {
  try {
    const updatedUser = await usermodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// DELETE - DELETE request to delete a user by ID
router.delete('/users/:id', async (req, res, next) => {
  try {
    const deletedUser = await usermodel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;