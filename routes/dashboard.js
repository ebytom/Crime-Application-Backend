const express = require('express');
const { getFeeds, getCharts } = require('../controllers/dashboard');
const router = express.Router();

router.get('/getFeeds', getFeeds);
router.get('/getCharts', getCharts);

module.exports = router;