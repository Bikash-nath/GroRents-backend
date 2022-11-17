const House = require('../models/houseModel');
const factory = require('./handlerFactory');

exports.setHouseFilter = (req, res, next) => {
  // req.filter = { _id: req.params.id };
  next();
};

exports.getAllHouses = factory.getAll(House);
exports.getHouse = factory.getOne(House, { path: 'reviews' });
exports.createHouse = factory.createOne(House);
exports.updateHouse = factory.updateOne(House);
exports.deleteHouse = factory.deleteOne(House);
