// Servidor de desarrollo simple para el frontend
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;

// MIME types
const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  // Limpiar la URL removiendo /frontend/ si existe
  let filePath = req.url;
  if (filePath.startsWith("/frontend/")) {
    filePath = filePath.replace("/frontend", "");
  }

  // Si es la raíz, servir index.html
  if (filePath === "/") {
    filePath = "/index.html";
  }

  // Construir la ruta completa del archivo
  const fullPath = path.join(__dirname, filePath);

  // Verificar si el archivo existe
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // Archivo no encontrado
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(`
        <html>
          <head><title>404 - No encontrado</title></head>
          <body>
            <h1>404 - Archivo no encontrado</h1>
            <p>El archivo <code>${filePath}</code> no existe.</p>
            <p><a href="/">Volver al inicio</a></p>
          </body>
        </html>
      `);
      return;
    }

    // Leer y servir el archivo
    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/html" });
        res.end("<h1>Error interno del servidor</h1>");
        return;
      }

      // Determinar el tipo MIME
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = mimeTypes[ext] || "application/octet-stream";

      // Configurar headers CORS
      res.writeHead(200, {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      });

      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor frontend ejecutándose en http://localhost:${PORT}`);
  console.log(`📁 Sirviendo archivos desde: ${__dirname}`);
  console.log(`🔗 Abre http://localhost:${PORT} en tu navegador`);
});
