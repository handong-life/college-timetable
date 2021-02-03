const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        email: DataTypes.TEXT,
        lastLoggedInAt: DataTypes.DATE,
        viewCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        tableName: 'User',
        modelName: 'user',
        sequelize,
      },
    );
  }
  static associate(models) {
    this.belongsToMany(models.lecture, { through: 'userLectureRelation', as: 'bookmarks' });
    this.belongsToMany(models.lecture, { through: 'userLectureGleaningRelation', as: 'spikes' });
    this.hasMany(models.timetable, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }
}

module.exports = User;
