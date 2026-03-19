

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) =>{
    let token;


    //
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //get the header token
            token = req.headers.authorization.split(' ')[1];

            //decode the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get the db 
            req.user = await User.findById(decoded.id).select('-password');

            next();
        }catch(error){
            //
            res.status(401).json({message: "Non authorisé, token invalide"});
        }
    }

    if(!token){
        res.status(401).json({message: "Non authorisé, aucun token fourni"});
    }

}

module.exports = {protect};
