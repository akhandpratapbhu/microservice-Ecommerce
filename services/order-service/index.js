const express = require('express');
const bodyParser = require('body-parser');
const { initDB } = require('./db'); // ✅ Must match the export

const { createOrder } = require('./orderController');

const app = express();
app.use(bodyParser.json());

// Call initDB() at startup to create tables
initDB()
  .then(() => {
    console.log('✅ Database initialized');
  })
  .catch(err => {
    console.error('❌ DB Init Error:', err);
  });

app.post('/api/orders', createOrder);

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
