const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./db'); // ✅ Must match the export
const cors = require('cors');

const { createOrder,getAllOrders,updateOrderStatus,getOrderById } = require('./orderController');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Call initDB() at startup to create tables
initDB()
  .then(() => {
    console.log(' Database initialized');
  })
  .catch(err => {
    console.error('❌ DB Init Error:', err);
  });

app.post('/api/orders', (req, res, next) => {
  console.log('/api/orders hit');
  next();
}, createOrder);

app.get('/api/orders', getAllOrders); 
app.get('/api/orders/:order_id', getOrderById); 
app.put('/api/orders/:order_id/status', updateOrderStatus);
app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
