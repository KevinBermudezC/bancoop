import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';

const authRouter = Router();

// Rutas de autenticación
authRouter.post('/login', login);
authRouter.post('/register', register);

export default authRouter;