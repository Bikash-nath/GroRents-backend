const House = require('../models/houseModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllHouses = factory.getAll(House);
exports.getHouse = factory.getOne(House, { path: 'reviews' });
exports.createHouse = factory.createOne(House);
exports.updateHouse = factory.updateOne(House);
exports.deleteHouse = factory.deleteOne(House);

// /houses-within/:distance/center/:latlng
// /houses-within/233/center/34.111745,-118.113491
exports.getHousesWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = distance / 6378.1;

  if (!lat || !lng) {
    next(new AppError('Please provide latitute and longitude in the format lat,lng.', 400));
  }

  const houses = await House.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: houses.length,
    data: {
      data: houses,
    },
  });
});

exports.getHouseAddress = catchAsync(async (req, res, next) => {
  const house = await House.findById(req.params.houseId);
  if (!house.address) {
    return next(new AppError('No address found', 404));
  }
  req.params.id = house.address._id;
  next();
  // res.redirect(307, `/api/address/${house.address._id}`); //use if req.method is not changed to get (code: 200)
});

exports.saveHouseAddress = catchAsync(async (req, res, next) => {
  const address = req.body.address;
  const house = await House.findByIdAndUpdate(req.params.houseId, { address: address._id });

  res.status(201).json({
    status: 'success',
    data: { address },
  });
});
