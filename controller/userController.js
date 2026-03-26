
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Fonction pour générer le token JWT
const generateToken = (id, role) =>{
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};





