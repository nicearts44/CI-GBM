// countdown.js - Gestion du compte à rebours pour les événements CI-GBM

class Countdown {
    constructor(targetDate, elements) {
        this.targetDate = new Date(targetDate).getTime();
        this.elements = elements;
        this.interval = null;
        this.lastSeconds = null;
        this.hasExpired = false;
        
        // Initialiser immédiatement
        this.updateCountdown();
        
        // Démarrer le compte à rebours
        this.start();
    }
    
    start() {
        this.interval = setInterval(() => {
            this.updateCountdown();
        }, 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
    
    updateCountdown() {
        if (this.hasExpired) return;
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance <= 0) {
            this.stop();
            this.handleExpired();
            this.handleExpired = true;
            return;
        }
        
        // Calculer le temps restant
        const totalSeconds = Math.floor(distance / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / (60));
        const seconds = Math.floor(totalSeconds % (60));
        
        // Mettre à jour les éléments HTML
        if (this.elements.days) {
            this.elements.days.textContent = days.toString().padStart(2, '0');
        }
        
        if (this.elements.hours) {
            this.elements.hours.textContent = hours.toString().padStart(2, '0');
        }
        
        if (this.elements.minutes) {
            this.elements.minutes.textContent = minutes.toString().padStart(2, '0');
        }
        
        if (this.elements.seconds) {
            this.elements.seconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        // Animation des flip cards (optionnel)
        this.animateFlip(seconds);
    }
    
    animateFlip(currentSeconds) {
        // Ajouter une classe d'animation à chaque changement de seconde
        if (this.elements.seconds && currentSeconds !== this.lastSeconds) {
            this.elements.seconds.parentElement.classList.add('flipping');
            
            setTimeout(() => {
                if (this.elements.seconds) {
                    this.elements.seconds.parentElement.classList.remove('flipping');
                }
            }, 500);
            
            this.lastSeconds = currentSeconds;
        }
    }
    
    handleExpired() {
        // Message lorsque le compte à rebours est terminé
        if (this.elements.days) this.elements.days.textContent = '00';
        if (this.elements.hours) this.elements.hours.textContent = '00';
        if (this.elements.minutes) this.elements.minutes.textContent = '00';
        if (this.elements.seconds) this.elements.seconds.textContent = '00';
        
        // Afficher un message ou déclencher une action
        const countdownElement = document.querySelector('.countdown');
        if (countdownElement && !countdownElement.querySelector('.countdown-expired')) {
            const expiredMessage = document.createElement('div');
            expiredMessage.className = 'countdown-expired';
            expiredMessage.innerHTML = `
                <h3>L'événement a commencé!</h3>
                <p>Rejoignez-nous dès maintenant ou consultez les résultats prochainement.</p>
                <a href="hackathon.html" class="cta-button">Voir les détails</a>
            `;
            
            countdownElement.appendChild(expiredMessage);
        }
        
        // Émettre un événement personnalisé
        window.dispatchEvent(new CustomEvent('countdownExpired', {
            detail: { targetDate: this.targetDate }
        }));
    }
    
    // Méthode pour formater la durée restante en texte lisible
    getFormattedTime() {
        const now = new Date().getTime();
        const distance = this.targetDate - now;
        
        if (distance < 0) {
            return "L'événement a commencé";
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (days > 0) {
            return `Dans ${days} jour${days > 1 ? 's' : ''} et ${hours} heure${hours > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            return `Dans ${hours} heure${hours > 1 ? 's' : ''} et ${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return `Dans ${minutes} minute${minutes > 1 ? 's' : ''} et ${seconds} seconde${seconds > 1 ? 's' : ''}`;
        }
    }
}

// Initialisation du compte à rebours lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Date cible pour le prochain événement (à modifier selon les besoins)
    const nextEventDate = '2025-10-04T23:59:00';
    
    // Éléments HTML pour afficher le compte à rebours
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };
    
    // Créer une instance du compte à rebours
    if (countdownElements.days && countdownElements.hours && countdownElements.minutes && countdownElements.seconds){

        eventCountdown = new Countdown(nextEventDate, countdownElements);
    }
    
    // Exposer l'instance globalement pour un accès externe si nécessaire
    window.CIGBMCountdown = eventCountdown;
    
    // Gestionnaire pour l'événement de fin de compte à rebours
    window.addEventListener('countdownExpired', function(e) {
        console.log('Le compte à rebours est terminé pour la date:', new Date(e.detail.targetDate));
        // Ajouter ici des actions supplémentaires à effectuer
    });
    
    // Fonction pour mettre à jour dynamiquement la date cible
    window.updateCountdownDate = function(newDate) {
        eventCountdown.stop();
        eventCountdown.targetDate = new Date(newDate).getTime();
        eventCountdown.start();
    };
});

// Extension pour gérer plusieurs comptes à rebours sur la même page
class MultiCountdown {
    constructor(containers) {
        this.containers = containers;
        this.countdowns = [];
        
        this.init();
    }
    
    init() {
        this.containers.forEach(container => {
            const targetDate = container.dataset.targetDate;
            const elements = {
                days: container.querySelector('.countdown-days'),
                hours: container.querySelector('.countdown-hours'),
                minutes: container.querySelector('.countdown-minutes'),
                seconds: container.querySelector('.countdown-seconds')
            };
            
            if (targetDate) {
                const countdown = new Countdown(targetDate, elements);
                this.countdowns.push(countdown);
            }
        });
    }
    
    stopAll() {
        this.countdowns.forEach(countdown => countdown.stop());
    }
}
 
