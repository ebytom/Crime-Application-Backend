const express = require('express');
const router = express.Router();
const { postCrime, getCrime, getAllCrimes, updateCrime, deleteCrime } = require('../controllers/crime');

router.post('/add', postCrime);
router.post('/get', getCrime);
router.post('/getAll', getAllCrimes);
router.post('/update', updateCrime);
router.post('/delete', deleteCrime);

module.exports = router;