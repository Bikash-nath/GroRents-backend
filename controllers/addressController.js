const Address = require('./../models/addressModel');
const catchAsync = require('./../utils/catchAsync');

exports.setAddressUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.address) req.body.address = req.params.addressId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllAddresss = catchAsync(async (req, res, next) => {
  const addresss = await Address.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: addresss.length,
    data: {
      addresss,
    },
  });
});

exports.getAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findById(req.params.id);

  if (!address) return next(new AppError('No address found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      address,
    },
  });
});

exports.createAddress = catchAsync(async (req, res, next) => {
  const newAddress = await Address.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      address: newAddress,
    },
  });
});

exports.updateAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!address) return next(new AppError('No address found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      address,
    },
  });
});

exports.deleteAddress = catchAsync(async (req, res, next) => {
  const address = await Address.findByIdAndDelete(req.params.id);

  if (!address) return next(new AppError('No address found with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
