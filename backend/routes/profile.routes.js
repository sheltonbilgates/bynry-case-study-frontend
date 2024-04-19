// backend/routes/profiles.js
const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// GET all profiles
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, 'i') };
    }
    if (req.query.address) {
      query.address = { $regex: new RegExp(req.query.address, 'i') };
    }
    const profiles = await Profile.find(query);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new profile
router.post('/', async (req, res) => {
  const profile = new Profile(req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update a profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a profile
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Profile.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
