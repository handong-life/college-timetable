const { Router } = require('express');
const router = Router();
const lectureController = require('../controllers/lecture');

router.get('/search', lectureController.getSearchResults);

module.exports = router;
