const express = require('express');
const router = express.Router();
const { router: authRouter, isAuthenticated } = require('./auth');
const lectureRouter = require('./lecture');

router.use('/auth', authRouter);

router.use(isAuthenticated);
router.use('/lecture', lectureRouter);

module.exports = router;
