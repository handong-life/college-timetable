const Lecture = require('../models/lecture');
const Timetable = require('../models/timetable');
const TimetableLectureRelation = require('../models/timetable_lecture_relation');
const JWT = require('jsonwebtoken');

exports.getTimetable = async (req, res) => {
  JWT.verify(req.params.id, process.env.JWT_SECRET, async (err, timetableId) => {
    if (err) return res.sendStatus(404);

    const timetable = await Timetable.findOne({
      where: {
        id: +timetableId,
      },
      include: {
        model: Lecture,
        through: TimetableLectureRelation,
      },
    });

    if (!timetable) return res.sendStatus(404);

    timetable.increment('sharedViewCount');
    res.send(timetable);
  });
};
