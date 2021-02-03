const Feedback = require('../models/feedback');
const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const User = require('../models/user');
const UserLectureGleaningRelation = require('../models/user_lecture_gleaning_relation');

exports.getUser = async (req, res) => {
  await User.update(
    {
      viewCount: User.sequelize.literal('viewCount + 1'),
      lastLoggedInAt: new Date(),
    },
    { where: { id: req.user.id } },
  );

  const user = await User.findOne({
    where: { id: req.user.id },
    include: [
      { as: 'bookmarks', model: Lecture },
      { as: 'spikes', model: Lecture },
      { model: Timetable, include: Lecture },
    ],
  });
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

exports.addSpikeLecture = async (req, res) => {
  await UserLectureGleaningRelation.create({
    userId: req.user.id,
    lectureId: +req.params.lectureId,
  });
  res.send('complete');
};

exports.deleteSpikeLecture = async (req, res) => {
  await UserLectureGleaningRelation.destroy({
    where: {
      userId: req.user.id,
      lectureId: +req.params.lectureId,
    },
  });
  res.send('complete');
};

exports.getBookmarks = async (req, res) => {
  const userBookmarks = await User.findOne({
    where: { id: req.user.id },
    include: {
      model: Lecture,
      through: UserLectureRelation,
    },
  });

  res.send(userBookmarks.lectures);
};

exports.createFeedback = async (req, res) => {
  await Feedback.create({
    userId: req.user.id,
    feedback: req.body.feedback,
  });

  res.send('complete');
};
