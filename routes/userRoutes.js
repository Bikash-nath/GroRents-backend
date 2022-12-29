const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const addressController = require('../controllers/addressController');
const houseRouter = require('../routes/houseRoutes');

const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get('/getMe', userController.setUserId, userController.getMe());
router.patch('/updateMe', userController.updateMe);
router.patch('/updatePassword', authController.updatePassword);
router.delete('/deleteMe', userController.deleteMe);

router.route('/:id').get(userController.getUser);

//Nested routes
router.route('/me/houses').get(authController.restrictTo('owner'), houseRouter);

router
  .route('/:houseId/address')
  .get(userController.getUserAddress, addressController.getAddress)
  .post(addressController.createAddress, userController.saveUserAddress)
  .patch(userController.getUserAddress, addressController.updateAddress)
  .delete(userController.getUserAddress, addressController.deleteAddress);

module.exports = router;
