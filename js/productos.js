// Lista de productos (15 productos como ejemplo)
const productos = [
    {id: 1, nombre: "Cemento Pacasmayo Azul", precio: "S/ 38.90", imagen: "imagenes/cemento.png" },
    {id: 2,nombre: "Látex Pato CPP Blanco GAL", precio: "S/ 37.90", imagen: "imagenes/pintura.png" },
    {id: 3, nombre: "Cemento Pacasmayo Rojo", precio: "S/ 15.90", imagen: "imagenes/cemento_rojo.png" },
    {id: 4,nombre: "Calamina Galv", precio: "S/ 27.90", imagen: "imagenes/calamina.png" },
    {id: 5,nombre: "Cemento Sol Portland", precio: "S/ 32.90", imagen: "imagenes/cemento_sol.png" },
    {id: 6, nombre: "Ladrillo Techo Hueco", precio: "S/ 32.90", imagen: "imagenes/ladrillo_techo.png" },
    {id: 7, nombre: "Barra de Construcción", precio: "S/ 23.90", imagen: "imagenes/barra.png" },
    {id: 8,nombre: "Mezcladora Trompo", precio: "S/ 126.90", imagen: "imagenes/trompo.png" },
    {id: 9, nombre: "Pegamento Chema Extra", precio: "S/ 24.30", imagen: "imagenes/pegamento.png" },
    {id: 10, nombre: "Fragua Super Porcelana", precio: "S/ 23.20", imagen: "imagenes/fragua.png" },
    {id: 11, nombre: "Escalera Plegable", precio: "S/ 80.20", imagen: "imagenes/escalera.png" },
    {id: 12, nombre: "Rodillo Blanco antigota", precio: "S/ 15.50", imagen: "imagenes/rodillo.png" },
    {id: 13, nombre: "Tanque de agua Rotoplas", precio: "S/ 560.20", imagen: "imagenes/rotoplas.png" },
    {id: 14,nombre: "Pala para construcción", precio: "S/ 112.20", imagen: "imagenes/pala.png" },
    {id: 15, nombre: "Carretilla Buggy 5.5P3 80 ", precio: "S/ 125.90", imagen: "imagenes/carretilla.png" },
];

// Variables para paginación
const productosPorPagina = 5;
let paginaActual = 1;



// Función para desordenar los productos aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Referencias al DOM
const cartModal = document.getElementById('cartModal');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCartMessage');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

// Función para mostrar productos
function mostrarProductos() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosEnPagina = productos.slice(inicio, fin);

    const productosContainer = document.getElementById("productos-container");
    productosContainer.innerHTML = ""; // Limpiar contenedor

    productosEnPagina.forEach((producto, index) => {
        const productoHTML = `
            <div class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
                <h4>${producto.nombre}</h4>
                <p class="precio-ahora">${producto.precio}</p>
                <button class="btn-agregar" data-index="${(paginaActual - 1) * productosPorPagina + index}">
                    <i class="fas fa-shopping-cart"></i> Agregar
                </button>
                <a href="detalle-producto.html?id=${producto.id}" class="btn-detalle">
                    <i class="fas fa-info-circle"></i> Ver Detalle
                </a>
            </div>
        `;
        productosContainer.innerHTML += productoHTML;
    });

    // Reasignar eventos después de actualizar productos
    asignarEventosAgregar();
}
// Función para asignar eventos a los botones "Agregar al carrito"
function asignarEventosAgregar() {
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    botonesAgregar.forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            const producto = { ...productos[index], cantidad: 1 };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProduct = cart.find(item => item.nombre === producto.nombre);

            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                cart.push(producto);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            actualizarCarrito();
        });
    });
}

// Función para generar botones de paginación
function generarPaginacion() {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Limpiar botones anteriores

    for (let i = 1; i <= totalPaginas; i++) {
        const boton = document.createElement("button");
        boton.textContent = i;
        boton.className = i === paginaActual ? "activo" : "";
        boton.addEventListener("click", () => {
            paginaActual = i;
            mostrarProductos();
            generarPaginacion();
        });
        paginationContainer.appendChild(boton);
    }
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
    }

    cart.forEach((producto, index) => {
        const precio = parseFloat(producto.precio.replace('S/', '').trim());
        total += precio * producto.cantidad;

        const itemHTML = `
            <div class="cart-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="info">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: ${producto.precio}</p>
                    <div class="quantity-controls">
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span>${producto.cantidad}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-index="${index}">Eliminar</button>
            </div>
        `;
        cartItemsContainer.innerHTML += itemHTML;
    });

    cartTotal.textContent = `S/ ${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// Manejar eventos dentro del carrito
cartItemsContainer.addEventListener('click', (e) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = e.target.dataset.index;

    if (e.target.classList.contains('remove-item')) {
        cart.splice(index, 1);
    } else if (e.target.classList.contains('increase-quantity')) {
        cart[index].cantidad++;
    } else if (e.target.classList.contains('decrease-quantity') && cart[index].cantidad > 1) {
        cart[index].cantidad--;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarCarrito();
});

// Abrir y cerrar el modal del carrito
document.querySelector('.cart').addEventListener('click', () => {
    cartModal.classList.add('show');
    actualizarCarrito();
});

document.querySelector('.close-modal').addEventListener('click', () => {
    cartModal.classList.remove('show');
});

document.querySelector('.btn.order').addEventListener('click', () => {
    window.location.href = 'checkout.html';
});


// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    shuffleArray(productos); // Desordenar productos antes de mostrarlos
    mostrarProductos();
    generarPaginacion();
    actualizarCarrito();
});
