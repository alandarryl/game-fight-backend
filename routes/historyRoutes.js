const express = require('express');
const router = express.Router();
const { saveFightRecord, getUserHistory } = require('../controller/historyController');
const { protect } = require('../middleware/authMiddleware');

router.post('/save', protect, saveFightRecord);
router.get('/myHistory', protect, getUserHistory);

module.exports = router;