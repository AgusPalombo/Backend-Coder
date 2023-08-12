class Product {
    constructor(name, price, thumbnail, description, stock) {
        this.id = Product.getNextId(); // Genera un ID único
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.stock = stock;
    }

     

    // Generar el siguiente ID único usando el contador nextId
    static getNextId() {
        return Product.nextId++; // Incrementa nextId y devuelve el valor anterior
    }
}

// Inicializa el contador nextId en 1
Product.nextId = 1;


module.exports = Product;
