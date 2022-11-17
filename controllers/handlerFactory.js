const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const House = require('../models/houseModel');
const User = require('../models/userModel');

exports.authoriseUser = () =>
  catchAsync(async (req, res, next) => {
    console.log('\n\n\nUser ID:', req.params, 'user-id:', req.params.id);

    const userRole = req.user.role;
    if (userRole === 'admin' || req.method === 'POST') {
      return next();
    }
    return next(new AppError('You do not have permission to perform this action', 403));
  });

exports.getOne = (Model, filter, popOptions) =>
  catchAsync(async (req, res, next) => {
    console.log('GetOne ID:', req.params, 'user-id:', req.params.id, '\n\n');
    let query = Model.findOne({ _id: req.params.id, ...req.filter });
    if (popOptions) query = query.populate(spopOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model, filter = {}) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query).filter().sort().limitFields();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No ${Model} found with that ID`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
