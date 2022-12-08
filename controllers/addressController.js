const Address = require('../models/addressModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// exports.getAllAddresss = factory.getAll(Address);
exports.getAddress = factory.getOne(Address);
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);

exports.createAddress = catchAsync(async (req, res, next) => {
  const address = await Address.create(req.body);
  req.body.address = address;
  next(); //nested route
});
