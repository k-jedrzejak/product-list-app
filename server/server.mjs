import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 3000;

// Endpoint to fetch all products
app.get('/api/products', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../src/data/products.json');
    const rawData = await fs.readFile(filePath, 'utf8');
    const { products } = JSON.parse(rawData);

    if (!Array.isArray(products)) {
      throw new Error('Dane z pliku JSON nie są w formacie tablicy');
    }

    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: (index + 1).toString(),
    }));

    res.json(productsWithIds);
  } catch (error) {
    console.error('Błąd przy pobieraniu danych:', error);
    res.status(500).json({ message: 'Wystąpił błąd przy pobieraniu danych' });
  }
});

// Endpoint to fetch a product by ID
app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const filePath = path.join(__dirname, '../src/data/products.json');
    const rawData = await fs.readFile(filePath, 'utf8');
    const { products } = JSON.parse(rawData);

    if (!Array.isArray(products)) {
      throw new Error('Dane z pliku JSON nie są w formacie tablicy');
    }

    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: (index + 1).toString(),
    }));

    const product = productsWithIds.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({ message: 'Produkt nie został znaleziony' });
    }

    res.json(product);
  } catch (error) {
    console.error('Błąd przy pobieraniu produktu:', error);
    res.status(500).json({ message: 'Wystąpił błąd przy pobieraniu produktu' });
  }
});

// Endpoint to update a product by ID
app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  try {
    const filePath = path.join(__dirname, '../src/data/products.json');
    const rawData = await fs.readFile(filePath, 'utf8');
    const { products } = JSON.parse(rawData);

    if (!Array.isArray(products)) {
      throw new Error('Dane z pliku JSON nie są w formacie tablicy');
    }

    const productsWithIds = products.map((product, index) => ({
      ...product,
      id: (index + 1).toString(),
    }));

    const productIndex = productsWithIds.findIndex((product) => product.id === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Produkt nie został znaleziony' });
    }

    productsWithIds[productIndex] = { ...productsWithIds[productIndex], ...updatedProduct };

    await fs.writeFile(filePath, JSON.stringify({ products: productsWithIds }), 'utf8');

    res.json(productsWithIds[productIndex]);
  } catch (error) {
    console.error('Błąd przy aktualizacji produktu:', error);
    res.status(500).json({ message: 'Wystąpił błąd przy aktualizacji produktu' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
