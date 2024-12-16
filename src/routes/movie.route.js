import { Router } from 'express';
import *as movieController from '../controllers/movie.controller.js';

const movieRouter = Router();

movieRouter.post('/create', movieController.createMovie);
movieRouter.put('/addActor', movieController.addActorToMovie);

export default movieRouter;