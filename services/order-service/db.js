const mysql = require('mysql2/promise');

let connection;

async function initDB() {
  if (!connection) {
    // Step 1: connect without database
    const tempConn = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root'
    });

    // Step 2: create the database if not exists
    await tempConn.query('CREATE DATABASE IF NOT EXISTS `microservices-Eccomerse`');
    await tempConn.end();

    // Step 3: now connect to the database
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'microservices-Eccomerse'
    });

    // Step 4: create tables
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        status ENUM('Placed', 'Pending', 'Shipped','Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Placed',
        total_amount DECIMAL(10, 2) NOT NULL,
        shipping_address TEXT,
        billing_address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS order_items (
        item_id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
      );
    `);
  }

  return connection;
}

module.exports = { initDB };
