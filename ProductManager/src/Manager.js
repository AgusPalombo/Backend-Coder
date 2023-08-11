const fs = require('fs/promises');
const Product = require('./Product');

class ProductManager {
    constructor() {
        this.products = [];
    }

    async cargarProductosDesdeArchivo(filename) {
        try {
            const data = await fs.readFile(filename, 'utf-8');
            const products = JSON.parse(data);
            this.products = products.map(productData => new Product(
                productData.name,
                productData.price,
                productData.thumbnail,
                productData.description,
                productData.stock
            ));
            console.log("Productos cargados desde el archivo:", filename);
        } catch (error) {
            console.error("Error al cargar productos desde el archivo:", error.message);
        }
    }

    async guardarProductosEnArchivo(filename) {
        const data = JSON.stringify(this.products, null, 2);
        try {
            await fs.writeFile(filename, data);
            console.log("Productos guardados en el archivo:", filename);
        } catch (error) {
            console.error("Error al guardar productos en el archivo:", error.message);
        }
    }

    async agregarProducto(name, price, thumbnail, description, stock) {
        const product = new Product(name, price, thumbnail, description, stock);
        this.products.push(product);
        console.log("Producto agregado:", product.name);
    }

    async eliminarProductoPorID(product_id) {
        const index = this.products.findIndex(product => product.id === product_id);
        if (index !== -1) {
            const removedProduct = this.products.splice(index, 1)[0];
            console.log("Producto eliminado:", removedProduct.name);
        } else {
            console.log("Producto no encontrado con ID:", product_id);
        }
    }

    async actualizarProducto(product_id, new_name, new_price, new_thumbnail, new_description, new_stock) {
        const product = this.products.find(product => product.id === product_id);
        if (product) {
            product.name = new_name;
            product.price = new_price;
            product.thumbnail = new_thumbnail;
            product.description = new_description;
            product.stock = new_stock;
            console.log("Producto actualizado:", product.name);
        } else {
            console.log("Producto no encontrado con ID:", product_id);
        }
    }

    async listarProductos() {
        console.log("Lista de productos:");
        this.products.forEach(product => {
            console.log("ID:", product.id, "- Nombre:", product.name, "- Precio:", product.price);
        });
    }

    async getProductoPorID(product_id) {
        const product = this.products.find(product => product.id === product_id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }
}

module.exports = ProductManager;


