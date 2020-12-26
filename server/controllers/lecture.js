const Lecture = require('../models/lecture');
const { searchWhereClause } = require('../utils/query_helper');

exports.getSearchResults = async (req, res) => {
  const { search } = req.query;
  console.log(decodeURIComponent(search));
  const searchResults = await Lecture.findAll({
    where: searchWhereClause(decodeURIComponent(search)),
    limit: 10,
  });
  console.log(searchResults);
  res.send(searchResults);
};
