
const mongoose = require('mongoose');

const techniqueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    manaCost: {
        type:Number,
        required: true
    },
    power: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        enum: ['attack', 'buff', 'debuff', 'defense', 'heal', 'combo'],
        default: 'attack'
    }
})

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    strength: {
        type: Number,
        dafault: 100
    },
    stamina: {
        type: Number,
        default: 1000
    },
    defense: {
        type: Number,
        default: 50
    },
    speed: {
        type: Number,
        default: 10
    },
    mana: {
        type: Number,
        default: 100
    },
    technique: [techniqueSchema],
    isActive: {
        type: Boolean, 
        default: true
    }
});

module.exports = mongoose.model('Character', characterSchema);

