import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.controller.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido al servidor de Sena Banco!',
    status: 'OK'
  });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;
