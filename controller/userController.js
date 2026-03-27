
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Fonction pour générer le token JWT
const generateToken = (id, role) =>{
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

//enregistrer un nouvel user
const register = async (req, res) =>{
    try {
        const {username, email, password, image_profil } = req.body;

        //check if user exist
        const userExist = await User.findOne({ $or: [{email}, {username} ] });
        if(userExist){
            return res.status(400).json({message: "Le l'email et le pseudo ne sont pas disponible" });
        }

        //create a user
        const user = await User.create({
            username,
            email,
            password,
            image_profil: image_profil || default_user.png
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        }

    } catch (error) {
        res.status(500).json({message: "erreur serveur lors de l'inscription", error: error.message });
    }
}


//authentification du user et get token
const login = async (req, res) =>{
    try {
        const {email, password} = req.body;

        //find user 
        const user = await User.findOne({email});

        //check if password match
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else{
            res.status(401).json({message: "Email ou mot de passe incorrect" });
        }

    } catch (error) {
        res.status(500).json({message: "erreur serveur lors de la connection", error: error.message });
    }
}

module.exports = {
    register,
    login
};
