const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const UserLectureGleaningRelation = require('../models/user_lecture_gleaning_relation');
const UserLectureRelation = require('../models/user_lecture_relation');

// Add
const addCount = (id) =>
  Timetable.count({
    include: {
      model: Lecture,
      where: {
        id,
      },
    },
    distinct: true,
    col: 'userId',
  });

// Bookmark
const bookmarkCount = (id) =>
  UserLectureRelation.count({
    where: { lectureId: id },
  });

// Spike
const spikeCount = (id) =>
  UserLectureGleaningRelation.count({
    where: { lectureId: id },
  });

module.exports = {
  addCount,
  bookmarkCount,
  spikeCount,
};
