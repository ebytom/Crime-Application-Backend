const express = require('express');
const router = express.Router();
const { postCriminal, getCriminal, getAllCriminals, updateCriminal, deleteCriminal } = require('../controllers/criminal');

router.post('/add', postCriminal);
router.post('/get', getCriminal);
router.post('/getAll', getAllCriminals);
router.post('/update', updateCriminal);
router.post('/delete', deleteCriminal);

module.exports = router;