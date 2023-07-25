const express = require('express');
const router = express.Router();
const { postCriminal, getCriminal, getAllCriminals, updateCriminal, deleteCriminal } = require('../controllers/criminal');

router.post('/add', postCriminal);
router.get('/get', getCriminal);
router.get('/getAll', getAllCriminals);
router.post('/update', updateCriminal);
router.post('/delete', deleteCriminal);

module.exports = router;