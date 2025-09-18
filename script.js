document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Verificar que los elementos existan
    if (navToggle && mainNav) {
        // Añadir un evento 'click' al botón
        navToggle.addEventListener('click', () => {
            // Alternar la clase 'is-visible' en el menú de navegación
            mainNav.classList.toggle('is-visible');

            // Opcional: Cambiar el ícono de hamburguesa a una "X"
            const icon = navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});