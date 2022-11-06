const express = require('express');
const houseController = require('../controllers/houseController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes').default;

const router = express.Router();

router.use('/:houseId/reviews', reviewRouter); // allow Nested review routes

router
  .route('/')
  .get(houseController.getAllHouses)
  .post(
    authController.protect,
    authController.restrictTo('owner'),
    houseController.createHouse
  );

router
  .route('/:id')
  .get(authController.protect, houseController.getHouse)
  .patch(
    authController.protect,
    authController.restrictTo('owner', 'guides', 'admin'),
    houseController.updateHouse
  )
  .delete(
    authController.protect,
    authController.restrictTo('owner', 'admin'),
    houseController.deleteHouse
  );

module.exports = router;
