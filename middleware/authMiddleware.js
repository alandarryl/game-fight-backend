const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    // 1. On vérifie d'abord si le token est dans les COOKIES
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    } 
    // 2. On garde le support Authorization Header (utile pour tester sur Postman)
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Non autorisé : Token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // On attache l'id et le rôle à la requête
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide ou expiré" });
    }
};

const isAdmin = (req, res, next) => {
    // On s'assure que req.user existe et que le rôle est bien ADMIN
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé : réservé à l'ADMIN" });
    }
};

module.exports = { protect, isAdmin };