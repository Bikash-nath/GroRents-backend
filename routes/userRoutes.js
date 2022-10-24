const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const addressRouter = require('./../routes/addressRoutes');

router.use('/:userId/address', addressRouter); // allow Nested address routes

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/updatePassword', authController.protect, authController.updatePassword);

router.patch('/update', authController.protect, userController.updateUser);
router.delete('/delete', authController.protect, userController.deleteUser);

router.route('/:id').get(userController.getUser);

module.exports = router;
