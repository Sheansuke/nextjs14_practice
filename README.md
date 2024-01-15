const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Configurar Express para servir archivos estáticos desde la carpeta ./build
  server.use('/_next', express.static(path.join(__dirname, '.next')));

  // Manejar todas las solicitudes con Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Iniciar el servidor
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});