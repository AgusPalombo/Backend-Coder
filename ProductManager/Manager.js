class ProductManager {
    constructor() {
      this.products = [];
      this.nextId = 1; // Inicializamos el contador del ID en 1
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
      console.log("Producto agregado correctamente.");
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      const product = this.products.find(p => p.code === id);
      if (!product) {
        console.error("Error: Producto no encontrado.");
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
  }
  
  // Ejemplo de uso:
  const productManager = new ProductManager();
  
  productManager.addProduct("Producto 1", "Descripción del Producto 1", 50.0, "thumbnail1.jpg", 10);
  productManager.addProduct("Producto 2", "Descripción del Producto 2", 30.0, "thumbnail2.jpg", 5);
  productManager.addProduct("Producto 3", "Descripción del Producto 3", 20.0, "thumbnail3.jpg", 15);
  
  console.log("Todos los productos:", productManager.getProducts());
  console.log("Producto por ID (código 1):", productManager.getProductById(1));
  console.log("Producto por ID (código 2):", productManager.getProductById(2));
  console.log("Producto por ID (código 3):", productManager.getProductById(3));
  console.log("Producto por ID (código 4):", productManager.getProductById(4));