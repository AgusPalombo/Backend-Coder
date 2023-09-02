const fs = require('fs');

const productsFilePath = 'products.json';

// Cargar productos desde el archivo JSON
function loadProducts() {
  try {
    const rawData = fs.readFileSync(productsFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    return [];
  }
}

// Guardar productos en el archivo JSON
function saveProducts(products) {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
}

// Obtener productos
function getProducts() {
  return loadProducts();
}

// Crear un nuevo producto
function createProduct(producto) {
  const products = loadProducts();
  const newProduct = {
    id: products.length + 1,
    ...producto
  };
  products.push(newProduct);
  saveProducts(products);
}

// Actualizar un producto
function updateProduct(productoActualizado) {
  const products = loadProducts();
  const index = products.findIndex(producto => producto.id === productoActualizado.id);
  if (index !== -1) {
    products[index] = {
      ...products[index],
      ...productoActualizado
    };
    saveProducts(products);
  }
}

// Eliminar un producto
function deleteProduct(productoId) {
  let products = loadProducts();
  const index = products.findIndex(producto => producto.id === productoId);
  if (index !== -1) {
    products.splice(index, 1);
    products = normalizeIds(products);
    saveProducts(products);
  }
}

// Normalizar los IDs después de eliminar
function normalizeIds(products) {
  return products.map((producto, index) => ({
    ...producto,
    id: index + 1
  }));
}

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
