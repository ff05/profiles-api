const mongoose = require('../config/database')
const { Schema } = mongoose

const profileSchema = new Schema({
  name: String,
  title: String,
  birthDate: Date,
  bio: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Profile', profileSchema)