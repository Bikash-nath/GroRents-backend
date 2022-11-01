const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  house: {
    type: mongoose.Schema.ObjectId,
    ref: 'House',
    required: [true, 'Booking must belong to a House!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a purchase price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
  paymentMethod: {
    type: String,
    default: 'UPI',
  },
  currency: {
    type: String,
    default: 'INR',
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'house',
    select: 'title address',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
