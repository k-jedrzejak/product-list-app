import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define paths as variables
const DIST_PATH = path.join(__dirname, '../dist');
const PRODUCTS_FILE_PATH = path.join(__dirname, '../src/data/products.json');

console.log(`Serving static files from ${DIST_PATH}`);
app.use(express.static(DIST_PATH));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Helper function to read and parse JSON file
const readJsonFile = async (filePath) => {
  const rawData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(rawData);
};

// Helper function to get products with IDs
const getProductsWithIds = (products) => {
  if (!Array.isArray(products)) {
    throw new Error('The data from the JSON file is not in a regulated format');
  }
  return products.map((product, index) => ({
    ...product,
    id: (index + 1).toString(),
  }));
};

// Endpoint to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const { products } = await readJsonFile(PRODUCTS_FILE_PATH);
    const productsWithIds = getProductsWithIds(products);
    res.json(productsWithIds);
  } catch (error) {
    console.error('Error while downloading data:', error);
    res.status(500).json({ message: 'An error occurred while retrieving data' });
  }
});

// Endpoint to fetch a product by ID
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const { products } = await readJsonFile(PRODUCTS_FILE_PATH);
    const productsWithIds = getProductsWithIds(products);
    const product = productsWithIds.find((product) => product.id === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error downloading the product:', error);
    res.status(500).json({ message: 'Error downloading the product' });
  }
});

// Endpoint to update a product by ID
app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  try {
    const { products } = await readJsonFile(PRODUCTS_FILE_PATH);
    const productsWithIds = getProductsWithIds(products);
    const productIndex = productsWithIds.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    productsWithIds[productIndex] = { ...productsWithIds[productIndex], ...updatedProduct };
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify({ products: productsWithIds }), 'utf8');
    res.json(productsWithIds[productIndex]);
  } catch (error) {
    console.error('Error while updating the product:', error);
    res.status(500).json({ message: 'Error while updating the product' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
