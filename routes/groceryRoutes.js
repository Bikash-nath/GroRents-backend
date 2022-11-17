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
    groceryController.createGrocery
  );

router
  .route('/:id')
  .get(authController.protect, groceryController.getGrocery)
  .patch(
    authController.protect,
    authController.restrictTo('owner', 'admin'),
    groceryController.updateGrocery
  )
  .delete(
    authController.protect,
    authController.restrictTo('owner', 'admin'),
    groceryController.deleteGrocery
  );

module.exports = router;
