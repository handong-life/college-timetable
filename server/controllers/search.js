const Lecture = require('../models/lecture');
const Search = require('../models/search');
const Timetable = require('../models/timetable');
const UserLectureGleaningRelation = require('../models/user_lecture_gleaning_relation');
const UserLectureRelation = require('../models/user_lecture_relation');
const { addCount, bookmarkCount, spikeCount } = require('../utils/counter_helper');
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

  // Get spike information
  const lecturesWithCount = await Promise.all(
    lectures.map(async (lec) => {
      const [add, bookmark, spike] = await Promise.all([
        addCount(lec.id),
        bookmarkCount(lec.id),
        spikeCount(lec.id),
      ]);

      return {
        ...lec.dataValues,
        count: {
          add,
          bookmark,
          spike,
        },
      };
    }),
  );

  res.send({ pages: count === 0 ? 0 : Math.ceil(count / limit), lectures: lecturesWithCount });
};
