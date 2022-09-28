const express = require('express');
const houseController = require('./../controllers/houseController');

const router = express.Router();

router
  .route('/')
  .get(houseController.getAllHouses)
  .post(houseController.createHouse);

router
  .route('/:id')
  .get(houseController.getHouse)
  .patch(houseController.updateHouse)
  .delete(houseController.deleteHouse);

module.exports = router;
