const express = require('express');
const addressController = require('../controllers/addressController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(addressController.getAllAddresss)
  .post(addressController.setAddressUserIds, addressController.createAddress);

router
  .route('/:id')
  .get(addressController.getAddress)
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

module.exports = router;
