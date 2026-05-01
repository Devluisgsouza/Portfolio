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

// Projects — animate each card individually with interval
// Using .project-card directly so ALL cards animate regardless of count
see.reveal('.project-card', {
    duration: 900,
    distance: '32px',
    origin: 'bottom',
    interval: 80,   // stagger between each card
});

// Also reveal the section header (kept img-port-1 class there)
see.reveal('.img-port-1', {
    duration: 1000,
    distance: '40px',
    origin: 'bottom',
});

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