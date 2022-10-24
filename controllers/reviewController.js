const Review = require('./../models/reviewModel');
// const catchAsync = require('./../utils/catchAsync');

// Nested review routes
exports.setReviewUserIds = (req, res, next) => {
  //set review id from query if not specified in body
  if (!req.body.review) req.body.review = req.params.reviewId;
  if (!req.body.user) req.body.user = req.user.id; //from Protect middleware
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.houseId) filter = { house: req.params.houseId }; //get reviews based on houseId

  const reviews = await Review.find(filter);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) return next(new AppError('No review found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) return next(new AppError('No review found with this ID', 404));

  res.status(200).json({
    status: 'success',
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);

  if (!review) return next(new AppError('No review found with this ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
