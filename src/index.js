import app from './app';

import './database/db'
import './database/models/Video';
import './database/models/University'; 
import './database/models/Board'; 

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;

const handleListening = () => {
    console.log(`Listening on : ${PORT}`);
};

app.listen(PORT, handleListening);