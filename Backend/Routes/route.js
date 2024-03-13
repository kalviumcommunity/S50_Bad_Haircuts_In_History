const express = require('express');
const router = express.Router();
const { usermodel } = require("../Model/user");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const {cookie} = require('cookie');

// validation 

const userSchema = Joi.object({
  User_Name: Joi.string().min(3).max(30).required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().min(6).required(), 
});

router.post('/users', async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newUser = await usermodel.create(req.body);

    const { User_Name,Email,Password } = req.body;
    const token = jwt.sign({ User_Name,Email,Password}, "ghcshucgbehccbygehcvgy", { expiresIn: "10h" });
    console.log(token)

    res.status(201).json({token});
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await usermodel.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    next(error);
  }
});


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
