
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your password',
  database: 'BuygorithmdB'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

const allTables = [
    'users',
    'categories',
    'products',
    'product_images',
    'product_reviews',
    'auctions',
    'bids',
    'carts',
    'cart_items',
    'orders',
    'order_items',
    'loyalty_points',
    'loyalty_transactions',
    'newsletter_subscribers'
  ];

allTables.forEach(table => {
    app.get(`/${table}`, (req, res) => {
      db.query(`SELECT * FROM ??`, [table], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
      });
    });
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
