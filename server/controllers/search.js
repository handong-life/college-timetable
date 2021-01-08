const Lecture = require('../models/lecture');
const Search = require('../models/search');
const { searchWhereClause } = require('../utils/query_helper');

exports.getSearchResults = async (req, res) => {
  const search = decodeURIComponent(req.query.search);
  Search.create({ userId: req.user.id, search });
  const searchResults = await Lecture.findAll({
    where: searchWhereClause(search),
    limit: 30,
  });
  res.send(searchResults);
};
