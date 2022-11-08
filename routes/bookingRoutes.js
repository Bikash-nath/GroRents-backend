const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(
    bookingController.authoriseBooking('user'),
    bookingController.createBookingCheckout
  );

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(
    bookingController.authoriseBooking('owner', 'admin'),
    bookingController.updateBooking
  )
  .delete(
    bookingController.authoriseBooking('owner', 'admin'),
    bookingController.deleteBooking
  );

module.exports = router;
