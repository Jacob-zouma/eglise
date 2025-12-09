// footer.js - Logique du footer

document.addEventListener('DOMContentLoaded', function() {
    initFooter();
});

function initFooter() {
    // Mettre à jour l'année dans le copyright
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('footerNewsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Simuler l'envoi
                emailInput.value = '';
                alert('Merci pour votre inscription à notre newsletter !');
            }
        });
    }
}