// =============================================
//  PROJECTS CAROUSEL — fixed
//  - Centers cards when all fit in viewport
//  - Hides nav + dots when not needed
//  - Never clips cards (offset-based, not padding)
//  - Drag (mouse + touch) + keyboard
// =============================================

(function () {
    const track    = document.getElementById('carousel-track');
    const wrapper  = document.querySelector('.carousel-wrapper');
    const dotsWrap = document.getElementById('carousel-dots');
    const prevBtn  = document.getElementById('proj-prev');
    const nextBtn  = document.getElementById('proj-next');
    const section  = document.querySelector('.site-projects');

    if (!track || !wrapper) return;

    const GAP = 24;
    const cards = Array.from(track.querySelectorAll('.project-card'));
    const total = cards.length;
    let current = 0;
    let fitMode = false;

    // ---- Build dots ----
    const dots = cards.map((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        btn.setAttribute('aria-label', 'Project ' + (i + 1));
        btn.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(btn);
        return btn;
    });

    function getCardWidth()      { return cards[0] ? cards[0].offsetWidth : 0; }
    function getTotalTrackWidth(){ return total * getCardWidth() + (total - 1) * GAP; }
    function getViewportWidth()  { return wrapper.clientWidth; }

    function getBaseOffset() {
        const vw = getViewportWidth();
        const cw = getCardWidth();
        const tw = getTotalTrackWidth();
        return fitMode
            ? Math.max(0, (vw - tw) / 2)   // center whole track
            : Math.max(0, (vw - cw) / 2);  // center first card
    }

    function updateControls() {
        fitMode = getTotalTrackWidth() <= getViewportWidth();
        if (section) section.classList.toggle('carousel-controls-hidden', fitMode);
        dotsWrap.classList.toggle('carousel-dots-hidden', fitMode);
        if (!fitMode) {
            prevBtn.style.opacity = current === 0 ? '0.35' : '1';
            nextBtn.style.opacity = current === total - 1 ? '0.35' : '1';
            prevBtn.disabled = current === 0;
            nextBtn.disabled = current === total - 1;
        }
    }

    function goTo(index, animate) {
        if (animate === undefined) animate = true;
        current = Math.max(0, Math.min(index, total - 1));
        updateControls();

        const baseOffset = getBaseOffset();
        const cw = getCardWidth();
        const translateX = fitMode
            ? baseOffset
            : baseOffset - current * (cw + GAP);

        track.style.transition = animate
            ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'none';
        if (!animate) track.getBoundingClientRect(); // flush
        track.style.transform = 'translateX(' + translateX + 'px)';

        dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    prevBtn.addEventListener('click', function() { goTo(current - 1); });
    nextBtn.addEventListener('click', function() { goTo(current + 1); });

    document.addEventListener('keydown', function(e) {
        if (fitMode) return;
        if (e.key === 'ArrowLeft')  goTo(current - 1);
        if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Drag
    var dragStartX = 0, dragDeltaX = 0, isDragging = false;
    var THRESHOLD = 60;

    track.addEventListener('mousedown', function(e) {
        if (fitMode) return;
        isDragging = true;
        dragStartX = e.clientX;
        dragDeltaX = 0;
        track.style.transition = 'none';
    });
    window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        dragDeltaX = e.clientX - dragStartX;
        var base = getBaseOffset() - current * (getCardWidth() + GAP);
        track.style.transform = 'translateX(' + (base + dragDeltaX) + 'px)';
    });
    window.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        if (dragDeltaX < -THRESHOLD)     goTo(current + 1);
        else if (dragDeltaX > THRESHOLD) goTo(current - 1);
        else                              goTo(current);
    });

    // Touch
    var touchStartX = 0;
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        track.style.transition = 'none';
    }, { passive: true });
    track.addEventListener('touchend', function(e) {
        var delta = e.changedTouches[0].clientX - touchStartX;
        if (delta < -THRESHOLD)     goTo(current + 1);
        else if (delta > THRESHOLD) goTo(current - 1);
        else                         goTo(current);
    });

    // Resize
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() { goTo(current, false); }, 80);
    });

    goTo(0, false);
})();