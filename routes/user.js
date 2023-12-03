const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create a new user
router.post('/', async (req, res) => {
    try {
      const {
        id,
        password,
        role,
        name,
        department,
        major,
        progYear,
        dateFrom,
        dateTo,
        email,
        phoneNo,
        emergencyPhoneNo,
      } = req.body;
  
      // Validate required fields
      if (!id || !password || !role) {
        return res.status(400).json({ error: 'id, password, and role are required' });
      }
  
      const user = new User({
        id,
        password,
        role,
        name,
        department,
        major,
        progYear,
        dateFrom,
        dateTo,
        email,
        phoneNo,
        emergencyPhoneNo,
      });
  
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get all users
  router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a specific user by ID
  router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a user by ID
  router.patch('/:id', async (req, res) => {
    try {
      const { id, password, role, name, department, major, progYear, dateFrom, dateTo, email, phoneNo, emergencyPhoneNo } =
        req.body;
  
      // Validate required fields
      if (!id || !password || !role) {
        return res.status(400).json({ error: 'id, password, and role are required' });
      }
  
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          id,
          password,
          role,
          name,
          department,
          major,
          progYear,
          dateFrom,
          dateTo,
          email,
          phoneNo,
          emergencyPhoneNo,
        },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete a user by ID
  router.delete('/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;