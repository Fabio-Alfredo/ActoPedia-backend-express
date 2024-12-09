import express from 'express';
import { config } from './src/configs/config.js';
import { connect } from './src/configs/mongo.config.js';

const app = express();

const PORT = config.port

connect();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
