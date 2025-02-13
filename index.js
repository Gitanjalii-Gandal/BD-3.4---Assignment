const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

// Cart Data
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// 1: Add an Item to the Cart
app.get('/cart/add', (req, res) => {
  const { productId, name, price, quantity } = req.query;
  const newItem = {
    productId: parseInt(productId),
    name,
    price: parseFloat(price),
    quantity: parseInt(quantity),
  };
  cart.push(newItem);
  res.json({ cartItems: cart });
});

//  2: Edit Quantity of an Item in the Cart
app.get('/cart/edit', (req, res) => {
  const { productId, quantity } = req.query;
  const prodId = parseInt(productId);
  const newQuantity = parseInt(quantity);

  for (let item of cart) {
    if (item.productId === prodId) {
      item.quantity = newQuantity;
      break;
    }
  }
  res.json({ cartItems: cart });
});

// Endpoint 3: Delete an Item from the Cart
app.get('/cart/delete', (req, res) => {
  const { productId } = req.query;
  const prodId = parseInt(productId);
  cart = cart.filter((item) => item.productId !== prodId);
  res.json({ cartItems: cart });
});

// Endpoint 4: Read Items in the Cart
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

// Endpoint 5: Calculate Total Quantity of Items in the Cart
app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  res.json({ totalQuantity });
});

// Endpoint 6: Calculate Total Price of Items in the Cart
app.get('/cart/total-price', (req, res) => {
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  res.json({ totalPrice });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
