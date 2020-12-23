'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const { DB_HOST, DB_NAME, DB_USER, DB_PW } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PW, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).init(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(async (modelName) => {
  const model = db[modelName];
  if (db[modelName].associate) model.associate(db);
});

module.exports = { sequelize, Sequelize };
