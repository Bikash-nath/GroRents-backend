const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const addressRouter = require('../routes/addressRoutes');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.get('/getMe', userController.setUserId, userController.getMe());
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.route('/:id').get(userController.getUser);

router.use('/me/reviews', userController.setUserId, reviewRouter);

router
  .route('/me/address')
  .get(userController.getUserAddress, addressRouter)
  .post(addressRouter, userController.saveUserAddress)
  .patch(userController.getUserAddress, addressRouter)
  .delete(userController.getUserAddress, addressRouter);

module.exports = router;
