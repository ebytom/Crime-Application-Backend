const express = require('express');
const { getFeeds } = require('../controllers/dashboard');
const router = express.Router();

router.get('/getFeeds', getFeeds);

module.exports = router;