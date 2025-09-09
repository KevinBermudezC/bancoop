import pool from "../config/database.js";

// Registrar un nuevo usuario usando la función fun_insert_usuario
export const createUser = async (
  cuenta,
  tipo,
  clave,
  dinero,
  nombre,
  apellido
) => {
  try {
    const query = `
      SELECT fun_insert_usuario($1, $2, $3, $4, $5, $6) as resultado
    `;

    const result = await pool.query(query, [
      cuenta,
      tipo,
      clave,
      dinero,
      nombre,
      apellido,
    ]);

    if (result.rows[0].resultado === 1) {
      // Si la función retorna 1, obtener los datos del usuario creado
      const userQuery =
        "SELECT cuenta, tipo, dinero, nombre, apellido FROM tab_usuario WHERE cuenta = $1";
      const userResult = await pool.query(userQuery, [cuenta]);
      return userResult.rows[0];
    } else {
      throw new Error("No se pudo insertar el usuario");
    }
  } catch (error) {
    throw error;
  }
};

// Buscar usuario por cuenta
export const getUserByAccount = async (cuenta) => {
  try {
    const query = "SELECT * FROM tab_usuario WHERE cuenta = $1";
    const result = await pool.query(query, [cuenta]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Verificar credenciales de login
export const verifyLogin = async (cuenta, clave) => {
  try {
    const query = "SELECT * FROM tab_usuario WHERE cuenta = $1 AND clave = $2";
    const result = await pool.query(query, [cuenta, clave]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Obtener todos los usuarios (para testing)
export const getAllUsers = async () => {
  try {
    const query =
      "SELECT id, cuenta, tipo, nombre, apellido, created_at FROM tab_usuario";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
