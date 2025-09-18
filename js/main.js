// main.js - Fonctionnalités principales du site CI-GBM

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const closeBtn = document.getElementById('close-btn');
    const tabButtons = document.querySelectorAll('.tab-button');


    // Gestions du programme hackathon
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const day = button.getAttribute('data-day');

            tabButtons.forEach(btn => btn.classList.remove('active'));

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            button.classList.add('active');
            document.getElementById(day).classList.add('active');
        });
    });
    
    // Ouvrir le menu
    menuToggle.addEventListener('click', function() {
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Fermer le menu
    closeBtn.addEventListener('click', function() {
        navOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-overlay-content a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Animation du menu hamburger
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Gestion des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Ici, vous ajouterez la logique de soumission des formulaires
            console.log('Formulaire soumis');
        });
    });
    
    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.mission-card, .project-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialisation des animations
    const animatedElements = document.querySelectorAll('.mission-card, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Déclencher une première fois au chargement
    animateOnScroll();
    
    // Gestion des erreurs de chargement d'images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkeT0iLjM1ZW0iIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM5OTkiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
            this.alt = 'Image non disponible';
        });
    });
});

// Gestionnaire d'événements pour les liens externes
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
});

// Fonction pour le chargement paresseux des images
if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy');
                lazyImageObserver.unobserve(lazyImage);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
}

// Gestion des messages utilisateur
function showMessage(message, type = 'success') {
    // Créer l'élément de message
    const messageEl = document.createElement('div');
    messageEl.className = `user-message ${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    if (type === 'success') {
        messageEl.style.background = '#43A047';
    } else if (type === 'error') {
        messageEl.style.background = '#E53935';
    } else {
        messageEl.style.background = '#2C5FA8';
    }
    
    document.body.appendChild(messageEl);
    
    // Afficher le message
    setTimeout(() => {
        messageEl.style.opacity = 1;
        messageEl.style.transform = 'translateX(0)';
    }, 100);
    
    // Cacher le message après 5 secondes
    setTimeout(() => {
        messageEl.style.opacity = 0;
        messageEl.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 5000);
}

// Export des fonctions pour une utilisation ailleurs
window.CIGBM = {
    showMessage: showMessage
};

