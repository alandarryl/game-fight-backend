
const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
        titre: {
            type : String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        annonce_image: {
            type: String
        },
        date_publication: {
            type: Date,
            default: Date.now
        },
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        auteur: {
            type: String,
            required: true
        },
        nb_exemplaire: {
            type: Number,
            default: 1
        },
    }
);

module.exports = mongoose.model("Book", bookSchema);

