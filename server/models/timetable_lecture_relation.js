const { Model } = require('sequelize');

class TimetableLectureRelation extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        tableName: 'TimetableLectureRelation',
        modelName: 'timetableLectureRelation',
        sequelize,
      },
    );
  }
}

module.exports = TimetableLectureRelation;
