const Lecture = require('../models/lecture');
const { searchWhereClause } = require('../utils/query_helper');

exports.getSearchResults = async (req, res) => {
  const { search } = req.query;
  const searchResults = await Lecture.findAll({
    where: searchWhereClause(decodeURIComponent(search)),
    limit: 10,
  });
  res.send(searchResults);
};
