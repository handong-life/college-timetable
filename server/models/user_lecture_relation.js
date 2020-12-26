const { Model } = require('sequelize');

class UserLectureRelation extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        tableName: 'UserLectureRelation',
        modelName: 'userLectureRelation',
        sequelize,
      },
    );
  }
}

module.exports = UserLectureRelation;
