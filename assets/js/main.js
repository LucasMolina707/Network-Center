const authConfig = {
    domain: 'dev-e53jc0q5g7pd2ek6.us.auth0.com',
    clientId: 'urDCH6ExoskeEbYxxZH7iZEPVxi99t8p'
};

let auth0Client = null;

/**
 * Carga el menú de navegación dinámicamente y añade el botón de logout.
 */
async function loadMenu() {
    const navMenuPlaceholder = document.getElementById('nav-menu-placeholder');
    if (!navMenuPlaceholder) return;

    try {
        const response = await fetch('/assets/data/menu-links.json');
        if (!response.ok) throw new Error("Network response was not ok");
        const links = await response.json();

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = link.texto;
            a.href = link.url;
            li.appendChild(a);
            navMenuPlaceholder.appendChild(li);
        });

        // Añadir el botón de Cerrar Sesión
        const logoutLi = document.createElement('li');
        const logoutBtn = document.createElement('a');
        logoutBtn.textContent = 'Cerrar Sesión';
        logoutBtn.href = '#';
        logoutBtn.style.fontWeight = 'bold';
        logoutBtn.onclick = () => {
            auth0Client.logout({
                logoutParams: { returnTo: 'https://nc.inglucas.com.co/' }
            });
        };
        logoutLi.appendChild(logoutBtn);
        navMenuPlaceholder.appendChild(logoutLi);
    } catch (e) {
        console.error("Error al cargar el menú:", e);
    }
}

/**
 * Activa la funcionalidad del menú de hamburguesa para móviles.
 */
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-visible');
            const icon = navToggle.querySelector('i');
            if (mainNav.classList.contains('is-visible')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }
}

/**
 * Activa la funcionalidad de los botones para copiar código.
 */
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.previousElementSibling.innerText;
            navigator.clipboard.writeText(codeBlock).then(() => {
                const originalIcon = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Copiado';
                setTimeout(() => { button.innerHTML = originalIcon; }, 2000);
            }).catch(err => { console.error('Error al copiar: ', err); });
        });
    });
}

/**
 * Función principal que se ejecuta cuando el DOM está cargado.
 */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        auth0Client = await auth0.createAuth0Client({
            ...authConfig,
            cacheLocation: 'localstorage'
        });

        if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
            await auth0Client.handleRedirectCallback();
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        if (!isAuthenticated) {
            return await auth0Client.loginWithRedirect({
                authorizationParams: { redirect_uri: window.location.href }
            });
        }

        // Si está autenticado, cargar todas las funciones de la página.
        await loadMenu();
        setupMobileMenu();
        setupCopyButtons();

    } catch (err) {
        console.error("Error en la autenticación: ", err);
        // Descomentar la siguiente línea para redirigir en caso de error
        // window.location.href = 'index.html';
    }
});
