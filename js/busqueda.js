const productos = [
    {id: 1, nombre: "Cemento Pacasmayo Azul", precio: "S/ 38.90", imagen: "imagenes/cemento.png" },
    {id: 2, nombre: "Látex Pato CPP Blanco GAL", precio: "S/ 37.90", imagen: "imagenes/pintura.png" },
    {id: 3, nombre: "Cemento Pacasmayo Rojo", precio: "S/ 15.90", imagen: "imagenes/cemento_rojo.png" },
    {id: 4, nombre: "Calamina Galv", precio: "S/ 27.90", imagen: "imagenes/calamina.png" },
    {id: 5, nombre: "Cemento Sol Portland", precio: "S/ 32.90", imagen: "imagenes/cemento_sol.png" },
    {id: 6, nombre: "Ladrillo Techo Hueco", precio: "S/ 32.90", imagen: "imagenes/ladrillo_techo.png" },
    {id: 7, nombre: "Barra de Construcción", precio: "S/ 23.90", imagen: "imagenes/barra.png" },
    {id: 8, nombre: "Mezcladora Trompo", precio: "S/ 126.90", imagen: "imagenes/trompo.png" },
    {id: 9, nombre: "Pegamento Chema Extra", precio: "S/ 24.30", imagen: "imagenes/pegamento.png" },
    {id: 10, nombre: "Fragua Super Porcelana", precio: "S/ 23.20", imagen: "imagenes/fragua.png" },
    {id: 11, nombre: "Escalera Plegable", precio: "S/ 80.20", imagen: "imagenes/escalera.png" },
    {id: 12, nombre: "Rodillo Blanco antigota", precio: "S/ 15.50", imagen: "imagenes/rodillo.png" },
    {id: 13, nombre: "Tanque de agua Rotoplas", precio: "S/ 560.20", imagen: "imagenes/rotoplas.png" },
    {id: 14, nombre: "Pala para construcción", precio: "S/ 112.20", imagen: "imagenes/pala.png" },
    {id: 15, nombre: "Carretilla Buggy 5.5P3 80", precio: "S/ 125.90", imagen: "imagenes/carretilla.png" },
];

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    console.log("Búsqueda realizada:", query); // Verificar que el valor de búsqueda es correcto

    const filteredProducts = productos.filter(product => product.nombre.toLowerCase().includes(query));
    console.log("Productos filtrados:", filteredProducts); // Verificar qué productos se están encontrando

    const productListDiv = document.getElementById('product-list');
    productListDiv.innerHTML = '';  // Limpiar resultados anteriores

    if (filteredProducts.length > 0) {
        productListDiv.style.display = 'block'; // Mostrar lista de productos
        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item');
            productDiv.innerHTML = `
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.precio}</p>
            `;
            productListDiv.appendChild(productDiv);
        });
    } else {
        productListDiv.style.display = 'none'; // Ocultar si no hay coincidencias
    }
});
