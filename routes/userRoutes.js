const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const addressRouter = require('../routes/addressRoutes');

const router = express.Router();
router.use('/:userId/address', addressRouter); // allow Nested address routes

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.use(userController.authoriseUser);

router.patch('/updatePassword', authController.updatePassword);

router.route('/me').get(userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.route('/:id').get(userController.getUser);

module.exports = router;
