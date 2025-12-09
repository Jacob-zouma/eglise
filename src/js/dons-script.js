// ============================================
// SCRIPT POUR LA MODALE DES DONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Éléments DOM
    const donsBtn = document.querySelector('.btn-primary2');
    const donsModal = document.getElementById('donsModal');
    const closeModalBtn = document.getElementById('closeDonsModal');
    const customAmountBtn = document.getElementById('customAmountBtn');
    const customAmountInput = document.getElementById('customAmountInput');
    const amountInput = document.getElementById('amountInput');
    const amountOptions = document.querySelectorAll('.amount-option');
    const btnCustomAmount = document.querySelector('.btn-custom-amount');
    const btnCopy = document.querySelector('.btn-copy');
    const sendSmsBtns = document.querySelectorAll('.btn-send-sms');
    const btnDonOnline = document.querySelector('.btn-don-online');
    
    // Ouvrir la modale
    if (donsBtn) {
        donsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            donsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Animation des barres d'allocation
            animateAllocationBars();
        });
    }
    
    // Fermer la modale
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            donsModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Fermer en cliquant en dehors
    donsModal.addEventListener('click', function(e) {
        if (e.target === donsModal) {
            donsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && donsModal.classList.contains('active')) {
            donsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Gestion des montants suggérés
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Retirer la sélection précédente
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Sélectionner l'option actuelle
            this.classList.add('selected');
            
            // Cacher l'input personnalisé
            customAmountInput.style.display = 'none';
            
            // Stocker le montant sélectionné
            const amount = this.getAttribute('data-amount');
            console.log(`Montant sélectionné: ${amount} FBu`);
        });
    });
    
    // Afficher l'input pour montant personnalisé
    if (customAmountBtn) {
        customAmountBtn.addEventListener('click', function() {
            // Retirer la sélection des autres options
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Afficher l'input personnalisé
            customAmountInput.style.display = 'flex';
            amountInput.focus();
        });
    }
    
    // Valider le montant personnalisé
    if (btnCustomAmount) {
        btnCustomAmount.addEventListener('click', function() {
            const amount = amountInput.value;
            if (amount && amount > 0) {
                alert(`Merci pour votre don de ${parseInt(amount).toLocaleString()} FBu !`);
                // Ici, vous pourriez rediriger vers le système de paiement
            } else {
                alert('Veuillez entrer un montant valide.');
                amountInput.focus();
            }
        });
    }
    
    // Copier le numéro de compte
    if (btnCopy) {
        btnCopy.addEventListener('click', function() {
            const accountNumber = this.getAttribute('data-text');
            
            // Utiliser l'API Clipboard si disponible
            if (navigator.clipboard) {
                navigator.clipboard.writeText(accountNumber)
                    .then(() => {
                        // Afficher un feedback temporaire
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copié !';
                        this.style.background = '#28a745';
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.style.background = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Erreur de copie:', err);
                        fallbackCopyText(accountNumber);
                    });
            } else {
                fallbackCopyText(accountNumber);
            }
        });
    }
    
    // Fonction de fallback pour copier du texte
    function fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('Numéro de compte copié !');
        } catch (err) {
            console.error('Erreur de copie:', err);
            alert('Veuillez copier manuellement: ' + text);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Envoyer un SMS pour Mobile Money
    sendSmsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const phoneNumber = this.getAttribute('data-number');
            const message = encodeURIComponent("Je souhaite faire un don à l'église.");
            
            // Ouvrir l'application SMS
            window.open(`sms:${phoneNumber}?body=${message}`, '_blank');
        });
    });
    
    // Don en ligne
    if (btnDonOnline) {
        btnDonOnline.addEventListener('click', function() {
            // Ici, vous intégrerez votre système de paiement
            // Exemple: PayPal, Stripe, ou une solution locale
            
            alert('Ouverture du système de paiement en ligne...\n\nPour une intégration réelle, utilisez :\n- PayPal\n- Stripe\n- Flutterwave (pour l\'Afrique)\n- Un système de paiement local');
            
            // Exemple de redirection :
            // window.open('https://votre-lien-de-paiement.com', '_blank');
        });
    }
    
    // Bouton de localisation
    const btnLocation = document.querySelector('.btn-location');
    if (btnLocation) {
        btnLocation.addEventListener('click', function() {
            // Coordonnées de l'église (à remplacer par les vraies)
            const address = "Ngagara, Bujumbura, Burundi";
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            
            window.open(googleMapsUrl, '_blank');
        });
    }
    
    // Animation des barres d'allocation
    function animateAllocationBars() {
        const barFills = document.querySelectorAll('.bar-fill');
        barFills.forEach(bar => {
            // Réinitialiser la largeur
            const width = bar.style.width;
            bar.style.width = '0%';
            
            // Animer après un délai
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Initialiser l'animation des cartes
    const methodCards = document.querySelectorAll('.method-card-modal');
    methodCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});