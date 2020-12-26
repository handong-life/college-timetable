const { Op } = require('sequelize');

exports.searchWhereClause = (search, attributeName = 'name') => {
  return (
    search?.split(' ').map((word) => ({
      [attributeName]: {
        [Op.like]: '%' + word + '%',
      },
    })) ?? []
  );
};
