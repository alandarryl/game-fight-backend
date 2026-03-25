const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Non autorisé" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Contient l'ID et le rôle (ADMIN ou PLAYER)
        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé : réservé à l'ADMIN" });
    }
};

module.exports = { protect, isAdmin };