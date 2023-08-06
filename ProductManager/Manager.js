const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.nextId = 1; // Inicializamos el contador del ID en 1
    this.path = filePath; // Ruta del archivo para persistencia
    this.loadFromFile(); // Cargamos los datos desde el archivo al inicializar
  }

  addProduct(title, description, price, thumbnail, stock) {
    if (!this.areAllFieldsValid(title, description, price, thumbnail, stock)) {
      console.error("Error: Todos los campos del producto son obligatorios.");
      return;
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      stock,
      code: this.nextId++, // Asignamos el ID autoincrementable al producto
    };

    this.products.push(product);
    this.saveToFile(); // Guardamos los datos actualizados en el archivo
    console.log("Producto agregado correctamente.");
  }

  updateProduct(id, field, value) {
    const product = this.products.find(p => p.code === id);
    if (!product) {
      console.error(`Error: Producto con código ${id} no encontrado.`);
      return;
    }

    if (!(field in product)) {
      console.error(`Error: El campo "${field}" no es válido.`);
      return;
    }

    product[field] = value;
    this.saveToFile(); // Guardamos los datos actualizados en el archivo
    console.log(`Producto con código ${id} actualizado correctamente.`);
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.code === id);
    if (index === -1) {
      console.error(`Error: Producto con código ${id} no encontrado.`);
      return;
    }

    this.products.splice(index, 1);
    this.saveToFile(); // Guardamos los datos actualizados en el archivo
    console.log(`Producto con código ${id} eliminado correctamente.`);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.code === id); // "p" refiere al producto que esta siendo utilizado o que ha sido seleccionado por ID
    if (!product) {
      console.error(`Error: Producto con código ${id} no encontrado.`);
    }
    return product;
  }

  areAllFieldsValid(title, description, price, thumbnail, stock) {
    return (
      title !== undefined &&
      description !== undefined &&
      price !== undefined &&
      thumbnail !== undefined &&
      stock !== undefined
    );
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      this.products = JSON.parse(data);
      // Obtenemos el último ID asignado para continuar la secuencia
      this.nextId = Math.max(...this.products.map(p => p.code)) + 1;
    } catch (error) {
      // Si ocurre un error (archivo no existe o está vacío), continuamos con el contador en 1
      this.nextId = 1;
    }
  }

  saveToFile() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data, 'utf-8');
    } catch (error) {
      console.error("Error al guardar los datos en el archivo.");
    }
  }
}

// Ejemplo de uso:
const filePath = './products.json'; // Ruta del archivo para persistencia
const productManager = new ProductManager(filePath);

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

