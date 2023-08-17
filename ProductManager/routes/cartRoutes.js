const express = require('express');
const fs = require('fs');
const router = express.Router();

const CARTS_FILE = './carts.json';

function readCartsFile() {
  if (!fs.existsSync(CARTS_FILE)) {
    fs.writeFileSync(CARTS_FILE, '[]', 'utf8');
  }
  const data = fs.readFileSync(CARTS_FILE, 'utf8');
  return JSON.parse(data);
}

function writeCartsFile(carts) {
  fs.writeFileSync(CARTS_FILE, JSON.stringify(carts, null, 2), 'utf8');
}

router.post('/', (req, res) => {
  const newCart = { id: Date.now(), products: [] };
  const carts = readCartsFile();
  carts.push(newCart);
  writeCartsFile(carts);
  res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const carts = readCartsFile();
  const cart = carts.find(cart => cart.id === cartId);

  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  const productIndex = cart.products.findIndex(prod => prod.id === productId);

  if (productIndex !== -1) {
    cart.products[productIndex].quantity += 1;
  } else {
    cart.products.push({ id: productId, quantity: 1 });
  }

  writeCartsFile(carts);
  res.status(200).json(cart);
});

router.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const carts = readCartsFile();
  const cart = carts.find(cart => cart.id === cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

module.exports = router;
