import express from 'express';
import { config } from './src/configs/config.js';
import { connect } from './src/configs/mongo.config.js';
import mainRouter from './src/routes/main.route.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', mainRouter);


const PORT = config.port

connect();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
