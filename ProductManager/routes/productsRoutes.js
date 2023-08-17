const express = require('express');
const fs = require('fs');
const router = express.Router();

const PRODUCTS_FILE = './productos.json'; // Ruta al archivo JSON de productos

function readProductsFile() { // Función para leer el archivo de productos
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, '[]', 'utf8');
  }
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeProductsFile(products) { // Función para escribir en el archivo de productos
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}
router.get('/', (req, res) => { // Ruta para obtener productos con límite opcional
  const products = readProductsFile();
  res.json(products);
});

router.get('/:pid', (req, res) => { // Ruta para obtener un producto por su ID

  const products = readProductsFile();
  const productId = parseInt(req.params.pid);
  const product = products.find(prod => prod.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => { // Ruta para agregar un nuevo producto
  const products = readProductsFile();
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  writeProductsFile(products);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => { // Ruta para actualizar un producto por su ID
  const products = readProductsFile();
  const productId = parseInt(req.params.pid);
  const updatedProduct = req.body;

  const index = products.findIndex(prod => prod.id === productId);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    writeProductsFile(products);
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


router.delete('/:pid', (req, res) => { // Ruta para eliminar un producto por su ID
  const products = readProductsFile();
  const productId = parseInt(req.params.pid);

  const index = products.findIndex(prod => prod.id === productId);
  if (index !== -1) {
    products.splice(index, 1);

// Reordenamos los IDs después de eliminar un producto
  for (let i = index; i < products.length; i++) {
    products[i].id = i + 1;
  }  

    writeProductsFile(products);
    res.status(200).json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

module.exports = router;
