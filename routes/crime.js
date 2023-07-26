const express = require('express');
const router = express.Router();
const { postCrime, getCrime, getAllCrimes, updateCrime, deleteCrime } = require('../controllers/crime');

router.post('/add', postCrime);
router.get('/get', getCrime);
router.get('/getAll', getAllCrimes);
router.put('/update', updateCrime);
router.delete('/delete', deleteCrime);

module.exports = router;