const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();

// Sirve los archivos estáticos desde la carpeta dist
app.use(serveStatic(path.join(__dirname, 'dist')));

// Maneja las rutas del lado del cliente, devolviendo index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log('La app está escuchando en el puerto: ' + port);

