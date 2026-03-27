const FightHistory = require('../models/FightHistory');
const User = require('../models/User');

exports.saveFightRecord = async (req, res) => {
    try {
        const { 
            CharacterUsed, 
            opponent, 
            result, 
            turnsCount, 
            totalDamageDealt, 
            totalDamageTaken 
        } = req.body;

        const history = await FightHistory.create({
            user: req.user.id, 
            CharacterUsed,
            opponent,
            result,
            turnsCount,
            totalDamageDealt,
            totalDamageTaken
        });

        await User.findByIdAndUpdate(req.user.id, {
            $push: { history: history._id }
        });

        res.status(201).json({ message: "Combat enregistré avec succès", history });
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la sauvegarde de l'historique", error: error.message });
    }
};

exports.getUserHistory = async (req, res) => {
    try {
        const history = await FightHistory.find({ user: req.user.id }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération" });
    }
};