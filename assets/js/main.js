// Espera a que todo el contenido del HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    const navMenuPlaceholder = document.getElementById('nav-menu-placeholder');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    // --- 1. FUNCIÓN PARA GENERAR EL MENÚ DE NAVEGACIÓN ---
    async function generateMenu() {
        // Carga los datos del archivo JSON
        const response = await fetch('assets/data/menu-links.json');
        const links = await response.json();

        // Crea cada elemento del menú y lo añade a la lista
        links.forEach(link => {
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            anchor.textContent = link.texto;
            anchor.href = link.url;
            listItem.appendChild(anchor);
            navMenuPlaceholder.appendChild(listItem);
        });
    }

    // --- 2. LÓGICA PARA EL MENÚ MÓVIL (HAMBURGUESA) ---
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-visible');
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // --- EJECUTAR LA GENERACIÓN DEL MENÚ ---
    if (navMenuPlaceholder) {
        generateMenu();
    }
});
