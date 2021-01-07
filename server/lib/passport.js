const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { ExtractJwt } = passportJWT;
const User = require('../models/user');
const Timetable = require('../models/timetable');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
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

  // jwt strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const result = await User.findOne({ where: { id: payload.userId } });
          if (!result) {
            return done(null, false, '');
          }
          const { dataValues: user } = result;
          return done(null, user);
        } catch (e) {
          return done(e);
        }
      },
    ),
  );
};
