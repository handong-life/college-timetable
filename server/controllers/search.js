const Lecture = require('../models/lecture');
const Search = require('../models/search');
const { searchWhereClause } = require('../utils/query_helper');

exports.getSearchResults = async (req, res) => {
  const { search, page } = req.query;
  const limit = +process.env.PAGE_LIMIT;
  const decodedSearch = decodeURIComponent(search);

  Search.create({ userId: req.user.id, search: decodedSearch });
  const { count, rows: lectures } = await Lecture.findAndCountAll({
    where: searchWhereClause(decodedSearch),
    limit,
    offset: page ? limit * (+page - 1) : 0,
  });

  res.send({ pages: count === 0 ? 0 : Math.ceil(count / limit) + 1, lectures });
};
