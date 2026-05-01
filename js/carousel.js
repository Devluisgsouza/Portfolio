// =============================================
//  PROJECTS CAROUSEL
//  ─ auto-scroll left→right, then smoothly back
//  ─ native scrollLeft — zero translateX
//  ─ pauses on hover / touch / drag
//  ─ resumes after 2 s of inactivity
//  ─ custom draggable scrollbar
//  ─ ← → buttons shown only when needed
// =============================================

(function () {

    var wrapper = document.querySelector('.carousel-wrapper');
    var track   = document.getElementById('carousel-track');
    var sbTrack = document.getElementById('carousel-scrollbar-track');
    var sbThumb = document.getElementById('carousel-scrollbar-thumb');
    var prevBtn = document.getElementById('proj-prev');
    var nextBtn = document.getElementById('proj-next');
    var hint    = document.querySelector('.scroll-hint');

    if (!wrapper || !track) return;

    /* ── constants ── */
    var AUTO_SPEED    = 0.5;    // px per frame going forward
    var RETURN_SPEED  = 0.35;   // px per frame returning (slower = smoother)
    var RESUME_DELAY  = 2000;   // ms idle before auto resumes

    /* ── state ── */
    var paused      = false;
    var returning   = false;    // true while scrolling back to start
    var resumeTimer = null;

    /* ── measurements ── */
    function cardStep() {
        var card = track.querySelector('.project-card');
        if (!card) return 364;
        var gap = parseInt(window.getComputedStyle(track).gap) || 24;
        return card.offsetWidth + gap;
    }

    function minScroll() {
        var first = track.querySelector('.project-card');
        return first ? first.offsetLeft : 0;
    }

    function maxScroll() {
        return wrapper.scrollWidth - wrapper.clientWidth;
    }

    /* ── scrollbar ── */
    function updateScrollbar() {
        if (!sbThumb || !sbTrack) return;
        var scrollable = maxScroll();
        if (scrollable <= 0) {
            sbThumb.style.width = '100%';
            sbThumb.style.left  = '0';
            return;
        }
        var ratio     = wrapper.clientWidth / wrapper.scrollWidth;
        var thumbW    = Math.max(32, sbTrack.clientWidth * ratio);
        var maxLeft   = sbTrack.clientWidth - thumbW;
        var thumbLeft = (wrapper.scrollLeft / scrollable) * maxLeft;
        sbThumb.style.width = thumbW + 'px';
        sbThumb.style.left  = thumbLeft + 'px';
    }

    /* ── overflow check ── */
    function checkOverflow() {
        var overflows = maxScroll() > 2;
        if (hint)    hint.classList.toggle('visible', overflows);
        if (prevBtn) prevBtn.style.display = overflows ? '' : 'none';
        if (nextBtn) nextBtn.style.display = overflows ? '' : 'none';
        updateScrollbar();
    }

    /* ── smooth scroll (for arrows + scrollbar click) ── */
    function smoothScrollTo(target) {
        target = Math.max(0, Math.min(maxScroll(), target));
        var start    = wrapper.scrollLeft;
        var distance = target - start;
        var duration = 400;
        var t0       = null;

        function step(now) {
            if (!t0) t0 = now;
            var t    = Math.min(1, (now - t0) / duration);
            var ease = t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
            wrapper.scrollLeft = start + distance * ease;
            updateScrollbar();
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    /* ── pause / resume ── */
    function pauseAuto() {
        paused = true;
        returning = false;
        clearTimeout(resumeTimer);
    }

    function scheduleResume() {
        clearTimeout(resumeTimer);
        resumeTimer = setTimeout(function () { paused = false; }, RESUME_DELAY);
    }

    /* ── auto-scroll loop ──────────────────────────────────────────
       Forward: advances AUTO_SPEED px per frame.
       When it hits the end, switches to "returning" mode.
       Returning: retreats RETURN_SPEED px per frame (same loop,
       different direction) until it reaches minScroll() again.
    ─────────────────────────────────────────────────────────────── */
    function autoScrollLoop() {
        if (!paused) {
            var mn = minScroll();
            var mx = maxScroll();

            if (mx > mn + 2) {          // only scroll if there's overflow
                if (!returning) {
                    /* ── going forward ── */
                    if (wrapper.scrollLeft >= mx - 1) {
                        returning = true;   // reached end, start return
                    } else {
                        wrapper.scrollLeft += AUTO_SPEED;
                        updateScrollbar();
                    }
                } else {
                    /* ── returning to start ── */
                    if (wrapper.scrollLeft <= mn + 1) {
                        returning = false;  // back at start, go forward again
                        wrapper.scrollLeft = mn;
                        updateScrollbar();
                    } else {
                        wrapper.scrollLeft -= RETURN_SPEED;
                        updateScrollbar();
                    }
                }
            }
        }

        requestAnimationFrame(autoScrollLoop);
    }

    /* ── arrow buttons ── */
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            pauseAuto();
            smoothScrollTo(Math.max(minScroll(), wrapper.scrollLeft - cardStep()));
            scheduleResume();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            pauseAuto();
            smoothScrollTo(wrapper.scrollLeft + cardStep());
            scheduleResume();
        });
    }

    /* ── pause on hover ── */
    wrapper.addEventListener('mouseenter', pauseAuto);
    wrapper.addEventListener('mouseleave', scheduleResume);

    /* ── mouse drag ── */
    var dragging  = false;
    var dragX     = 0;
    var dragStart = 0;

    wrapper.addEventListener('mousedown', function (e) {
        dragging  = true;
        dragX     = e.clientX;
        dragStart = wrapper.scrollLeft;
        pauseAuto();
        e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        wrapper.scrollLeft = dragStart - (e.clientX - dragX);
        updateScrollbar();
    });
    window.addEventListener('mouseup', function () {
        if (!dragging) return;
        dragging = false;
        scheduleResume();
    });

    /* ── touch: native scroll, just pause/resume auto ── */
    wrapper.addEventListener('touchstart', pauseAuto,       { passive: true });
    wrapper.addEventListener('touchend',   scheduleResume,  { passive: true });

    /* ── scrollbar thumb drag ── */
    var sbDragging  = false;
    var sbStartX    = 0;
    var sbStartLeft = 0;

    if (sbThumb) {
        sbThumb.addEventListener('mousedown', function (e) {
            sbDragging  = true;
            sbStartX    = e.clientX;
            sbStartLeft = wrapper.scrollLeft;
            pauseAuto();
            e.preventDefault();
        });
    }
    if (sbTrack) {
        sbTrack.addEventListener('click', function (e) {
            if (e.target === sbThumb) return;
            var rect = sbTrack.getBoundingClientRect();
            smoothScrollTo((e.clientX - rect.left) / rect.width * maxScroll());
            scheduleResume();
        });
    }
    window.addEventListener('mousemove', function (e) {
        if (!sbDragging) return;
        var thumbW = sbThumb ? sbThumb.offsetWidth : 0;
        var trackW = sbTrack ? sbTrack.clientWidth  : 1;
        var ratio  = maxScroll() / Math.max(1, trackW - thumbW);
        wrapper.scrollLeft = Math.max(0, Math.min(maxScroll(),
            sbStartLeft + (e.clientX - sbStartX) * ratio));
        updateScrollbar();
    });
    window.addEventListener('mouseup', function () {
        if (sbDragging) { sbDragging = false; scheduleResume(); }
    });

    /* ── sync scrollbar on native scroll ── */
    wrapper.addEventListener('scroll', updateScrollbar, { passive: true });

    /* ── resize ── */
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkOverflow, 100);
    });

    /* ── init ── */
    requestAnimationFrame(function () {
        wrapper.scrollLeft = minScroll();
        checkOverflow();
        autoScrollLoop();
    });

})();