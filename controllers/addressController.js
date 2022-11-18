const Address = require('../models/addressModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.restrictUserOrHouseAddress = catchAsync(async (req, res, next) => {
  //Filter not functional -> house/user field is not present
  //Use Nested Routes insted
  if (req.params.houseId) {
    // req.docFilter = { [req.user.role]: req.user.id };
  }
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
exports.updateAddress = factory.updateOne(Address);
exports.deleteAddress = factory.deleteOne(Address);

exports.createAddress = catchAsync(async (req, res, next) => {
  req.body.address = await Address.create(req.body);
  return next();
});
