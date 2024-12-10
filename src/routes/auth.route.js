import *as UserController from '../controllers/auth.controller.js';
import { Router } from 'express';

const authRouter = Router ();

authRouter.post('/register', UserController.register);

export default authRouter;



