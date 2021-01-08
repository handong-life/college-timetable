const { Model, DataTypes } = require('sequelize');

class Feedback extends Model {
  static init(sequelize) {
    return super.init(
      {
        feedback: DataTypes.TEXT,
        userId: DataTypes.INTEGER,
      },
      {
        tableName: 'Feedback',
        modelName: 'feedback',
        sequelize,
      },
    );
  }
}

module.exports = Feedback;
