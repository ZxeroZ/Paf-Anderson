document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    // Lista de productos
    const productos = [
        { id: 1, nombre: "Cemento Pacasmayo Azul", precio: "S/ 38.90", imagen: "imagenes/cemento.png", descripcion: "Ideal para construcciones resistentes y duraderas." },
        { id: 2, nombre: "Látex Pato CPP Blanco GAL", precio: "S/ 37.90", imagen: "imagenes/pintura.png", descripcion: "Pintura de alta calidad para interiores y exteriores." },
        { id: 3, nombre: "Cemento Pacasmayo Rojo", precio: "S/ 15.90", imagen: "imagenes/cemento_rojo.png", descripcion: "Cemento de uso general, perfecto para acabados." },
        { id: 4, nombre: "Calamina Galv", precio: "S/ 27.90", imagen: "imagenes/calamina.png", descripcion: "Resistente a la corrosión, ideal para techos y coberturas." },
        { id: 5, nombre: "Cemento Sol Portland", precio: "S/ 32.90", imagen: "imagenes/cemento_sol.png", descripcion: "Cemento de alta resistencia para todo tipo de obras." },
        { id: 6, nombre: "Ladrillo Techo Hueco", precio: "S/ 32.90", imagen: "imagenes/ladrillo_techo.png", descripcion: "Ladrillos de calidad para techos y estructuras livianas." },
        { id: 7, nombre: "Barra de Construcción", precio: "S/ 23.90", imagen: "imagenes/barra.png", descripcion: "Material de alta resistencia para refuerzo estructural." },
        { id: 8, nombre: "Mezcladora Trompo", precio: "S/ 126.90", imagen: "imagenes/trompo.png", descripcion: "Mezcladora eficiente para todo tipo de mezclas." },
        { id: 9, nombre: "Pegamento Chema Extra", precio: "S/ 24.30", imagen: "imagenes/pegamento.png", descripcion: "Adhesivo resistente para múltiples aplicaciones." },
        { id: 10, nombre: "Fragua Super Porcelana", precio: "S/ 23.20", imagen: "imagenes/fragua.png", descripcion: "Fragua de alta calidad para acabados perfectos." },
        { id: 11, nombre: "Escalera Plegable", precio: "S/ 80.20", imagen: "imagenes/escalera.png", descripcion: "Escalera plegable y resistente, ideal para el hogar." },
        { id: 12, nombre: "Rodillo Blanco antigota", precio: "S/ 15.50", imagen: "imagenes/rodillo.png", descripcion: "Rodillo antigota para pintura limpia y uniforme." },
        { id: 13, nombre: "Tanque de agua Rotoplas", precio: "S/ 560.20", imagen: "imagenes/rotoplas.png", descripcion: "Tanque de agua resistente y de gran capacidad." },
        { id: 14, nombre: "Pala para construcción", precio: "S/ 112.20", imagen: "imagenes/pala.png", descripcion: "Pala duradera para trabajos de construcción." },
        { id: 15, nombre: "Carretilla Buggy 5.5P3 80", precio: "S/ 125.90", imagen: "imagenes/carretilla.png", descripcion: "Carretilla resistente para transporte de materiales." },
    ];

    const product = productos.find(p => p.id === productId);

    if (product) {
        // Mostrar información del producto
        document.getElementById('title').textContent = product.nombre;
        document.getElementById('description').textContent = product.descripcion;
        document.getElementById('price').textContent = `Precio: ${product.precio}`;
        document.getElementById('main-image').src = product.imagen;

        // Evento para agregar al carrito
        document.getElementById('add-to-cart').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            if (quantity > 0) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(p => p.id === product.id);

                if (existingProduct) {
                    existingProduct.cantidad += quantity;
                } else {
                    cart.push({ ...product, cantidad: quantity });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                actualizarCarritoSinVentana();
            }
        });
    } else {
        document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
    }

    // Función para actualizar el carrito sin mostrar alertas
    function actualizarCarritoSinVentana() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = document.getElementById('cartCount'); // Contador del carrito (icono)

        // Actualizar la cantidad total de productos en el carrito
        const totalProductos = cart.reduce((sum, producto) => sum + producto.cantidad, 0);
        cartCount.textContent = totalProductos;
    }

    // Actualizar carrito al cargar la página
    actualizarCarritoSinVentana();
});


document.addEventListener('DOMContentLoaded', () => {
    const decreaseButton = document.getElementById('decreaseQuantity');
    const increaseButton = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('quantity');

    decreaseButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
});
