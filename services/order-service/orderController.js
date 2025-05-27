const { initDB } = require('./db');

const createOrder = async (req, res) => {
  const { customer_id, shipping_address, billing_address, items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Items are required' });
  }

  try {
    const db = await initDB(); // ✅ Get the db connection
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const [orderResult] = await db.execute(
      `INSERT INTO orders (customer_id, total_amount, shipping_address, billing_address)
       VALUES (?, ?, ?, ?)`,
      [customer_id, totalAmount, shipping_address, billing_address]
    );

    const orderId = orderResult.insertId;

    const itemInserts = items.map(item => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price)
       VALUES ?`,
      [itemInserts]
    );

    res.status(201).json({ order_id: orderId, message: 'Order created successfully' });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

module.exports = { createOrder };
