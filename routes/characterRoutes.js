
const express = require('express');
const router = express.Router();

const {
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacters,
    toggleCharacterStatus,
    getCharacterById
} = require('../controller/characterController');

const {protect, isAdmin} = require('../middleware/authMiddleware');

//access by all user 

router.get('/All', protect, getCharacters);

//get one character
router.get('/:id', protect, getCharacterById);

//only by admin
router.post('/create', protect, isAdmin, createCharacter);
router.put('/update/:id', protect, isAdmin, updateCharacter);
router.patch('/:id/status', protect, isAdmin, toggleCharacterStatus);


module.exports = router;



