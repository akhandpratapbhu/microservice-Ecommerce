const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

let cart = [];

app.post('/cart', (req, res) => {
  cart.push(req.body);
  res.json({ message: 'Item added to cart', cart });
});

app.get('/cart', (req, res) => {
  res.json(cart);
});

app.listen(3003, () => console.log('Shopping Service running on port 3003'));
