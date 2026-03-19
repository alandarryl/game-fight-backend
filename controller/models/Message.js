
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    id_disc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discussion',
        required: true
    },
    id_expe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    lu: {
        type: String,
        enum: ['yes', 'no'],
        default: "no"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Message", messageSchema);




