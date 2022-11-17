const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const addressRouter = require('../routes/addressRoutes');

const router = express.Router({ mergeParams: true });

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
// router.use(authController.restrictTo());

router.patch('/updatePassword', authController.updatePassword);

router.route('/me').get(userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.use('/me/address', addressRouter); // allow Nested address routes

router.route('/:id').get(userController.getUser);

module.exports = router;
