const express = require('express');
const fs = require('fs');
const router = express.Router();

const PRODUCTS_FILE = './productos.json';

function readProductsFile() {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeProductsFile(products) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
}

router.get('/', (req, res) => {
  const products = readProductsFile();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const products = readProductsFile();
  const productId = parseInt(req.params.pid);
  const product = products.find(prod => prod.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const products = readProductsFile();
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  writeProductsFile(products);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
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

module.exports = router;
