const express = require('express');
const houseController = require('../controllers/houseController');
const authController = require('../controllers/authController');
const addressController = require('../controllers/addressController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router
  .route('/')
  .get(houseController.getAllHouses)
  .post(authController.protect, authController.restrictTo('owner'), houseController.createHouse);

router
  .route('/:id')
  .get(houseController.getHouse)
  .patch(authController.protect, authController.restrictTo('owner', 'guides', 'admin'), houseController.updateHouse)
  .delete(authController.protect, authController.restrictTo('owner', 'admin'), houseController.deleteHouse);

router.route('/houses-within/:distance/center/:latlng').get(houseController.getHousesWithin);

// Nested routes
router.use('/:houseId/reviews', reviewRouter);

router.use(authController.protect);
router
  .route('/:houseId/address')
  .get(houseController.getHouseAddress, addressController.getAddress)
  .post(addressController.createAddress, authController.restrictTo('owner'), houseController.saveHouseAddress)
  .patch(houseController.getHouseAddress, authController.restrictTo('owner', 'admin'), addressController.updateAddress)
  .delete(houseController.getHouseAddress, authController.restrictTo('owner', 'admin'), addressController.deleteAddress);

module.exports = router;
