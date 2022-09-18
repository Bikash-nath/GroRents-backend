exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'No users found',
  });
};
exports.getUser = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'User not found',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
