const { initDB } = require('./db');

const createOrder = async (req, res) => {
  const { customer_id, shipping_address, billing_address, items } = req.body;

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Items are required' });
  }
console.log(req.body);

  try {
    const db = await initDB(); // ✅ Get the db connection
    const totalAmount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    const [orderResult] = await db.execute(
      `INSERT INTO orders (customer_id, total_amount, shipping_address, billing_address)
       VALUES (?, ?, ?, ?)`,
      [customer_id, totalAmount, shipping_address, billing_address]
    );

    const orderId = orderResult.insertId;
  // log
  console.log("Order ID:", orderId);
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
const getAllOrders = async (req, res) => {
  try {
    const db = await initDB();

    // Get all orders
    const [orders] = await db.execute(`
      SELECT o. order_id AS order_id, o.customer_id, o.total_amount, o.shipping_address, o.billing_address, o.created_at
      FROM orders o
      ORDER BY o.created_at DESC
    `);

    // For each order, get its items
    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const [items] = await db.execute(`
          SELECT product_id, quantity, price
          FROM order_items
          WHERE order_id = ?
        `, [order.order_id]);

        const total_quantity = items.reduce((sum, item) => sum + item.quantity, 0);

        return {
          ...order,
          total_quantity,
          items
        };
      })
    );

    res.json(ordersWithItems);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;
console.log("status",status);

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const db = await initDB();

    const [result] = await db.execute(
      'UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?',
      [status, order_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  const { order_id } = req.params;
console.log("id",order_id);

  try {
    const db = await initDB();

    const [rows] = await db.execute('SELECT * FROM orders WHERE order_id = ?', [order_id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createOrder,getAllOrders,updateOrderStatus,getOrderById };
