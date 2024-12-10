document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('identificacionForm');
    const continueToConfirmationBtn = document.getElementById('continueToConfirmation');
    const acceptTerms = document.getElementById('acceptTerms');

    // Habilitar el botón solo si los términos están aceptados
    acceptTerms.addEventListener('change', () => {
        continueToConfirmationBtn.disabled = !acceptTerms.checked;
    });

    // Manejar el envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar campos requeridos
        const email = document.getElementById('email').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const dni = document.getElementById('dni').value;

        if (!email || !nombre || !apellido || !telefono || !dni) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Guardar datos en localStorage
        const userData = {
            email,
            nombre,
            apellido,
            telefono,
            dni,
        };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Redirigir a la página de confirmación
        window.location.href = 'confirmacion.html';
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        window.location.href = 'productos.html';
    });
});
