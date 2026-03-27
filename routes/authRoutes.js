
const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', protect, (req, res) =>{
    res.json({message: "Accès autorisé", user: req.user });
});


module.exports = router;

