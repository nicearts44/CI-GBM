// animations.js - Animations interactives pour le site CI-GBM

class ScrollAnimations {
    constructor() {
        this.animatedElements = [];
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.findAnimatedElements();
        this.observeElements();
        
        // Ajouter des animations au défilement
        window.addEventListener('scroll', () => this.handleScrollAnimations());
        
        // Initialiser les animations
        this.handleScrollAnimations();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
    }
    
    findAnimatedElements() {
        // Sélectionner tous les éléments qui doivent être animés
        const elements = document.querySelectorAll('.mission-card, .project-card, .feature-card, .mv-card, .stat-item');
        this.animatedElements = Array.from(elements);
    }
    
    observeElements() {
        this.animatedElements.forEach(element => {
            // Ajouter la classe de base pour l'animation
            element.classList.add('animate-on-scroll');
            this.observer.observe(element);
        });
    }
    
    handleScrollAnimations() {
        // Animation pour les éléments de statistiques (compteurs)
        this.animateCounters();
        
        // Animation pour la barre de progression (si présente)
        this.animateProgressBars();
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // Plus la valeur est basse, plus l'animation est rapide
        
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                const target = parseInt(counter.getAttribute('data-count'));
                const count = +counter.innerText;
                const increment = Math.ceil(target / speed);
                
                if (count < target) {
                    counter.innerText = Math.min(count + increment, target);
                    setTimeout(() => this.animateCounters(), 1);
                } else {
                    counter.innerText = target;
                    counter.classList.add('animated');
                }
            }
        });
    }
    
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const value = bar.getAttribute('data-value');
            bar.style.width = value + '%';
        });
    }
}

class ParallaxEffect {
    constructor() {
        this.parallaxElements = [];
        this.init();
    }
    
    init() {
        this.findParallaxElements();
        
        if (this.parallaxElements.length > 0) {
            window.addEventListener('scroll', () => this.applyParallax());
            this.applyParallax(); // Appliquer au chargement initial
        }
    }
    
    findParallaxElements() {
        const elements = document.querySelectorAll('[data-parallax]');
        this.parallaxElements = Array.from(elements);
    }
    
    applyParallax() {
        const scrollPosition = window.pageYOffset;
        
        this.parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax-speed')) || 0.5;
            const direction = element.getAttribute('data-parallax-direction') || 'vertical';
            const limit = element.getAttribute('data-parallax-limit') || null;
            
            let movement = scrollPosition * speed;
            
            // Appliquer une limite si spécifiée
            if (limit && movement > limit) {
                movement = limit;
            }
            
            if (direction === 'vertical') {
                element.style.transform = `translateY(${movement}px)`;
            } else if (direction === 'horizontal') {
                element.style.transform = `translateX(${movement}px)`;
            }
        });
    }
}

class HoverEffects {
    constructor() {
        this.hoverElements = [];
        this.init();
    }
    
    init() {
        this.findHoverElements();
        this.applyHoverEffects();
    }
    
    findHoverElements() {
        const elements = document.querySelectorAll('.card-hover, .hover-effect');
        this.hoverElements = Array.from(elements);
    }
    
    applyHoverEffects() {
        this.hoverElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.handleHoverEnter(e, element);
            });
            
            element.addEventListener('mouseleave', (e) => {
                this.handleHoverLeave(e, element);
            });
        });
    }
    
    handleHoverEnter(e, element) {
        element.classList.add('hover-active');
        
        // Effet d'élévation pour les cartes
        if (element.classList.contains('card-hover')) {
            element.style.transform = 'translateY(-10px)';
            element.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        }
        
        // Effet de zoom pour les images
        if (element.classList.contains('image-hover')) {
            element.style.transform = 'scale(1.05)';
        }
    }
    
    handleHoverLeave(e, element) {
        element.classList.remove('hover-active');
        
        if (element.classList.contains('card-hover')) {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        }
        
        if (element.classList.contains('image-hover')) {
            element.style.transform = 'scale(1)';
        }
    }
}

class PageTransitions {
    constructor() {
        this.init();
    }
    
    init() {
        this.preventUnwantedTransitions();
        this.applyPageLoadAnimation();
    }
    
    preventUnwantedTransitions() {
        // Désactiver les transitions pendant le chargement de la page
        document.body.classList.add('preload');
        
        window.addEventListener('load', () => {
            document.body.classList.remove('preload');
        });
    }
    
    applyPageLoadAnimation() {
        // Animation d'entrée de page
        document.body.classList.add('page-loaded');
    }
    
    navigateTo(url) {
        // Animation de sortie de page
        document.body.classList.add('page-exiting');
        
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
}

// Initialiser toutes les animations lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const scrollAnimations = new ScrollAnimations();
    const parallax = new ParallaxEffect();
    const hoverEffects = new HoverEffects();
    const pageTransitions = new PageTransitions();
    
    // Exposer les animations globalement pour un accès externe si nécessaire
    window.CIGBMAnimations = {
        scroll: scrollAnimations,
        parallax: parallax,
        hover: hoverEffects,
        transitions: pageTransitions
    };
    
    // Appliquer l'animation des compteurs lorsqu'ils deviennent visibles
    const statsSection = document.querySelector('.impact-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    scrollAnimations.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
});

// Fonction utilitaire pour les animations de débordement de texte
function animateTextOverflow(element, duration = 1000) {
    const text = element.textContent;
    element.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.textContent += text[i];
        }, i * (duration / text.length));
    }
}

// Fonction pour animer l'apparition séquentielle d'éléments
function animateStaggeredAppearance(elements, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * delay);
    });
}

