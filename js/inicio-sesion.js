document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const successModal = document.getElementById('successModal');
    const closeModalButton = document.getElementById('closeModal');
    const goToHomeButton = document.getElementById('goToHome');

    // Lógica de inicio de sesión (simulada para demostración)
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío real del formulario

        // Aquí deberías agregar la lógica de validación y el envío de datos a tu API

        // Después de "iniciar sesión exitosamente", mostramos el modal
        successModal.style.display = 'flex';
    });

    // Cerrar el modal
    closeModalButton.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Redirigir al usuario a la página de inicio
    goToHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html'; // Redirige al inicio
    });
});
