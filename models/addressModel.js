const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  houseNo: String,
  street: String,
  area: String, //P.O.
  pincode: {
    type: String,
    minlength: 6,
    maxlength: 6,
  },
  city: String,
  district: String,
  state: {
    type: String,
    maxlength: 20,
  },
  country: {
    type: String,
    default: 'India',
  },
});

const Address = mongoose.model('Address', addressSchema);
module.exports = Address;
