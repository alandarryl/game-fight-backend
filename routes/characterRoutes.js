
const express = require('express');
const router = express.Router();

const {
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacters,
    toggleCharacterStatus
} = require('../controller/characterController');

const {protect, isAdmin} = require('../middleware/authMiddleware');

//access by all user 

router.get('/All', protect, getCharacters);

//only by admin
router.post('/create', protect, isAdmin, createCharacter);
router.put('/update/:id', protect, isAdmin, updateCharacter);
router.patch('/:id/status', protect, isAdmin, toggleCharacterStatus);


module.exports = router;



