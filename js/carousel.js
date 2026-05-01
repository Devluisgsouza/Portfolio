// =============================================
//  PROJECTS CAROUSEL
//  - Button nav (← →)
//  - Click & drag (mouse + touch)
//  - Dot indicators
//  - Keyboard arrows (when focused)
// =============================================

(function () {
    const track    = document.getElementById('carousel-track');
    const dotsWrap = document.getElementById('carousel-dots');
    const prevBtn  = document.getElementById('proj-prev');
    const nextBtn  = document.getElementById('proj-next');

    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    const total = cards.length;
    let current = 0;

    // ---- Dots ----
    const dots = cards.map((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', 'Project ' + (i + 1));
        btn.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(btn);
        return btn;
    });

    function getCardWidth() {
        const card = cards[0];
        if (!card) return 0;
        const style  = window.getComputedStyle(track);
        const gap    = parseFloat(style.gap) || 24;
        return card.offsetWidth + gap;
    }

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        track.style.transform = `translateX(-${current * getCardWidth()}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === total - 1;
        prevBtn.style.opacity = current === 0 ? '0.35' : '1';
        nextBtn.style.opacity = current === total - 1 ? '0.35' : '1';
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // ---- Keyboard ----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // ---- Drag (mouse) ----
    let dragStartX  = 0;
    let dragDeltaX  = 0;
    let isDragging  = false;
    const THRESHOLD = 60;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragDeltaX = 0;
        track.style.transition = 'none';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragDeltaX = e.clientX - dragStartX;
        const base = current * getCardWidth();
        track.style.transform = `translateX(${-base + dragDeltaX}px)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = '';
        if (dragDeltaX < -THRESHOLD) goTo(current + 1);
        else if (dragDeltaX > THRESHOLD) goTo(current - 1);
        else goTo(current);
    });

    // ---- Touch ----
    let touchStartX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        track.style.transition = 'none';
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        track.style.transition = '';
        const delta = e.changedTouches[0].clientX - touchStartX;
        if (delta < -THRESHOLD) goTo(current + 1);
        else if (delta > THRESHOLD) goTo(current - 1);
        else goTo(current);
    });

    // ---- Recalc on resize ----
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => goTo(current), 100);
    });

    goTo(0);
})();