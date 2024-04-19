// backend/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  photo: String,
  description: String,
  address: String,
  coordinates: { type: String, default: null } 
});

module.exports = mongoose.model('Profile', profileSchema);
