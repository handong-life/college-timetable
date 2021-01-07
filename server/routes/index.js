const express = require('express');
const router = express.Router();
const { isValidJwtToken } = require('../middlewares/auth');

const authRouter = require('./auth');
const userRouter = require('./user');
const timetableRouter = require('./timetable');
const searchController = require('../controllers/search');

router.use('/auth', authRouter);

router.use(isValidJwtToken);

router.get('/search', searchController.getSearchResults);
router.use('/timetable', timetableRouter);
router.use('/user', userRouter);

module.exports = router;
