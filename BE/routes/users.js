const User = require('../models/users');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // If the username & email do not exist, create a new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error getting user', error });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user data
    user.name = name;
    user.username = username;
    user.email = email;
    user.password = hashedPassword;

    // Save the updated user
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

module.exports = router;
