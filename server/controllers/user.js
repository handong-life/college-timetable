const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const User = require('../models/user');
const UserLectureRelation = require('../models/user_lecture_relation');

exports.getUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: Lecture,
        through: UserLectureRelation,
      },
      { model: Timetable, include: Lecture },
    ],
  });
  console.log(user);
  res.send(user);
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
