require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const passport = require('passport');
const { sequelize } = require('./models');
const passportConfig = require('./lib/passport');
const { errorMiddleware } = require('./middlewares/error');

sequelize
  .authenticate()
  .then(() => console.log('🚀Connection Created!'))
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false });

const app = express();
const router = require('./routes');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
passportConfig();

app.use('/', router);
app.use(errorMiddleware);

module.exports = app;
