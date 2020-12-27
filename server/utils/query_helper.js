const { Op } = require('sequelize');

exports.searchWhereClause = (search) => {
  const searchAttributes = ['name', 'professor', 'hakbu', 'code', 'period'];
  return search?.split(',').map((word) => ({
    [Op.and]: {
      [Op.or]: searchAttributes.map((attributes) => ({
        [attributes]: {
          [Op.like]: '%' + word + '%',
        },
      })),
    },
  }));
};
