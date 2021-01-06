const { Router } = require('express');
const router = Router();
const timetableController = require('../controllers/timetable');

router.post('/', timetableController.createTimetable);
router.get('/:timetableId', timetableController.getTimetable);
router.put('/', timetableController.updateTimetable);
router.delete('/:timetableId', timetableController.deleteTimetable);
router.post('/lecture/:timetableId/:lectureId', timetableController.addLecture);
router.delete('/lecture/:timetableId/:lectureId', timetableController.deleteLecture);

module.exports = router;
