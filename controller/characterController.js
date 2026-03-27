
const Character = require('../models/Character');

//create a character
const createCharacter = async (req, res) =>{
    try {
        
        const {name, avatar, strength, stamina, defense, speed, mana, technique} = req.body;

        //technique validation
        if(!technique || technique.length !== 4){
            return res.status(400).json({message: "Un personnage doit avoir exactement 4 compétences"});
        }

        const character = await Character.create({
            name,
            avatar,
            strength,
            stamina,
            defense,
            speed,
            mana,
            technique
        });

        res.status(201).json(character);

    } catch (error) {
        res.status(500).json({message: "erreur lors de la creation", error: message.error })
    }
}

const updateCharacter = async (req, res) =>{
    try {
        const updateCharacter = await Character.findByIdAndUpdate(
            req.params.is,
            req.body,
            {new: true}
        );

        res.json(updateCharacter);

    } catch (error) {
        res.status(500).json({message: "erreur lors de la connection", error: message.error });
    }
}

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

const getCharacters = async (req, res) =>{
    try {
        const filter = req.user.role === 'ADMIN' ? {} : {isActive: true};
        const characters = await Character.find(filter);

        res.json(characters);

    } catch (error) {
        res.status(500).json({message: "Erreur serveur lors de la recuperation"});
    }
}

const deleteCharacter = async (req, res) =>{
    try {

        const deleteCharacter = await Character.findById(params.id);

        if(!deleteCharacter){
            return res.status(404).json({message: "character not found"});
        }

        const deletedCharacter =  await Character.findByIdAndDelete(params.id);

        res.status(201).json({message: "supression reussite"});
        
    } catch (error) {
        res.status(500).json({message: "Erreur serveur lors de la suppression"});
    }
}



module.exports = {
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getCharacters,
    toggleCharacterStatus
}

