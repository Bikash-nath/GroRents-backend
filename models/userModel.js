const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  phoneNo: {
    type: String,
    minlength: [10, 'Please provide a valid 10-digit phone number'],
    maxlength: [10, 'Please provide a valid 10-digit phone number'],
  },
  photo: { type: String, default: 'user-avatar.jpg' },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Transgender'],
  },
  dob: {
    type: Date,
    validate: {
      validator: (date) => {
        return date <= new Date(new Date().setFullYear(new Date().getFullYear() - 10));
      },
      message: 'Your Age should be greater than 10 years',
    },
  },
  address: {
    type: mongoose.Schema.ObjectId,
    ref: 'Address',
  },
  occupation: String,
  role: {
    type: String,
    enum: ['user', 'owner', 'guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  deleted: {
    type: Boolean,
    default: false,
  },
  devices: [
    {
      name: String,
      ipAddress: String,
      lastLoggedIn: Date,
      active: {
        type: Boolean,
        default: true,
      },
      select: false,
    },
  ],
});

// Virtual populate - parent to child reference
userSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'user', //in Review modal
  localField: '_id',
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'address',
    select: 'city state',
  });
  next();
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000; //saving user in Db before issuing JWT
  next();
});

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    // True if password was changed after JWT was issued
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  //Encrypted version of resetToken (save in DB)
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  // console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
