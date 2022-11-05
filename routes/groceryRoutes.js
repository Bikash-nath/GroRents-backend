const express = require('express');
const groceryController = require('../controllers/groceryController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:groceryId/reviews', reviewRouter); // allow Nested review routes

router
  .route('/')
  .get(groceryController.getAllHouses)
  .post(
    authController.protect,
    authController.restrictTo('owner'),
    groceryController.createHouse
  );

router
  .route('/:id')
  .get(authController.protect, groceryController.getHouse)
  .patch(
    authController.protect,
    authController.restrictTo('owner', 'admin'),
    groceryController.updateHouse
  )
  .delete(
    authController.protect,
    authController.restrictTo('owner', 'admin'),
    groceryController.deleteHouse
  );

module.exports = router;
