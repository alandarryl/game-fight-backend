
const mongoose = require('mongoose');

const fightHistorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    CharacterUsed:{
        type: String, //id of the perso use
        required: true
    },
    opponent: {
        type: String, //id of the opponent AI ( model easy/mid/difficult ) or other user
        required: true
    },
    result: {
        type: String,
        enum: ['WIN', 'LOSS', 'DRAW'],
        required: true
    },
    turnsCount: {
        type: Number,
        default: 0
    },
    totalDamageDealt: {
        type: Number,
        default: 0
    },
    totalDamageTaken: {
        type: Number,
        default:0
    },
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('FightHistory', fightHistorySchema);

