// API Service para conectar con el backend
class ApiService {
  constructor() {
    this.baseURL = "http://localhost:3000/api";
  }

  // Método genérico para hacer peticiones HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la petición");
      }

      return data;
    } catch (error) {
      console.error("Error en API request:", error);
      throw error;
    }
  }

  // Login de usuario
  async login(cuenta, clave) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ cuenta, clave }),
    });
  }

  // Registro de usuario
  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // Obtener información del usuario (para futuras funcionalidades)
  async getUserInfo(cuenta) {
    return this.request(`/auth/user/${cuenta}`, {
      method: "GET",
    });
  }
}

// Crear instancia global del servicio API
const apiService = new ApiService();

// Exportar para uso en otros archivos
window.apiService = apiService;
