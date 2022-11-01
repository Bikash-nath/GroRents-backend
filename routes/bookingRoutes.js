const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(authController.restrictTo('user'), bookingController.createBookingCheckout);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(authController.restrictTo('owner', 'admin'), bookingController.updateBooking)
  .delete(authController.restrictTo('owner', 'admin'), bookingController.deleteBooking);

module.exports = router;
