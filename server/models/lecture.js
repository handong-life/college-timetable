const { Model, DataTypes } = require('sequelize');

class Lecture extends Model {
  static init(sequelize) {
    return super.init(
      {
        gubun: DataTypes.STRING,
        code: DataTypes.STRING,
        hakbu: DataTypes.STRING,
        professor: DataTypes.STRING,
        name: DataTypes.TEXT,
        credit: DataTypes.DOUBLE,
        period: DataTypes.STRING,
        roomNo: DataTypes.STRING,
        maxNum: DataTypes.INTEGER,
        curNum: DataTypes.INTEGER,
        english: DataTypes.STRING,
        gyoyang: DataTypes.STRING,
        grading: DataTypes.STRING,
        pfPossible: DataTypes.BOOLEAN,
        crawledAt: DataTypes.DATEONLY,
      },
      {
        tableName: 'Lecture',
        modelName: 'lecture',
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsToMany(models.timetable, { through: 'timetableLectureRelation' });
    this.belongsToMany(models.user, { through: 'userLectureRelation' });
  }
}

module.exports = Lecture;
