const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = 8080;

app.use(bodyParser.json()); // Middleware para analizar el cuerpo de las solicitudes en formato JSON

app.use('/products', productRoutes); // Montamos las rutas de productos bajo /products
app.use('/carts', cartRoutes); // Montamos las rutas de carritos bajo /carts

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
