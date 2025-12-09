// preloader.js - Preloader 

class Preloader {
    constructor() {
        this.preloader = null;
        this.progress = 0;
        this.init();
    }

    init() {
        // Créer le preloader immédiatement
        this.createPreloader();
        
        // Bloquer le défilement
        document.body.style.overflow = 'hidden';
        
        // Démarrer le chargement
        this.startLoading();
    }

    createPreloader() {
        // Créer l'élément principal
        this.preloader = document.createElement('div');
        this.preloader.id = 'facebook-preloader';
        
        // Structure HTML simple
        this.preloader.innerHTML = `
            <div class="preloader-content">
                <!-- Logo -->
                <div class="logo-container">
                    <img src="/campusvibe-frontend/public/group.png" 
                         alt="Église La Grâce de la Croix" 
                         class="preloader-logo">
                </div>
                
                <!-- Spinner -->
                <div class="spinner"></div>
                
                <!-- Texte -->
                <div class="loading-text">Chargement...</div>
                
                <!-- Barre de progression simple -->
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                    <div class="progress-text">0%</div>
                </div>
            </div>
        `;
        
        // Ajouter les styles
        this.addStyles();
        
        // Ajouter au body
        document.body.appendChild(this.preloader);
    }

    addStyles() {
        const styles = `
            <style>
                #facebook-preloader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    z-index: 99999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .preloader-content {
                    text-align: center;
                    max-width: 300px;
                    padding: 20px;
                }
                
                .logo-container {
                    margin-bottom: 20px;
                }
                
                .preloader-logo {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }
                
                .spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #0071c2;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 15px;
                }
                
                .loading-text {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 15px;
                }
                
                .progress-container {
                    margin-top: 10px;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 4px;
                    background: #f0f0f0;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }
                
                .progress-fill {
                    width: 0%;
                    height: 100%;
                    background: #0071c2;
                    border-radius: 2px;
                    transition: width 0.3s ease;
                }
                
                .progress-text {
                    font-size: 12px;
                    color: #888;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                #facebook-preloader.hidden {
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease;
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    startLoading() {
        const progressFill = this.preloader.querySelector('.progress-fill');
        const progressText = this.preloader.querySelector('.progress-text');
        
        // Simuler le chargement
        const simulateLoading = () => {
            // Augmenter la progression
            if (this.progress < 70) {
                this.progress += 0.5 + Math.random() * 2;
            } else if (this.progress < 95) {
                this.progress += 0.1 + Math.random() * 0.5;
            } else {
                this.progress += 0.05;
            }
            
            if (this.progress > 100) this.progress = 100;
            
            // Mettre à jour l'interface
            if (progressFill) {
                progressFill.style.width = `${this.progress}%`;
            }
            
            if (progressText) {
                progressText.textContent = `${Math.round(this.progress)}%`;
            }
            
            // Continuer ou terminer
            if (this.progress < 100) {
                // Délai variable pour sembler naturel
                const delay = this.progress < 30 ? 20 : this.progress < 70 ? 30 : 50;
                setTimeout(simulateLoading, delay);
            } else {
                // Attendre un peu avant de disparaître
                setTimeout(() => {
                    this.completeLoading();
                }, 300);
            }
        };
        
        // Démarrer après un court délai
        setTimeout(simulateLoading, 100);
    }

    completeLoading() {
        // Ajouter une animation de sortie
        this.preloader.classList.add('hidden');
        
        // Débloquer le défilement
        document.body.style.overflow = '';
        
        // Supprimer après l'animation
        setTimeout(() => {
            if (this.preloader && this.preloader.parentNode) {
                this.preloader.parentNode.removeChild(this.preloader);
            }
        }, 600);
    }
}

// Version encore plus simple (inline)
(function() {
    // Créer le preloader immédiatement
    const preloaderHTML = `
        <div id="simple-preloader" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: white;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        ">
            <div style="text-align: center;">
                <img src="/campusvibe-frontend/public/group.png" 
                     alt="Logo"
                     style="
                        width: 50px;
                        height: 50px;
                        object-fit: contain;
                        margin-bottom: 15px;
                     "
                     onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<div style=\"width:50px;height:50px;border-radius:8px;background:#003580;color:white;display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 15px;\">✝</div>' + this.parentElement.innerHTML;">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 3px solid #f3f3f3;
                    border-top: 3px solid #0071c2;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                "></div>
                <p style="
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                ">Chargement...</p>
            </div>
            
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                body.preloader-active { overflow: hidden; }
                #simple-preloader { transition: opacity 0.3s ease; }
                #simple-preloader.hidden { opacity: 0; pointer-events: none; }
            </style>
        </div>
    `;
    
    // Ajouter au body
    document.body.insertAdjacentHTML('afterbegin', preloaderHTML);
    document.body.classList.add('preloader-active');
    
    // Masquer quand la page est chargée
    window.addEventListener('load', function() {
        setTimeout(() => {
            const preloader = document.getElementById('simple-preloader');
            if (preloader) {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    if (preloader.parentNode) {
                        preloader.parentNode.removeChild(preloader);
                    }
                    document.body.classList.remove('preloader-active');
                }, 300);
            }
        }, 300);
    });
    
    // Fallback après 3 secondes
    setTimeout(() => {
        const preloader = document.getElementById('simple-preloader');
        if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
            document.body.classList.remove('preloader-active');
        }
    }, 6000);
})();