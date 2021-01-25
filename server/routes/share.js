const { Router } = require('express');
const router = Router();
const shareController = require('../controllers/share');

router.get('/:id', shareController.getTimetable);

module.exports = router;
