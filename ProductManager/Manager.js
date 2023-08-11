const express = require('express');
const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.nextId = 1;
    this.path = filePath;
    this.loadFromFile();
  }

  async addProduct(userInput) {
    const { title, description, price, thumbnail, stock } = userInput;

    // if (!this.areAllFieldsValid(title, description, price, thumbnail, stock)) {
    //   throw new Error("Error: Todos los campos del producto son obligatorios.");
    // }

    const product = {
      title,
      description,
      price,
      thumbnail,
      stock,
      code: this.nextId++,
    };

    this.products.push(product);
    await this.saveToFile();
    console.log("Producto agregado correctamente.");
  }

  async updateProduct(id, field, value) {
    const product = this.products.find(p => p.code === id);

    if (!product) {
      throw new Error(`Error: Producto con código ${id} no encontrado.`);
    }

    if (!(field in product)) {
      throw new Error(`Error: El campo "${field}" no es válido.`);
    }

    product[field] = value;
    await this.saveToFile();
    console.log(`Producto con código ${id} actualizado correctamente.`);
  }

  async deleteProduct(id) {
    const index = this.products.findIndex(p => p.code === id);

    if (index === -1) {
      throw new Error(`Error: Producto con código ${id} no encontrado.`);
    }

    this.products.splice(index, 1);
    await this.saveToFile();
    console.log(`Producto con código ${id} eliminado correctamente.`);
  }

  async loadFromFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.products = JSON.parse(data);
      this.nextId = Math.max(...this.products.map(p => p.code)) + 1;
    } catch (error) {
      this.nextId = 1;
    }
  }

  async saveToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, data, 'utf-8');
    } catch (error) {
      console.error("Error al guardar los datos en el archivo.");
    }
  }

  async getProducts(limit) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);

      if (limit) {
        return products.slice(0, parseInt(limit));
      } else {
        return products;
      }
    } catch (error) {
      console.error('Error al leer el archivo products.json:', error);
      throw new Error('Error interno del servidor');
    }
  }

  async getProductById(id) {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find(p => p.code === id);

      if (product) {
        return product;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error('Error al leer el archivo products.json:', error);
      throw new Error('Error interno del servidor');
    }
  }

  async startServer(port) {
    const app = express();

    app.get('/products', async (req, res) => {
      const { limit } = req.query;

      try {
        const products = await this.getProducts(limit);
        res.json(products);
      } catch (error) {
        res.status(500).send(error.message);
      }
    });

    app.get('/products/:pid', async (req, res) => {
      const productId = parseInt(req.params.pid);

      try {
        const product = await this.getProductById(productId);
        res.json(product);
      } catch (error) {
        res.status(404).send(error.message);
      }
    });

    app.listen(port, () => {
      console.log(`Servidor en línea en http://localhost:${port}`);
    });
  }
}

// Ejemplo de uso:
const filePath = '/products.json';
const productManager = new ProductManager(filePath);

productManager.startServer(3000);


productManager.addProduct("Producto 1", "Descripción del Producto 1", 50.0, "thumbnail1.jpg", 10);
productManager.addProduct("Producto 2", "Descripción del Producto 2", 30.0, "thumbnail2.jpg", 5);
productManager.addProduct("Producto 3", "Descripción del Producto 3", 20.0, "thumbnail3.jpg", 15);

console.log("Todos los productos:", productManager.getProducts());

productManager.updateProduct(2, "price", 40.0);
productManager.updateProduct(3, "stock", 20);

console.log("Producto por ID (código 1):", productManager.getProductById(1));
productManager.deleteProduct(1);

console.log("Todos los productos:", productManager.getProducts());

console.log("Producto por ID (código 2):", productManager.getProductById(2));
console.log("Producto por ID (código 3):", productManager.getProductById(3));
console.log("Producto por ID (código 4):", productManager.getProductById(4)); //Test de error producto inexistente

