// Product.js objeto producto creacion del mismo
class Product {
    constructor(name, price, thumbnail, description, stock) {
        this.id = Product.generateId();
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.description = description;
        this.stock = stock;
    }

    static currentId = 1;

    static generateId() {
        return Product.currentId++;
    }
}

module.exports = Product;
