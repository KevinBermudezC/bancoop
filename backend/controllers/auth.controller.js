import { createUser, getUserByAccount, verifyLogin } from '../db/userQueries.js';
import bcrypt from 'bcryptjs';

// Registrar nuevo usuario
export const register = async (req, res) => {
  try {
    const { cuenta, tipo, clave, dinero, nombre, apellido } = req.body;

    // Validar datos requeridos
    if (!cuenta || !tipo || !clave || !dinero || !nombre || !apellido) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await getUserByAccount(cuenta);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya existe'
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(clave, 10);

    // Crear usuario
    const newUser = await createUser(cuenta, tipo, hashedPassword, dinero, nombre, apellido);

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        cuenta: newUser.cuenta,
        tipo: newUser.tipo,
        dinero: newUser.dinero,
        nombre: newUser.nombre,
        apellido: newUser.apellido
      }
    });

  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { cuenta, clave } = req.body;

    // Validar datos requeridos
    if (!cuenta || !clave) {
      return res.status(400).json({
        success: false,
        message: 'Cuenta y clave son requeridos'
      });
    }

    // Buscar usuario
    const user = await getUserByAccount(cuenta);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(clave, user.clave);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        id: user.id,
        cuenta: user.cuenta,
        tipo: user.tipo,
        nombre: user.nombre,
        apellido: user.apellido
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
};
