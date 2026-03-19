

const Book = require('../models/Book');

//create a book 
const createBook = async (req,res) =>{
    try {
        const {titre, description, annonce_image, date_publication, auteur, nb_exemplaire, id_user} = req.body;

        // Validation simple
        if (!titre || !description || !auteur || !id_user) {
            return res.status(400).json({ message: "Merci de remplir tous les champs obligatoires (titre, desc, auteur, id_user)" });
        }

        const newBook = new Book({
            titre,
            description,
            annonce_image,
            auteur,
            nb_exemplaire,
            id_user // L'ID de l'utilisateur qui poste l'annonce
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (error) {
        console.log({message: error.message});
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}


//get all book 
const getAllBook = async (req, res) =>{
    try {

        //get the parameter sort in the url : /api/books?sort=oldest
        const sortOrder = req.query.sort === 'oldest' ? 1 : -1;

        const books = await Book.find()
                .populate('id_user', 'username email')
                .sort({createAt: sortOrder}); // -1 = recent, 1 = oldest

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}


//get one book
const getOneBook = async (req,res) =>{
    try{

        const book = await Book.findById(req.params.id).populate('id_user', 'pseudo email');

        if (!book) {
            return res.status(404).json({ message: "Le livre n'a pas été trouvé" });
        }

        res.status(200).json(book);

    }catch(error){
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}

//delet one book (only allow by the user)
const deleteBook = async (req, res ) =>{
    try{
        //
        const book = await Book.findById(req.params.id);

        if(!book) return res.status(404).json({message: "Livre non trouvé"});

        //check the property
        if(book.id_user.toString() !== req.user._id.toString() ){
            return res.status(401).json({message: "Non authorisé a supprimer ce livre"});
        }

        await book.deleteOne();

        res.status(200).json({message: "Livre supprimé avec succès"});


    }catch(error){
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}


//update one book (only the user can do that)
const updateBook = async (req, res ) =>{
    try{
        //
        let book = await Book.findById(req.params.id);

        if(!book) return res.status(404).json({message: "Livre non trouvé"});

        //check if user is the owner of the book
        if(book.id_user.toString() !== req.user._id.toString() ){
            return res.status(401).json({message: "Non autorisé a modifier ce livre"})
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).json(book);

    }catch(error){
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}


//get all book publish by one user
const getUserBooks = async (req, res ) =>{
    try{
        //

        const books = await Book.find({id_user: req.params.userId}).sort({createAt: -1});

        res.status(200).json(books); 

    }catch(error){
        res.status(500).json({message: `Erreur serveur ${error} `});
    }
}

//order by the recent one


//modify only one info with put


module.exports = {
    createBook,
    getAllBook,
    getOneBook,
    getUserBooks,
    updateBook,
    deleteBook
};
