const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const hdbl = require('handlebars')
const path = require('path');
const manager = require('./manager'); // Importamos el archivo manager.js

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Configura el motor de plantillas Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la vista home que muestra la lista de productos
app.get('/', (req, res) => {
  res.render('home', { products: manager.getProducts() });
});

// Manejo de eventos de WebSocket para productos
io.on('connection', socket => {
  console.log('Cliente conectado');

  socket.on('crearProducto', producto => {
    manager.createProduct(producto);
    io.emit('productosActualizados', manager.getProducts());
  });

  socket.on('actualizarProducto', productoActualizado => {
    manager.updateProduct(productoActualizado);
    io.emit('productosActualizados', manager.getProducts());
  });

  socket.on('eliminarProducto', productoId => {
    manager.deleteProduct(productoId);
    io.emit('productosActualizados', manager.getProducts());
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
