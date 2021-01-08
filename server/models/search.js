const { Model, DataTypes } = require('sequelize');

class Search extends Model {
  static init(sequelize) {
    return super.init(
      {
        search: DataTypes.STRING,
        userId: DataTypes.INTEGER,
      },
      {
        tableName: 'Search',
        modelName: 'search',
        sequelize,
      },
    );
  }
}

module.exports = Search;
