const express = require('express');
const houseController = require('./../controllers/houseController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(houseController.getAllHouses)
  .post(authController.protect, 
    authController.restrictTo('owner', 'admin'),
    houseController.createHouses);

router
  .route('/:id')
  .get(authController.protect, houseController.getHouse)
  .patch(authController.protect, 
    authController.restrictTo('owner', 'admin'),
    houseController.updateHouse)
  .delete(authController.protect, 
    authController.restrictTo('owner', 'admin'),
    houseController.deleteHouse);

module.exports = router;
