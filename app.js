import express from 'express';
import { config } from './src/configs/config.js';
import { connect } from './src/configs/mongo.config.js';
import mainRouter from './src/routes/main.route.js';
import { errorHandler } from './src/errors/errorHanddler.error.js';
import cors from 'cors';
import multer from 'multer';

const upload = multer();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());

app.use('/api', mainRouter);
app.use(errorHandler);



const PORT = config.port

connect();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
