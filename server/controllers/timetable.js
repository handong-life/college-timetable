const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const TimetableLectureRelation = require('../models/timetable_lecture_relation');
const { addCount } = require('../utils/counter_helper');

exports.getTimetable = async (req, res) => {
  const timetable = await Timetable.findOne({
    where: {
      id: +req.params.timetableId,
    },
    include: {
      model: Lecture,
      through: TimetableLectureRelation,
    },
  });
  res.send(timetable);
};
exports.createTimetable = async (req, res) => {
  const timetable = await Timetable.create({
    userId: req.user.id,
    title: req.body.title,
  });
  res.send(timetable);
};

exports.updateTimetable = async (req, res) => {
  const { id, title } = req.body;
  await Timetable.update({ title }, { where: { id } });
  res.send('complete');
};

exports.deleteTimetable = async (req, res) => {
  await Timetable.destroy({ where: { id: +req.params.timetableId } });
  res.send('complete');
};

exports.addLecture = async (req, res) => {
  const { timetableId, lectureId } = req.params;
  await TimetableLectureRelation.create({
    timetableId: +timetableId,
    lectureId: +lectureId,
  });
  return res.json({
    msg: 'complete',
    count: {
      add: await addCount(+lectureId),
    },
  });
};

exports.deleteLecture = async (req, res) => {
  const { timetableId, lectureId } = req.params;
  await TimetableLectureRelation.destroy({
    where: {
      timetableId: +timetableId,
      lectureId: +lectureId,
    },
  });
  return res.json({
    msg: 'complete',
    count: {
      add: await addCount(lectureId),
    },
  });
};
