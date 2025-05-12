const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Safe to use, as multer handles form-data separately
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// DB Connection
mongoose.connect('mongodb://localhost:27017/productdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Category Schema and Model
const CategorySchema = new mongoose.Schema({
  name: String,
  image: String, // store image filename or path
});

const Category = mongoose.model('Category', CategorySchema);

// Product Schema and Model
const ProductSchema = new mongoose.Schema({
  name: String,
  image:String,
  price: Number,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});

const Product = mongoose.model('Product', ProductSchema);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // make sure this folder exists
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

/* ---------- ROUTES ---------- */

// Get all categories
app.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Add a category with image
app.post('/categories', upload.single('image'), async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);

    const { name } = req.body;
    const image = req.file?.filename;

    const category = new Category({ name, image });
    await category.save();
    res.json(category);
  } catch (error) {
  console.error('Failed to add category:', error.message); // Log message only
  console.error(error); // Log full error object
  res.status(500).json({ message: 'Failed to add category', error: error.message });
}
});

// Add a product
app.post('/products',upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const image = req.file?.filename;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).send('Invalid category');
    }

    const product = new Product({
      name,
      image,
      price,
      description,
      category: category._id,
    });

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product', error });
  }
});

// Get products by category ID
app.get('/products/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await Product.find({ category: categoryId }).populate('category');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Start Server
app.listen(3001, () => console.log('Product Service running on port 3001'));
