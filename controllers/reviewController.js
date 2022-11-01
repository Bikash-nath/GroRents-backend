const Review = require('..//models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('..//utils/catchAsync');

// exports.verifyUser = (req, res, next) => {
//   const review = Review.findById(req.user.id);
//   if ((review.user !== req.user.id && req.user.role === 'user') || req.user.role !== 'admin') {
//     return next(new AppError('You do not have permission to perform this action', 403));
//   }
//   next();
// };

// Nested review routes
exports.setHouseUserIds = (req, res, next) => {
  //set review id from query if not specified in body
  if (!req.body.house) req.body.house = req.params.houseId;
  if (!req.body.user) req.body.user = req.user.id; //from Protect middleware
  next();
};

exports.getAllReviews = factory.getAll(Review, { user: req.body.user });
exports.getReview = factory.getOne(Review, { path: 'reviews' });
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};
//   if (req.params.houseId) filter = { house: req.params.houseId }; //get reviews based on houseId

//   const reviews = await Review.find(filter);

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

// exports.getReview = catchAsync(async (req, res, next) => {
//   const review = await Review.findById(req.params.id);

//   if (!review) return next(new AppError('No review found with this ID', 404));

//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.createReview = catchAsync(async (req, res, next) => {
//   const newReview = await Review.create(req.body);

//   res.status(201).json({
//     status: 'success',
//     data: {
//       review: newReview,
//     },
//   });
// });

// exports.updateReview = catchAsync(async (req, res, next) => {
//   const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   if (!review) return next(new AppError('No review found with this ID', 404));

//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.deleteReview = catchAsync(async (req, res, next) => {
//   const review = await Review.findByIdAndDelete(req.params.id);

//   if (!review) return next(new AppError('No review found with this ID', 404));

//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
