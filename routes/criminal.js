const express = require('express');
const router = express.Router();
const { postCriminal, getCriminal, getAllCriminals, updateCriminal, deleteCriminal } = require('../controllers/criminal');

router.post('/add', postCriminal);
router.get('/get', getCriminal);
router.get('/getAll', getAllCriminals);
router.put('/update', updateCriminal);
router.delete('/delete', deleteCriminal);

module.exports = router;