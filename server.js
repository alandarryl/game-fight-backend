

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');

//all routes
const userRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');
const historyRoutes = require('./routes/historyRoutes');

//get the env variable
dotenv.config();

//connect to MongoDB
connectDb();

const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:3000', // L'adresse précise de ton Next.js
    credentials: true,               // OBLIGATOIRE pour les cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use(cookieParser());


//definition des route

//book api
app.use('/api/character', characterRoutes);
//user api
app.use('/api/user', userRoutes);
//history api
app.use('/api/history', historyRoutes);

//test route
app.get('/', (req, res) =>{
    res.send("API Game Fight en ligne ...");
});

//if route note found
app.use((req, res) =>{
    res.status(404).json({message: "Route non trouvré"});
})

//run the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`The server is running on : http://localhost:${PORT}`);
});
