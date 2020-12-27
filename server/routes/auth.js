const { Router } = require('express');
const router = Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const Timetable = require('../models/timetable');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, next) {
      if (!profile) return next('err', null);

      User.findOne({ where: { email: profile.emails[0].value } }).then(async (user) => {
        if (user) {
          const { name, email, imageUrl } = user;
          return next(null, { name, email, imageUrl });
        } else {
          const { id, name, email, imageUrl } = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            imageUrl: profile.photos[0].value,
          });
          await Timetable.create({ userId: id, name: '예비시간표1' });
          return next(null, { name, email, imageUrl });
        }
      });
    },
  ),
);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  // for testing
  req.user = { id: 1 };
  console.log('hi');
  return next();
  // throw createError(401, 'Auth Error');
}

router.get(
  '/google',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      req.session.returnTo = req.headers.referer;
      return next();
    }
    res.redirect(req.headers.referer);
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth' }),
  function (req, res) {
    res.cookie('user', JSON.stringify(req.user)).redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
  },
);

module.exports = { router, isAuthenticated };
