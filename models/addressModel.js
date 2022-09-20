const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  houseNo: String,
  street: String,
  city: String,
  pincode: {
    type: Number,
    maxlength: 6,
  },
  state: {
    type: String,
    maxlength: 20,
    enum: ['Assam', 'Tripura', 'West Bengal'],
  },
  country: {
    type: String,
    default: 'India',
  },
});

const Address = mongoose.model('address', addressSchema);

module.exports = Address;
