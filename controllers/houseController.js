const House = require('../models/houseModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

exports.getAllHouses = factory.getAll(House);
exports.getHouse = factory.getOne(House, { path: 'reviews' });
exports.createHouse = factory.createOne(House);
exports.updateHouse = factory.updateOne(House);
exports.deleteHouse = factory.deleteOne(House);

exports.getHouseAddress = catchAsync(async (req, res, next) => {
  const house = await House.findById(req.params.houseId);
  if (!house.address) {
    return next(new AppError('No address found', 404));
  }
  res.redirect(`/api/address/${house.address._id}`);
});

exports.saveHouseAddress = catchAsync(async (req, res, next) => {
  const house = await House.findById(req.params.id);
  const address = req.body.address;
  house.address = address._id;
  house.save();
  res.status(201).json({
    status: 'success',
    data: { address },
  });
});
