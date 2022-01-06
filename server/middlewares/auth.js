const passport = require('passport');
const { ExtractJwt, Strategy: JWTStrategy } = require('passport-jwt');
const User = require('../models/user');

const JWTConfig = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTVerify = async ({ userId }, done) => {
  try {
    const user = await User.findOne({
      where: { id: process.env.NODE_ENV == 'dev' ? 1 : userId },
    });
    if (user) {
      done(null, user);
      return;
    }
    done(null, false, { reason: '올바르지 않은 인증정보 입니다.' });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

passport.use('jwt', new JWTStrategy(JWTConfig, JWTVerify));

exports.isValidJwtToken = passport.authenticate('jwt', { session: false });
