const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
