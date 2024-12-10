document.addEventListener('DOMContentLoaded', () => {
    const orderItemsContainer = document.getElementById('order-items');
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const userPhoneElement = document.getElementById('user-phone');
    const userDniElement = document.getElementById('user-dni');
    const deliveryInfoElement = document.getElementById('delivery-info');
    const paymentMethodElement = document.getElementById('payment-method');
    const finalizeOrderBtn = document.getElementById('finalizeOrder');

    // Cargar productos del pedido
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>No hay productos en el pedido.</p>';
    } else {
        cart.forEach((item) => {
            const itemHTML = `
                <div class="order-item">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="item-info">
                        <p><strong>${item.nombre}</strong></p>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio: ${item.precio}</p>
                    </div>
                </div>
            `;
            orderItemsContainer.innerHTML += itemHTML;
        });
    }

    // Cargar datos del cliente
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        userNameElement.textContent = `${userData.nombre} ${userData.apellido}`;
        userEmailElement.textContent = userData.email;
        userPhoneElement.textContent = userData.telefono;
        userDniElement.textContent = userData.dni;
    }

    // Cargar método de entrega
    const orderDetails = JSON.parse(localStorage.getItem('orderDetails'));
    if (orderDetails) {
        deliveryInfoElement.textContent =
            orderDetails.deliveryType === 'domicilio'
                ? `Entrega a domicilio en ${orderDetails.district}, Fecha: ${orderDetails.deliveryDate}`
                : `Recojo en tienda: ${orderDetails.store}`;
    }

    // Cargar método de pago
    let selectedPaymentMethod = 'Método no especificado';
    if (orderDetails && orderDetails.paymentMethod) {
        const paymentMethods = {
            creditCard: 'Tarjeta de Crédito',
            debitCard: 'Tarjeta de Débito',
            cash: 'Efectivo',
            mercadoPago: 'Mercado Pago',
            yape: 'Yape',
        };
        selectedPaymentMethod = paymentMethods[orderDetails.paymentMethod] || 'Método no especificado';
        paymentMethodElement.textContent = selectedPaymentMethod;
    }

    // Función para convertir imágenes locales a Base64
    function convertImageToBase64(imgPath, callback) {
        const img = new Image();
        img.src = imgPath;
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png');
            callback(dataURL);
        };
        img.onerror = function () {
            callback(null); // Si hay error al cargar la imagen
        };
    }

    // Finalizar pedido
    finalizeOrderBtn.addEventListener('click', async () => {
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close"><i class="fas fa-times"></i></button>
                    <i class="fas fa-check-circle modal-icon"></i>
                    <h2>¡Gracias por tu compra!</h2>
                    <p>Tu pedido ha sido confirmado con éxito.</p>
                    <div class="modal-products">
                        ${cart.map(item => `
                            <div class="modal-product">
                                <img src="${item.imagen}" alt="${item.nombre}">
                                <div>
                                    <p><strong>${item.nombre}</strong></p>
                                    <p>Cantidad: ${item.cantidad}</p>
                                    <p>Precio: ${item.precio}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="modal-actions">
                        <button id="downloadInvoice" class="btn modal-btn" style="background-color: #dc3545;">
                            <i class="fas fa-file-pdf"></i> Descargar Boleta
                        </button>
                        <button id="continueShopping" class="btn modal-btn">
                            <i class="fas fa-store"></i> Seguir Comprando
                        </button>
                        <button id="goHome" class="btn modal-btn">
                            <i class="fas fa-home"></i> Volver al Inicio
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Insertar el modal en el cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Función para generar el PDF
        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Agregar el logo de la empresa
            await new Promise((resolve) => {
                convertImageToBase64('imagenes/logo.png', (logoBase64) => {
                    if (logoBase64) {
                        doc.addImage(logoBase64, 'PNG', 10, 10, 40, 15);
                    }
                    resolve();
                });
            });

            // Título de la boleta
            doc.setFont('Poppins', 'bold');
            doc.setFontSize(18);
            doc.text('Distribuidora Ferrocorp', 105, 20, { align: 'center' });
            doc.setFontSize(14);
            doc.text('Boleta de Compra', 105, 30, { align: 'center' });

            // Datos del cliente
            doc.setFont('Poppins', 'normal');
            doc.setFontSize(12);
            doc.text('Datos del Cliente:', 10, 50);
            doc.text(`Nombre: ${userData.nombre || ''} ${userData.apellido || ''}`, 10, 60);
            doc.text(`Email: ${userData.email || ''}`, 10, 70);
            doc.text(`Teléfono: ${userData.telefono || ''}`, 10, 80);
            doc.text(`DNI/RUC: ${userData.dni || ''}`, 10, 90);
            doc.text(`Método de Pago: ${selectedPaymentMethod}`, 10, 100);

            // Detalles del pedido
            let yPosition = 110;
            doc.setFont('Poppins', 'bold');
            doc.text('Detalles del Pedido:', 10, yPosition);
            yPosition += 10;

            for (const item of cart) {
                doc.setFont('Poppins', 'normal');
                doc.text(`Producto: ${item.nombre}`, 10, yPosition);
                doc.text(`Cantidad: ${item.cantidad}`, 100, yPosition);
                doc.text(`Precio: ${item.precio}`, 150, yPosition);
                yPosition += 10;

                // Agregar imagen del producto al PDF
                await new Promise((resolve) => {
                    convertImageToBase64(item.imagen, (imageBase64) => {
                        if (imageBase64) {
                            doc.addImage(imageBase64, 'PNG', 10, yPosition, 30, 30);
                        }
                        yPosition += 35;
                        resolve();
                    });
                });
            }

            // Guardar PDF
            doc.save('boleta-de-compra.pdf');
        }

        // Eventos de los botones del modal
        document.getElementById('downloadInvoice').addEventListener('click', generatePDF);
        document.getElementById('continueShopping').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'productos.html';
        });

        document.getElementById('goHome').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'index.html';
        });

        // Cerrar el modal
        document.querySelector('.modal-close').addEventListener('click', () => {
            document.querySelector('.modal-overlay').remove();
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        window.location.href = 'productos.html';
    });
});
