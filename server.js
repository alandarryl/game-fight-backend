

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');

//all routes
const userRoutes = require('./routes/authRoutes');
const characterRoutes = require('./routes/characterRoutes');

//get the env variable
dotenv.config();

//connect to MongoDB
connectDb();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());


//definition des route

//book api
app.use('/api/character', characterRoutes);
//user api
app.use('/api/user', userRoutes);

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
