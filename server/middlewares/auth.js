const passport = require('passport');

exports.isValidJwtToken = passport.authenticate('jwt', { session: false });

exports.hasJwtToken = (req, res, next) => {
  if (req.headers.authorization) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }

  req.user = null;
  next();
};
