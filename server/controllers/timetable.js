const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const TimetableLectureRelation = require('../models/timetable_lecture_relation');

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
  const timetable = await Timetable.create(req.body);
  res.send(timetable);
};

exports.updateTimetable = async (req, res) => {
  const { id, name } = req.body;
  await Timetable.update({ name }, { where: { id } });
  res.send('complete');
};

exports.deleteTimetable = async (req, res) => {
  await Timetable.destroy({ where: { id: +req.params.id } });
  res.send('complete');
};

exports.addLecture = async (req, res) => {
  const { timetableId, lectureId } = req.params;
  console.log(timetableId, lectureId);
  await TimetableLectureRelation.create({
    timetableId: +timetableId,
    lectureId: +lectureId,
  });
  res.send('complete');
};

exports.deleteLecture = async (req, res) => {
  const { timetableId, lectureId } = req.params;
  await TimetableLectureRelation.destroy({
    where: {
      timetableId: +timetableId,
      lectureId: +lectureId,
    },
  });
  res.send('complete');
};
