const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customerdb',
  password: 'Admin',
  port: 5432,
});

app.get('/customers', async (req, res) => {
  const result = await pool.query('SELECT * FROM customerssignup');
  res.json(result.rows);
});

app.post('/signup', async (req, res) => {
  const { name, email ,password} = req.body;
  const result = await pool.query(
    'INSERT INTO customerssignup (name, email,password) VALUES ($1, $2,$3) RETURNING *',
    [name, email,password]
  );
  res.json(result.rows[0]);
});

app.listen(3002, () => console.log('customerssignup Service running on port 3002'));
