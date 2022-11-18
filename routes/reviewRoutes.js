const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get(
    reviewController.filterReviews,
    reviewController.setHouseUserIds,
    reviewController.getUserReviews
  )
  .post(authController.restrictTo('user'), reviewController.createReview);

router.use(authController.restrictTo('user', 'admin'));
router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
