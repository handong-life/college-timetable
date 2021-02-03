const { Model } = require('sequelize');

class UserLectureGleaningRelation extends Model {
  static init(sequelize) {
    return super.init(
      {},
      {
        tableName: 'UserLectureGleaningRelation',
        modelName: 'userLectureGleaningRelation',
        sequelize,
      },
    );
  }
}

module.exports = UserLectureGleaningRelation;
