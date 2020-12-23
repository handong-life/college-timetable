const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: DataTypes.TEXT,
      },
      {
        tableName: 'user',
        modelName: 'user',
        sequelize,
      },
    );
  }
}

module.exports = User;
