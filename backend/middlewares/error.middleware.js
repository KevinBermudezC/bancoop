import express from 'express';

const errorMiddleware = express();
// Middleware para manejar rutas no encontradas
errorMiddleware.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    message: `La ruta ${req.originalUrl} no existe`
  });
});
  
// Middleware para manejo de errores
errorMiddleware.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: 'Algo salió mal en el servidor'
  });
});

export default errorMiddleware;