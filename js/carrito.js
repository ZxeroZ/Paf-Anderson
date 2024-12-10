document.addEventListener('DOMContentLoaded', function () {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalCostElement = document.getElementById('totalCost');
    const checkoutButton = document.getElementById('checkoutButton');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const cartLink = document.getElementById('cartLink');
    const cartModal = document.getElementById('cartModal');
    const closeModalButton = document.querySelector('.close-modal');

    function updateCartUI() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.innerHTML = '';
        let totalCost = 0;
        let cartIsEmpty = true;

        if (cart.length > 0) {
            cartIsEmpty = false;
            cart.forEach(item => {
                let price = parseFloat(item.price.replace('s/', '').trim());
                let quantity = item.quantity || 1;

                if (!isNaN(price)) {
                    totalCost += price * quantity;
                } else {
                    console.error("Invalid price for item:", item.name);
                }

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
    <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="70">
        <div class="cart-item-details">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>Precio unitario: s/${price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash-alt"></i>Eliminar</button>
        </div>
    </div>
`;
                cartItems.appendChild(cartItem);
            });
        }

        if (cartIsEmpty) {
            emptyCartMessage.style.display = 'block';
            checkoutButton.disabled = true;
            totalCostElement.textContent = "0.00";
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.disabled = false;
            totalCostElement.textContent = totalCost.toFixed(2);
        }
        cartCount.textContent = cart.length;
    }

    const addToCartButtons = document.querySelectorAll('.btn-agregar');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productContainer = this.closest('.tarjeta-oferta');
            const imgElement = productContainer.querySelector('img');
            const imagePath = imgElement.src;
            const productName = productContainer.querySelector('h4').textContent;
            const priceElement = productContainer.querySelector('.precio-ahora');
            const productPrice = priceElement ? priceElement.textContent.replace('s/', '').trim() : '0.00';

            const product = {
                id: imgElement.alt,
                name: productName,
                price: productPrice,
                image: imagePath,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.id === product.id);

            if (existingProductIndex === -1) {
                cart.push(product);
            } else {
                cart[existingProductIndex].quantity += 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        });
    });

    cartItems.addEventListener('click', function (event) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (event.target.classList.contains('remove-item')) {
            const itemId = event.target.dataset.id;
            const updatedCart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            updateCartUI();
        } else if (event.target.classList.contains('increase-quantity')) {
            const itemId = event.target.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item) item.quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        } else if (event.target.classList.contains('decrease-quantity')) {
            const itemId = event.target.dataset.id;
            const item = cart.find(item => item.id === itemId);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item) {
                const updatedCart = cart.filter(item => item.id !== itemId);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    });

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.toggle("show");
        updateCartUI();
    });

    closeModalButton.addEventListener('click', () => {
        cartModal.classList.remove("show");
    });

    updateCartUI();
});


// Escuchar el clic en el botón de confirmación
document.getElementById('checkoutButton').addEventListener('click', function () {
    // Verificar si el botón está habilitado antes de redirigir
    if (!this.disabled) {
        window.location.href = 'checkout.html'; // Redirigir a la página de checkout
    }
});

