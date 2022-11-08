const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.setHouseUserIds, reviewController.getAllReviews)
  .post(
    reviewController.authoriseReviews('user'),
    reviewController.setHouseUserIds,
    reviewController.createReview
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    reviewController.authoriseReviews('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    reviewController.authoriseReviews('user', 'admin'),
    reviewController.deleteReview
  );

module.exports = router;
