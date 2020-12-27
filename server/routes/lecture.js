const { Router } = require('express');
const router = Router();
const lectureController = require('../controllers/lecture');

router.get('/search', lectureController.getSearchResults);
router.get('/bookmark', lectureController.getBookmarks);
router.post('/bookmark/:lectureId', lectureController.bookmarkLecture);
router.delete('/bookmark/:lectureId', lectureController.unbookmarkLecture);

module.exports = router;
