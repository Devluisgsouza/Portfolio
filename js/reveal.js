window.see = ScrollReveal({ reset: true });

// Hero
see.reveal('.efect-txt-top', {
    duration: 1200,
    distance: '40px',
    origin: 'bottom',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

see.reveal('.efetc-img-top', {
    duration: 1200,
    distance: '40px',
    origin: 'bottom',
    delay: 150,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
});

// Section titles
see.reveal('.title', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
});

// Profile
see.reveal('.efect-profile', {
    duration: 1200,
    distance: '40px',
    origin: 'bottom',
});

see.reveal('.icons', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    delay: 100,
});

// Revela os cards do carousel quando a seção entra no viewport
var projectSection = document.querySelector('.site-projects');
if (projectSection) {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var cards = document.querySelectorAll('.project-card');
                cards.forEach(function(card, i) {
                    setTimeout(function() {
                        card.style.visibility = 'visible';
                        card.style.animation = 'cardFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    }, i * 80);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });
    observer.observe(projectSection);
}

// Contacts
see.reveal('.efect-contacts', {
    duration: 1200,
    distance: '40px',
    origin: 'bottom',
});

see.reveal('.social-icons', {
    duration: 1000,
    distance: '30px',
    origin: 'bottom',
    delay: 120,
});