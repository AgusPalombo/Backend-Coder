const socket = io();

socket.on('productosActualizados', productos => {
  // Actualiza la lista de productos en tiempo real
  const listaProductos = document.querySelector('#productos');
  listaProductos.innerHTML = '';

  productos.forEach(producto => {
    const nuevoProducto = document.createElement('li');
    nuevoProducto.innerHTML = `
      <h3>${producto.title}</h3>
      <p>${producto.description}</p>
      <p>Precio: $${producto.price}</p>
      <p>Thumbnail: <img src="${producto.thumbnail}" alt="Thumbnail"></p>
      <p>Stock: ${producto.stock}</p>
    `;
    listaProductos.appendChild(nuevoProducto);
  });
});

const crearProductoForm = document.getElementById('crearProductoForm');
crearProductoForm.addEventListener('submit', event => {
  event.preventDefault();
  const nuevoProducto = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    thumbnail: document.getElementById('thumbnail').value,
    stock: parseInt(document.getElementById('stock').value)
  };
  socket.emit('crearProducto', nuevoProducto);
  crearProductoForm.reset();
});
