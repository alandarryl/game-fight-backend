

const express = require('express');

const router = express.Router();

const {
        createBook,
        getAllBook,
        getOneBook,
        getUserBooks,
        updateBook,
        deleteBook
} = require('../controller/bookController');


//route to get all book

router.route('/All').get(getAllBook);

//route create a book
router.route("/create").post(createBook);

//route get one book
router.route("/getOne/:id").get(getOneBook);

//route to update
router.route("/update").put(updateBook);

//route to delete
router.route("/delete").delete(deleteBook);

// Route pour le profil d'un utilisateur
router.get('/user/:userId', getUserBooks);

module.exports = router



