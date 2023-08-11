const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
app.use(express.json());

const manager = new ProductManager();


app.get('/productos', async (req, res) => {
    try {
        await manager.cargarProductosDesdeArchivo('productos.json');
        res.json(manager.products);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar productos' });
    }
});

app.post('/productos', async (req, res) => {
    const { name, price, thumbnail, description, stock } = req.body;
    try {
        await manager.agregarProducto(name, price, thumbnail, description, stock);
        await manager.guardarProductosEnArchivo('productos.json');
        res.json({ message: 'Producto agregado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

app.put('/productos/:id', async (req, res) => {
    const product_id = parseInt(req.params.id);
    const { name, price, thumbnail, description, stock } = req.body;
    try {
        await manager.actualizarProducto(product_id, name, price, thumbnail, description, stock);
        await manager.guardarProductosEnArchivo('productos.json');
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

app.delete('/productos/:id', async (req, res) => {
    const product_id = parseInt(req.params.id);
    try {
        await manager.eliminarProductoPorID(product_id);
        await manager.guardarProductosEnArchivo('productos.json');
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
