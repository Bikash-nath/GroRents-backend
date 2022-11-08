// const Grocery = require('../models/groceryModel');
const factory = require('./handlerFactory');

exports.authoriseGrocery = (...userRoles) => {
  // return factory.authoriseUser(Grocery, userRoles);
};

exports.setGroceryFilter = (req, res, next) => {
  req.filter = { _id: req.params.id };
  next();
};

// exports.getAllGrocerys = factory.getAll(Grocery);
// exports.getGrocery = factory.getOne(Grocery, { path: 'reviews' });
// exports.createGrocery = factory.createOne(Grocery);
// exports.updateGrocery = factory.updateOne(Grocery);
// exports.deleteGrocery = factory.deleteOne(Grocery);
