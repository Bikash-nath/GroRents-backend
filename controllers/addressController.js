const Address = require('../models/addressModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.restrictUserAddress = catchAsync(async (req, res, next) => {
  const userRole = req.user.role;
  req.filter = { [userRole]: req.user.id };
  next();
});

// Nested address routes
exports.setAddressUserIds = (req, res, next) => {
  //set address id from query if not specified in body
  if (!req.body.address) req.body.address = req.params.addressId;
  if (!req.body.user) req.body.user = req.user.id; //from Protect middleware
  next();
};

exports.getAllAddresss = factory.getAll(Address);
exports.getAddress = factory.getOne(Address, { path: 'reviews' });
exports.createAddress = factory.createOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);
