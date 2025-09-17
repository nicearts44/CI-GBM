// gallery.js - Gestion des galeries d'images et des modales

class ProjectGallery {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.projectLinks = document.querySelectorAll('.project-view-details');
        this.init();
    }
    
    init() {
        // Initialiser les modales
        this.setupModals();
        
        // Initialiser les filtres de projets
        this.setupFilters();
        
        // Initialiser la pagination
        this.setupPagination();
        
        // Initialiser les galeries d'images à l'intérieur des modales
        this.setupImageGalleries();
    }
    
    setupModals() {
        // Ajouter les écouteurs d'événements pour ouvrir les modales
        this.projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = link.getAttribute('href');
                this.openModal(modalId);
            });
        });
        
        // Ajouter les écouteurs pour fermer les modales
        this.modals.forEach(modal => {
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    this.closeModal(modal);
                });
            }
            
            // Fermer la modale en cliquant à l'extérieur
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // Fermer avec la touche Échap
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.querySelector(modalId);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Empêcher le défilement
        }
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Rétablir le défilement
    }
    
    closeAllModals() {
        this.modals.forEach(modal => {
            this.closeModal(modal);
        });
    }
    
    setupFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const yearFilter = document.getElementById('year-filter');
        const sortFilter = document.getElementById('sort-filter');
        const resetButton = document.getElementById('reset-filters');
        
        if (categoryFilter && yearFilter && sortFilter) {
            categoryFilter.addEventListener('change', () => this.filterProjects());
            yearFilter.addEventListener('change', () => this.filterProjects());
            sortFilter.addEventListener('change', () => this.filterProjects());
        }
        
        if (resetButton) {
            resetButton.addEventListener('click', () => this.resetFilters());
        }
    }
    
    filterProjects() {
        const categoryValue = document.getElementById('category-filter').value;
        const yearValue = document.getElementById('year-filter').value;
        const sortValue = document.getElementById('sort-filter').value;
        
        const projects = document.querySelectorAll('.project-detail');
        
        projects.forEach(project => {
            const projectCategory = project.getAttribute('data-category');
            const projectYear = project.getAttribute('data-year');
            
            let showProject = true;
            
            // Filtrage par catégorie
            if (categoryValue !== 'all' && projectCategory !== categoryValue) {
                showProject = false;
            }
            
            // Filtrage par année
            if (yearValue !== 'all' && projectYear !== yearValue) {
                showProject = false;
            }
            
            // Afficher ou masquer le projet
            project.style.display = showProject ? 'block' : 'none';
        });
        
        // Trier les projets
        this.sortProjects(sortValue);
    }
    
    sortProjects(criteria) {
        const projectsGrid = document.getElementById('projects-grid');
        const projects = Array.from(document.querySelectorAll('.project-detail'));
        
        projects.sort((a, b) => {
            switch(criteria) {
                case 'newest':
                    return b.getAttribute('data-year') - a.getAttribute('data-year');
                case 'oldest':
                    return a.getAttribute('data-year') - b.getAttribute('data-year');
                case 'popular':
                    return b.getAttribute('data-popularity') - a.getAttribute('data-popularity');
                default:
                    return 0;
            }
        });
        
        // Vider et réinsérer les projets triés
        projects.forEach(project => {
            projectsGrid.appendChild(project);
        });
    }
    
    resetFilters() {
        document.getElementById('category-filter').value = 'all';
        document.getElementById('year-filter').value = 'all';
        document.getElementById('sort-filter').value = 'newest';
        
        this.filterProjects();
    }
    
    setupPagination() {
        const paginationButtons = document.querySelectorAll('.pagination-button');
        
        paginationButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retirer la classe active de tous les boutons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                button.classList.add('active');
                
                // Ici, vous chargeriez les projets pour la page sélectionnée
                // Cette fonctionnalité nécessiterait une intégration backend
                console.log('Chargement de la page:', button.textContent);
            });
        });
    }
    
    setupImageGalleries() {
        // Initialiser les galeries d'images à l'intérieur des modales
        const projectGalleries = document.querySelectorAll('.project-gallery');
        
        projectGalleries.forEach(gallery => {
            const mainImage = gallery.querySelector('img');
            const thumbnails = gallery.querySelectorAll('.gallery-thumbnails img');
            
            if (mainImage && thumbnails.length > 0) {
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', () => {
                        mainImage.src = thumb.src;
                        mainImage.alt = thumb.alt;
                    });
                });
            }
        });
    }
}

// Initialiser la galerie lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const gallery = new ProjectGallery();
    
    // Exposer la galerie globalement pour un accès externe si nécessaire
    window.CIGBMGallery = gallery;
});

// Fonction utilitaire pour précharger les images
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}
 
