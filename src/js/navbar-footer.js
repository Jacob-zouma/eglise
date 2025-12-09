// navbar-footer.js - Chargeur principal pour header et footer

// Fonction pour charger un template HTML
async function loadTemplate(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Erreur lors du chargement du template ${url}:`, error);
        return '';
    }
}

// Fonction pour charger les styles
function loadStyles() {
    // Vérifier si les styles sont déjà chargés
    if (!document.querySelector('link[href="/eglise/src/css/header-footer.css"]')) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/eglise/src/css/header-footer.css';
        document.head.appendChild(styleLink);
    }
}

// Fonction principale
async function loadHeaderFooter() {
    // Charger les styles
    loadStyles();
    
    // Charger le header
    const headerHTML = await loadTemplate('/eglise/src/components/header.html');
    if (headerHTML) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Charger la logique du header
        const headerScript = document.createElement('script');
        headerScript.src = '/eglise/src/js/header.js';
        headerScript.defer = true;
        document.body.appendChild(headerScript);
    }
    
    // Charger le footer
    const footerHTML = await loadTemplate('/eglise/src/components/footer.html');
    if (footerHTML) {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
        
        // Charger la logique du footer
        const footerScript = document.createElement('script');
        footerScript.src = '/eglise/src/js/footer.js';
        footerScript.defer = true;
        document.body.appendChild(footerScript);
    }
}

// Lancer le chargement quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeaderFooter);
} else {
    loadHeaderFooter();
}

// Exporter pour un usage dans d'autres fichiers
window.HeaderFooterLoader = {
    load: loadHeaderFooter,
    loadTemplate: loadTemplate
};