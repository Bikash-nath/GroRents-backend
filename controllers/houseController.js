const House = require('../models/houseModel');
const factory = require('./handlerFactory');

exports.setHouseFilter = (req, res, next) => {
  // req.filter = { _id: req.params.id };
  next();
};

exports.getAllHouses = factory.getAll(House);
exports.getHouse = factory.getOne(House, { path: 'reviews' });
exports.createHouse = factory.createOne(House);
exports.updateHouse = factory.updateOne(House);
exports.deleteHouse = factory.deleteOne(House);

// exports.authoriseHouse = exports.authoriseUsers = (...userRoles) =>
//   catchAsync(async (req, res, next) => {
//     const review = (req.query = await User.findById(req.params.id));
//     console.log('User ID:', req.params.id, 'user', req.user.id);
//     console.log(
//       '\n\n\nuserRoles',
//       userRoles[0],
//       'user.role:',
//       userRoles.includes(req.user.role)
//     );
//     console.log('User user:', review.user?._id === req.user.id);
//     if (
//       (userRoles.includes('admin') && req.user.role === 'admin') ||
//       (req.method === 'POST' && req.user.role === userRoles[0])
//     ) {
//       return next();
//     }
//     if (
//       (review.user?._id || doc?._id) != req.user.id ||
//       !userRoles.includes(req.user.role)
//     ) {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   });

// exports.setHouseFilter = (req, res, next) => {
//   // req.filter = { _id: req.params.id };
//   next();
// };

// exports.getAllHouses = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(House.find(), req.query).sort().limitFields();
//   const houses = await features.query;

//   // Send Response
//   res.status(200).json({
//     status: 'success',
//     results: houses.length,
//     data: {
//       houses,
//     },
//   });
// });

// exports.getHouse = catchAsync(async (req, res, next) => {
//   const house = await House.findById(req.params.id).populate('reviews');

//   if (!house) return next(new AppError('No house found with this ID', 404));

//   res.status(200).json({
//     status: 'success',
//     data: {
//       house,
//     },
//   });
// });

// exports.createHouse = catchAsync(async (req, res, next) => {
//   const newHouse = await House.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       house: newHouse,
//     },
//   });
// });

// exports.updateHouse = catchAsync(async (req, res, next) => {
//   const house = await House.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!house) return next(new AppError('No house found with this ID', 404));

//   res.status(200).json({
//     status: 'success',
//     data: {
//       house,
//     },
//   });
// });

// exports.deleteHouse = catchAsync(async (req, res, next) => {
//   const house = await House.findByIdAndDelete(req.params.id);

//   if (!house) return next(new AppError('No house found with this ID', 404));

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
