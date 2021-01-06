require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const { sequelize } = require('./models');

sequelize
  .authenticate()
  .then(() => console.log('🚀Connection Created!'))
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false });

const app = express();
const router = require('./routes');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(
  session({
    secret: process.env.SECRET_CODE,
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: true,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', router);
app.use((req, res) => res.sendFile(path.join(__dirname, '../client/build/index.html')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
