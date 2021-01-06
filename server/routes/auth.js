const { Router } = require('express');
const router = Router();
const createError = require('http-errors');
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
          return next(null, user);
        } else {
          const user = await User.create({
            email: profile.emails[0].value,
          });
          await Timetable.create({ userId: user.id, title: '예비시간표1' });
          return next(null, user);
        }
      });
    },
  ),
);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  // for testing
  // req.user = { id: 1 };
  // return next();
  throw createError({ status: 401, message: 'Auth Error' });
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

router.get('/logout', function (req, res) {
  req.logout();
  res.send('complete');
});

module.exports = { router, isAuthenticated };
