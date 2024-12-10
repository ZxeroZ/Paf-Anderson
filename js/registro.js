


        document.addEventListener('DOMContentLoaded', () => {
            const form = document.querySelector("form"); // Suponiendo que el formulario de registro está dentro de un `<form>`
            const successModal = document.getElementById('successModal');
            const closeModalButton = document.getElementById('closeModal');
            const goToLoginButton = document.getElementById('goToLogin');
        
            // Simulamos el registro (puedes reemplazar esto con lógica real para registrar al usuario)
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar el envío real del formulario
        
                // Aquí iría la lógica para registrar al usuario (por ejemplo, una llamada API)
                // Después de registrar al usuario, mostramos el modal de éxito
                successModal.style.display = 'flex';
            });
        
            // Cerrar el modal
            closeModalButton.addEventListener('click', () => {
                successModal.style.display = 'none';
            });
        
            // Redirigir a la página de inicio de sesión
            goToLoginButton.addEventListener('click', () => {
                window.location.href = 'iniciar.html'; // Redirige a la página de inicio de sesión
            });
        });
        