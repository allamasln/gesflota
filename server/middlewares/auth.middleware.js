const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  // should check if user is authenticated! redirect to login if it is not.
  next();
}

module.exports.checkRole = (role) => {
  // should check if current user's role is the received one. Call next if OK, throw error if not!

  // delete this!
  return (req, res, next) => next();
}
