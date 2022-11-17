const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

// Nested review routes
exports.setHouseUserIds = (req, res, next) => {
  //set review id from query if not specified in body
  if (!req.body.house) req.body.house = req.params.houseId;
  if (!req.body.user) req.body.user = req.user.id; //from Protect middleware
  next();
};

exports.getUserReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review, { path: 'reviews' });
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);

exports.createReview = catchAsync(async (req, res) => {
  const newReview = await Review.create({
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    house: req.body.house,
    user: req.user.id,
  });
  const review = await Review.create(newReview);

  res.status(201).json({
    status: 'success',
    data: {
      data: review,
    },
  });
});

// exports.updateReview =[factory.authoriseUser(Review,['user', 'admin']), factory.updateOne];  //app.get("/", ...middlewares)

// exports.verifyUser = (...roles) => {
//   return (req, res, next) => {
//     const review = Review.findById(req.params.id);
//     if (
//       (roles.includes('admin') && req.user.role === 'admin') ||
//       (req.user.role === 'user' && req.method === 'POST')
//     ) {
//       next();
//     }
//     if (review.user !== req.user.id || req.user.role !== 'user') {
//       return next(new AppError('You do not have permission to perform this action', 403));
//     }
//     next();
//   };
// };

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
// });?
