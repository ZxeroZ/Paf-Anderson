document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const confirmOrderBtn = document.getElementById('confirmOrder');
    const deliveryMethod = document.getElementById('deliveryMethod');
    const storeOptions = document.getElementById('storeOptions');
    const deliveryDetails = document.getElementById('deliveryDetails');
    const deliveryDate = document.getElementById('deliveryDate');
    const district = document.getElementById('district');
    const store = document.getElementById('store');
    const acceptTerms = document.getElementById('acceptTerms');
    const paymentOptions = document.querySelectorAll('.payment-option');

    let selectedPaymentMethod = null;

    // Cargar productos desde localStorage
    function cargarProductos() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        checkoutItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            checkoutItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
            return;
        }

        cart.forEach((producto) => {
            const precio = parseFloat(producto.precio.replace('S/', '').trim());
            subtotal += precio * producto.cantidad;

            const itemHTML = `
                <div class="checkout-item">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="info">
                        <h4>${producto.nombre}</h4>
                        <p>Precio: ${producto.precio}</p>
                        <p>Cantidad: ${producto.cantidad}</p>
                    </div>
                </div>
            `;
            checkoutItemsContainer.innerHTML += itemHTML;
        });

        subtotalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
        totalElement.textContent = `S/ ${subtotal.toFixed(2)}`;
    }

    // Mostrar u ocultar opciones de entrega
    deliveryMethod.addEventListener('change', () => {
        if (deliveryMethod.value === 'recojo') {
            storeOptions.classList.remove('hidden');
            deliveryDetails.classList.add('hidden');
        } else if (deliveryMethod.value === 'domicilio') {
            storeOptions.classList.add('hidden');
            deliveryDetails.classList.remove('hidden');
        } else {
            storeOptions.classList.add('hidden');
            deliveryDetails.classList.add('hidden');
        }
    });

    // Seleccionar método de pago
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            paymentOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedPaymentMethod = option.id;
        });
    });

    // Validar términos y habilitar botón
    acceptTerms.addEventListener('change', () => {
        confirmOrderBtn.disabled = !acceptTerms.checked;
    });

    // Manejar confirmación del pedido
    confirmOrderBtn.addEventListener('click', () => {
        const deliveryType = deliveryMethod.value;

        // Validar método de entrega
        if (deliveryType === 'domicilio') {
            if (!deliveryDate.value || !district.value) {
                return; // No realiza ninguna acción si faltan datos
            }
        } else if (deliveryType === 'recojo') {
            if (!store.value) {
                return; // No realiza ninguna acción si faltan datos
            }
        }

        // Validar método de pago
        if (!selectedPaymentMethod) {
            return; // No realiza ninguna acción si no hay método de pago
        }

        // Guardar los datos en localStorage
        const orderDetails = {
            deliveryType,
            deliveryDate: deliveryDate.value || null,
            district: district.value || null,
            store: store.value || null,
            paymentMethod: selectedPaymentMethod,
        };
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

        // Redirigir directamente a la página de confirmación
        window.location.href = 'datos.html';
    });

    cargarProductos();
});
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        window.location.href = 'productos.html';
    });
});
