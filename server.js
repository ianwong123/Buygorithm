import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: 'Database connection successful!' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});


// Authentication middleware
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Please login first' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const [user] = await pool.query(
      'SELECT * FROM users WHERE user_id = ?',
      [decoded.userId]
    );
    
    if (!user.length) {
      return res.status(401).json({ error: 'Unauthorized - User not found' });
    }
    
    req.user = user[0]; // Attach user to request
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};




// Products routes
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, 
             pi.image_url as primary_image 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE
    `);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/user/products', authenticate, async (req, res) => {
  try {
    const [products] = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.category_id
       WHERE p.seller_id = ?`,
      [req.user.user_id]
    );
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching user products:', error);
    res.status(500).json({ error: 'Failed to fetch your products' });
  }
});

// Get products by category
app.get('/api/products/category/:categoryName', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.name as category_name, 
             pi.image_url as primary_image 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = TRUE
      WHERE c.name = ?
    `, [req.params.categoryName]);
    
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Failed to fetch products by category' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    // Get product details
    const [product] = await pool.query(`
      SELECT p.*, c.name as category_name, u.username as seller_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.category_id
      LEFT JOIN users u ON p.seller_id = u.user_id
      WHERE p.product_id = ?
    `, [req.params.id]);
    
    if (product.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Get all product images
    const [images] = await pool.query(`
      SELECT * FROM product_images
      WHERE product_id = ?
      ORDER BY is_primary DESC
    `, [req.params.id]);
    
    const productData = {
      ...product[0],
      images: images.map(img => img.image_url)
    };
    
    res.json(productData);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});



// Add new product
app.post('/api/products', authenticate, async (req, res) => {
  try {
    const { 
      title, 
      item_description, 
      item_condition, 
      price, 
      quantity, 
      category, 
      images 
    } = req.body;
    
    const seller_id = req.user.user_id;

    // We need to authenticate seller_id from the request
    if (!seller_id) {
      return res.status(400).json({ error: 'Seller ID is required' });
    }
    
    // Find category_id from category name
    const [categoryResult] = await pool.query(
      'SELECT category_id FROM categories WHERE name = ?',
      [category]
    );
    
    if (categoryResult.length === 0) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const category_id = categoryResult[0].category_id;
    
    // Insert product
    const [result] = await pool.query(
      `INSERT INTO products 
      (seller_id, category_id, title, item_description, item_condition, price, quantity) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [seller_id, category_id, title, item_description, item_condition, price, quantity]
    );
    
    const productId = result.insertId;
    
    // Insert images
    if (images && images.length > 0) {
      const imageValues = images.map((url, index) => [productId, url, index === 0]);
      await pool.query(
        'INSERT INTO product_images (product_id, image_url, is_primary) VALUES ?',
        [imageValues]
      );
    }
    
    res.status(201).json({ 
      message: 'Product created successfully', 
      productId 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});


// Add categories endpoint
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});


// Sign up
app.post('/api/signup', async (req, res) => {
  const { username, email, phone, password, full_name, address } = req.body;

  try {
    const [existingUser] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const [result] = await pool.query(
      `INSERT INTO users 
       (username, email, password_hash, full_name, phone, address, role) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        email,
        password, // Still plain text - add hashing later
        full_name,
        phone,
        address,
        'buyer' // Default role
      ]
    );

    res.status(201).json({ 
      message: 'User created successfully', 
      userId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      error: 'Failed to create user',
      details: error.message 
    });
  }
});

// Login route - fixed version
app.post('/api/login', async (req, res) => {
  console.log('Login request received:', req.body);
  
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Missing credentials');
    return res.status(400).json({ 
      success: false,
      message: 'Username and password are required' 
    });
  }

  try {
    console.log('Querying database for:', username);
    const [user] = await pool.query(
      'SELECT * FROM users WHERE email = ? OR username = ?',
      [username, username]
    );

    console.log('Database returned:', user);

    if (user.length === 0) {
      console.log('No user found for:', username);
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Temporary password comparison (replace with bcrypt in production)
    if (user[0].password_hash !== password) {
      console.log('Password mismatch for user:', user[0].username);
      return res.status(401).json({ 
        success: false,
        message: 'Incorrect password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user[0].user_id, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );

    console.log('Successful login for:', user[0].username);
    res.json({ 
      success: true,
      message: 'Login successful', 
      token,
      user: { 
        id: user[0].user_id, 
        username: user[0].username,
        email: user[0].email,
        role: user[0].role
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

