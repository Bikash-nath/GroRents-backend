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
  // req.body.address = house.address._id;
  // console.log('address:--', req.body.address);

  // next();
  res.redirect(307, `/api/address/${house.address._id}`); //use if req.method is not changed to get (code: 200)
});

exports.saveHouseAddress = catchAsync(async (req, res, next) => {
  const address = req.body.address;
  const house = await House.findByIdAndUpdate(req.params.houseId, { address: address._id });

  res.status(201).json({
    status: 'success',
    data: { address },
  });
});
