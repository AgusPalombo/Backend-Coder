const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productsRoutes'); //express route de productos
const cartRoutes = require('./routes/cartRoutes'); //express route de carritos
const socketIO = require('socket.io');
const handlebars = require('handlebars');

const app = express();
const PORT = 8080;

//---------------------------------------------------------------------------------------

app.use(bodyParser.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON

app.use('/products', productRoutes); // Montamos las rutas de productos bajo /products
app.use('/carts', cartRoutes); // Montamos las rutas de carritos bajo /carts

//---------------------------------------------------------------------------------------


// Configurar Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Configuración de directorios
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'routes')));

// Función para leer el archivo JSON de productos
function readProductsFile() {
  const rawData = fs.readFileSync('products.json');
  return JSON.parse(rawData);
}

// Función para escribir en el archivo JSON de productos
function writeProductsFile(products) {
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
}

// Ruta principal: Renderiza la vista "home" con la lista de productos
app.get('/', (req, res) => {
  res.render('home', { products: readProductsFile() });
});

// Configurar WebSocket
io.on('connection', socket => {
  console.log('Cliente conectado');

  // Evento para crear un nuevo producto
  socket.on('crearProducto', producto => {
    const productos = readProductsFile();
    productos.push(producto);
    writeProductsFile(productos);
    io.emit('productosActualizados', productos);
  });

  // Evento para actualizar un producto existente
  socket.on('actualizarProducto', productoActualizado => {
    const productos = readProductsFile();
    const index = productos.findIndex(p => p.id === productoActualizado.id);
    if (index !== -1) {
      productos[index] = productoActualizado;
      writeProductsFile(productos);
      io.emit('productosActualizados', productos);
    }
  });

  // Evento para eliminar un producto
  socket.on('eliminarProducto', productoId => {
    const productos = readProductsFile();
    const index = productos.findIndex(p => p.id === productoId);
    if (index !== -1) {
      productos.splice(index, 1);
      writeProductsFile(productos);
      io.emit('productosActualizados', productos);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
