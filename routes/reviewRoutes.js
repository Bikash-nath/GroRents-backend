const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router.use(reviewController.protect);

router
  .route('/')
  .get(reviewController.setHouseUserIds, reviewController.getAllReviews)
  .post(
    reviewController.authorizeUserReviews('user'),
    reviewController.setHouseUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    reviewController.authorizeUserReviews('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    reviewController.authorizeUserReviews('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
