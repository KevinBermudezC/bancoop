import { Router } from 'express';
import { signIn, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signin', signIn);

authRouter.post('/signup', signUp);

export default authRouter;