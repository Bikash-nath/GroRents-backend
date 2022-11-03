const express = require('express');
const multer = require('multer');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const addressRouter = require('../routes/addressRoutes');

const router = express.Router();
const upload = multer({ dest: '../uploads/img/users' });
router.use('/:userId/address', addressRouter); // allow Nested address routes

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
// router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.route('/me').get(userController.getMe);
router.patch('/updateMe', upload.single('user-photo'), userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.route('/:id').get(userController.getUser);

module.exports = router;
