const House = require('../models/houseModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.filterBooking = catchAsync(async (req, res, next) => {
  if (req.params.houseId) {
    req.docFilter = { house: req.params.houseId, owner: req.user.id };
  } else {
    req.docFilter = { user: req.user.id };
  }
  next();
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { houseId, price, paymentMethod, currency } = req.body;
  const user = req.user.id;
  if (!houseId || !user || !price || !paymentMethod || !currency) {
    return next();
  }
  const booking = await Booking.create({ houseId, user, price, paymentMethod, currency });

  const house = House.findById(houseId);
  house.houseNos.forEach((houseNo) => {
    if (houseNo.booked === false) houseNo.booked = true;
  });
  await house.save();

  res.status(200).json({
    status: 'success',
    booking,
  });
});

exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
