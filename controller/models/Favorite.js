const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    id_annonce:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
});

modeul.exports = mongoose.model("Favorite", favoriteSchema);
