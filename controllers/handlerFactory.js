const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const House = require('../models/houseModel');
const User = require('../models/userModel');

exports.authoriseUser = (Model, userRoles) =>
  catchAsync(async (req, res, next) => {
    // const users=userRoles.reduce((u, r) => ({ ...u, [r]: r }), {});  //array -> object
    console.log('ID:', req.params.id);
    req.query = doc = await Model.findById(req.params.id);
    console.log('\n\n\nuserRoles', userRoles[0]);
    console.log('req.user.role:', userRoles.includes(req.user.role));
    console.log('role ?:', req.user.role === userRoles[0]);
    console.log(
      'Doc:'
      // (doc.user?._id || doc.owner?._id || doc.guide?._id || doc?._id) != req.user.id
    );
    console.log('user', req.user.id);
    if (
      (userRoles.includes('admin') && req.user.role === 'admin') ||
      (req.method === 'POST' && req.user.role === userRoles[0])
    ) {
      return next();
    }
    if (
      (doc.user?._id || doc.owner?._id || doc.guide?._id || doc?._id) != req.user.id ||
      !userRoles.includes(req.user.role)
    ) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  });

exports.getOne = (Model, filter, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findOne(req.filter);
    if (popOptions) query = query.populate(popOptions);
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
