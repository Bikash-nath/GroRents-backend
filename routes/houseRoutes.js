const express = require('express');
const houseController = require('../controllers/houseController');
const authController = require('../controllers/authController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router.use('/:houseId/reviews', reviewRouter); // allow Nested review routes

router
  .route('/')
  .get(houseController.getAllHouses)
  .post(
    authController.protect,
    houseController.authoriseHouse('owner'),
    houseController.createHouse
  );

router
  .route('/:id')
  .get(authController.protect, houseController.getHouse)
  .patch(
    authController.protect,
    houseController.authoriseHouse('owner', 'guides', 'admin'),
    houseController.updateHouse
  )
  .delete(
    authController.protect,
    houseController.authoriseHouse('owner', 'admin'),
    houseController.deleteHouse
  );

module.exports = router;
