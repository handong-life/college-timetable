const Lecture = require('../models/lecture');
const User = require('../models/user');
const UserLectureRelation = require('../models/user_lecture_relation');
const { searchWhereClause } = require('../utils/query_helper');

exports.getSearchResults = async (req, res) => {
  const { search } = req.query;
  const searchResults = await Lecture.findAll({
    where: searchWhereClause(decodeURIComponent(search)),
    limit: 10,
  });
  res.send(searchResults);
};

exports.bookmarkLecture = async (req, res) => {
  await UserLectureRelation.create({
    userId: req.user.id,
    lectureId: +req.params.lectureId,
  });
  res.send('complete');
};

exports.unbookmarkLecture = async (req, res) => {
  await UserLectureRelation.destroy({
    where: {
      userId: req.user.id,
      lectureId: +req.params.lectureId,
    },
  });
  res.send('complete');
};

exports.getBookmarks = async (req, res) => {
  const userBookmarks = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: {
      model: Lecture,
      through: UserLectureRelation,
    },
  });

  res.send(userBookmarks.lectures);
};
