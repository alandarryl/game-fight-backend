const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction pour générer le token JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

// Enregistrer un nouvel user
const register = async (req, res) => {
    try {
        const { username, email, password, image_profil } = req.body;

        // 1. Check si l'user existe
        const userExist = await User.findOne({ $or: [{ email }, { username }] });
        if (userExist) {
            return res.status(400).json({ message: "L'email ou le pseudo est déjà utilisé" });
        }

        // 2. Créer l'user
        const user = await User.create({
            username,
            email,
            password,
            // CORRECTION ICI : Ajout des guillemets
            image_profil: image_profil || "default_user.png" 
        });

        if (user) {
            const token = generateToken(user._id, user.role);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict', 
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: token 
            });
        }
    } catch (error) {
        // En cas d'erreur, on log l'erreur exacte dans la console du serveur
        console.error("Erreur Inscription:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de l'inscription", 
            error: error.message 
        });
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
            const token = generateToken(user._id, user.role);

            //add cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSize: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
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
