const express = require('express');
const houseController = require('../controllers/houseController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');
const addressRouter = require('../routes/addressRoutes');

const router = express.Router();

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
  .get(houseController.getHouse)
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

// Nested routes
router.use('/:houseId/reviews', reviewRouter);
router
  .route('/:houseId/address')
  .get(houseController.getHouseAddress, addressRouter)
  .post(addressRouter, houseController.saveHouseAddress)
  .patch(houseController.getHouseAddress, addressRouter)
  .delete(houseController.getHouseAddress, addressRouter);

module.exports = router;
