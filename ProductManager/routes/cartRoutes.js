const express = require('express');
const router = express.Router();

const carts = [];

router.post('/', (req, res) => {
  const newCart = { id: carts.length + 1, products: [] };
  carts.push(newCart);
  res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  const cart = carts.find(cart => cart.id === cartId);
  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }

  cart.products.push({ id: productId });
  res.status(200).json(cart);
});

router.get('/:cid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find(cart => cart.id === cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

module.exports = router;
