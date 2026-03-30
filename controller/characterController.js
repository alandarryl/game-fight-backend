
const Character = require('../models/Character');

const getCharacters = async (req, res) => {
    try {
        // Sécurité : si req.user n'est pas défini par ton middleware, on met un filtre par défaut
        const userRole = req.user ? req.user.role : 'USER'; 
        const filter = userRole === 'ADMIN' ? {} : { isActive: true };
        
        const characters = await Character.find(filter);
        res.json(characters);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

const createCharacter = async (req, res) => {
    try {
        const { name, avatar, strength, stamina, defense, speed, mana, technique } = req.body;

        if (!technique || technique.length !== 4) {
            return res.status(400).json({ message: "Un personnage doit avoir exactement 4 compétences" });
        }

        const character = await Character.create({
            name, avatar, strength, stamina, defense, speed, mana, technique
        });

        res.status(201).json(character);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création", error: error.message });
    }
};

const deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findById(req.params.id); // Ajout de req.

        if (!character) {
            return res.status(404).json({ message: "Personnage non trouvé" });
        }

        await Character.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Suppression réussie" }); // 200 est plus standard pour delete
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};

const updateCharacter = async (req, res) => {
    try {
        const updated = await Character.findByIdAndUpdate(
            req.params.id, // Correction de .is en .id
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};
const toggleCharacterStatus = async (req, res) =>{
    try {

        const character = await Character.findById(req.params.id);
        character.isActive = !character.isActive;
        await character.save();

        res.json({message : `Status mise a jour : ${character.isActive ? 'Actif' : 'Inactif' }`});
        
    } catch (error) {
        res.status(400).json({message: "Erreur de mise a jour"});
    }
}


module.exports = {
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacters,
    toggleCharacterStatus
}

