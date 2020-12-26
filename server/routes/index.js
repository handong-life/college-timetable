const express = require('express');
const router = express.Router();
const { router: authRouter } = require('../middlewares/auth');
const lectureRouter = require('./lecture');

router.use('/auth', authRouter);
router.use('/lecture', lectureRouter);

module.exports = router;
