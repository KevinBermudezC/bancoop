import pool from '../config/database.js';

// Registrar un nuevo usuario
export const createUser = async (cuenta, tipo, clave, dinero, nombre, apellido) => {
  try {
    const query = `
      INSERT INTO tab_usuario (cuenta, tipo, clave, dinero, nombre, apellido)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING cuenta, tipo,dinero, nombre, apellido
    `;
    
    const result = await pool.query(query, [cuenta, tipo, clave, dinero, nombre, apellido]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Buscar usuario por cuenta
export const getUserByAccount = async (cuenta) => {
  try {
    const query = 'SELECT * FROM tab_usuario WHERE cuenta = $1';
    const result = await pool.query(query, [cuenta]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Verificar credenciales de login
export const verifyLogin = async (cuenta, clave) => {
  try {
    const query = 'SELECT * FROM tab_usuario WHERE cuenta = $1 AND clave = $2';
    const result = await pool.query(query, [cuenta, clave]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Obtener todos los usuarios (para testing)
export const getAllUsers = async () => {
  try {
    const query = 'SELECT id, cuenta, tipo, nombre, apellido, created_at FROM tab_usuario';
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
