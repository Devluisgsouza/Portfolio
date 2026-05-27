// =============================================
//  PORTFOLIO — Typewriter + Project Modal
// =============================================

(function () {
    'use strict';

    /* ── Project data ──────────────────────────── */
    var projects = {
        vitto: {
            number: '01',
            name: 'Vitto',
            type: 'SaaS / Web App',
            featured: true,
            description: 'SaaS de gestão inteligente para clínicas e consultórios brasileiros. Automatiza agenda, prontuários por voz, atendimento via WhatsApp com IA e controle financeiro — tudo em uma plataforma.',
            stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Drizzle', 'PostgreSQL', 'Anthropic AI', 'WhatsApp API', 'Neon', 'Resend', 'Clerk'],
            features: [
                'Agenda inteligente com confirmação automática via WhatsApp',
                'Prontuário eletrônico gerado por voz com IA',
                'Agente de WhatsApp 24h para confirmações e reengajamento',
                'Financeiro automatizado com cobranças e relatórios',
                'Dashboard em tempo real com métricas da clínica',
                'Multi-profissional e LGPD compliant'
            ],
            link: 'https://vitto-eta.vercel.app/',
            linkLabel: 'Ver Projeto ↗'
        },
        costs: {
            number: '02',
            name: 'Costs',
            type: 'Web App',
            featured: false,
            description: 'Sistema web de gerenciamento de custos de projetos com rastreamento de orçamento em tempo real e alocação de serviços.',
            stack: ['React', 'CSS', 'JavaScript'],
            features: [
                'Cadastro de projetos e serviços',
                'Controle de orçamento em tempo real',
                'Interface responsiva e intuitiva'
            ],
            link: 'https://costsprojects.netlify.app/',
            linkLabel: 'Ver Projeto ↗'
        },
        weather: {
            number: '03',
            name: 'Weather City',
            type: 'Web App',
            featured: false,
            description: 'Aplicativo de previsão do tempo com busca por cidade e dados em tempo real consumidos de API pública.',
            stack: ['HTML', 'CSS', 'JavaScript', 'OpenWeather API'],
            features: [
                'Busca por qualquer cidade do mundo',
                'Dados meteorológicos em tempo real',
                'Interface limpa e responsiva'
            ],
            link: 'https://weathercitypage.netlify.app/',
            linkLabel: 'Ver Projeto ↗'
        },
        users: {
            number: '04',
            name: 'Users List',
            type: 'Repository',
            featured: false,
            description: 'Aplicação para busca e visualização de usuários consumindo API pública do GitHub.',
            stack: ['HTML', 'CSS', 'JavaScript', 'GitHub API'],
            features: [
                'Busca de usuários por nome de usuário',
                'Listagem de perfis com informações públicas',
                'Consumo de API REST do GitHub'
            ],
            link: 'https://github.com/Devluisgsouza/users-list',
            linkLabel: 'Ver no GitHub ↗'
        }
    };

    /* ── Typewriter ─────────────────────────────── */
    function typeWriter(el, text, speed) {
        if (!el) return;
        el.textContent = '';
        var i = 0;
        function step() {
            if (i < text.length) {
                el.textContent += text[i];
                i++;
                setTimeout(step, speed || 65);
            }
        }
        setTimeout(step, 600);
    }

    typeWriter(document.getElementById('hero-role'), 'Desenvolvedor de Software', 65);

    /* ── Modal elements ─────────────────────────── */
    var overlay   = document.getElementById('modal-overlay');
    var container = document.getElementById('modal-container');
    var bodyEl    = document.getElementById('modal-body');
    var closeBtn  = document.getElementById('modal-close');

    if (!overlay || !container || !bodyEl || !closeBtn) return;

    var lastFocused = null;

    /* ── Build modal HTML ── */
    function buildModal(id) {
        var p = projects[id];
        if (!p) return '';

        var stackHTML = p.stack.map(function (s) {
            return '<span>' + s + '</span>';
        }).join('');

        var featuresHTML = p.features.map(function (f) {
            return '<li>' + f + '</li>';
        }).join('');

        var featuredBadge = p.featured
            ? '<span class="modal-featured-badge">✦ Featured Project</span>'
            : '';

        return (
            '<div class="modal-project-header">' +
                '<div class="modal-meta dm-mono">' +
                    '<span class="modal-num">' + p.number + '</span>' +
                    '<span class="modal-type-tag">' + p.type + '</span>' +
                    featuredBadge +
                '</div>' +
                '<h2 class="modal-title" id="modal-title">' + p.name + '</h2>' +
            '</div>' +
            '<p class="modal-desc">' + p.description + '</p>' +
            '<div class="modal-section">' +
                '<span class="modal-section-label dm-mono">// stack</span>' +
                '<div class="modal-stack">' + stackHTML + '</div>' +
            '</div>' +
            '<div class="modal-section">' +
                '<span class="modal-section-label dm-mono">// funcionalidades</span>' +
                '<ul class="modal-features">' + featuresHTML + '</ul>' +
            '</div>' +
            '<div class="modal-footer">' +
                '<a href="' + p.link + '" target="_blank" rel="noopener noreferrer" class="modal-cta">' +
                    p.linkLabel +
                '</a>' +
            '</div>'
        );
    }

    function openModal(id) {
        var p = projects[id];
        if (!p) return;

        lastFocused = document.activeElement;
        bodyEl.innerHTML = buildModal(id);
        container.scrollTop = 0;

        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';

        // Focus close button after transition
        setTimeout(function () { closeBtn.focus(); }, 100);
    }

    function closeModal() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Restore focus
        if (lastFocused) {
            setTimeout(function () {
                if (lastFocused) lastFocused.focus();
            }, 300);
        }
    }

    /* ── Close triggers ── */
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('open')) {
            closeModal();
        }
    });

    /* ── Focus trap inside modal ── */
    container.addEventListener('keydown', function (e) {
        if (e.key !== 'Tab') return;
        var focusable = container.querySelectorAll(
            'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        var first = focusable[0];
        var last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
    });

    /* ── Tech Card: code animation + parallax ── */
    (function () {
        var codeLines = [
            '<span class="code-cm">// developer.ts</span>',
            '',
            '<span class="code-kw">const</span> <span class="code-acc">dev</span> <span class="code-op">=</span> <span class="code-op">{</span>',
            '  <span class="code-acc">name</span><span class="code-op">:</span>   <span class="code-str">"Luis Guilherme"</span><span class="code-op">,</span>',
            '  <span class="code-acc">role</span><span class="code-op">:</span>   <span class="code-str">"Software Developer"</span><span class="code-op">,</span>',
            '  <span class="code-acc">stack</span><span class="code-op">:</span>  <span class="code-op">[</span>',
            '    <span class="code-str">"Next.js"</span><span class="code-op">,</span> <span class="code-str">"React"</span><span class="code-op">,</span>',
            '    <span class="code-str">"TypeScript"</span><span class="code-op">,</span> <span class="code-str">"Node.js"</span><span class="code-op">,</span>',
            '    <span class="code-str">"JavaScript"</span><span class="code-op">,</span> <span class="code-str">"PostgreSQL"</span><span class="code-op">,</span>',
            '    <span class="code-str">"etc..."</span><span class="code-op">,</span>',
            '  <span class="code-op">],</span>',
            '  <span class="code-acc">status</span><span class="code-op">:</span> <span class="code-str">"disponível ✓"</span><span class="code-op">,</span>',
            '  <span class="code-acc">location</span><span class="code-op">:</span> <span class="code-str">"Brasil - SP"</span><span class="code-op">,</span>',
            '<span class="code-op">}</span>',
        ];
        var lineDelays = [55, 25, 75, 88, 88, 72, 86, 86, 70, 88, 65];

        var container = document.getElementById('code-lines');
        if (container) {
            var lineIdx = 0;
            function appendLine() {
                if (lineIdx >= codeLines.length) {
                    var lastLine = container.lastElementChild;
                    if (lastLine) {
                        var cur = document.createElement('span');
                        cur.className = 'code-cursor';
                        lastLine.appendChild(cur);
                    }
                    return;
                }
                var div = document.createElement('div');
                div.className = 'code-line';
                div.innerHTML = codeLines[lineIdx] || ' ';
                container.appendChild(div);
                var delay = lineDelays[lineIdx] !== undefined ? lineDelays[lineIdx] : 80;
                lineIdx++;
                setTimeout(appendLine, delay);
            }
            setTimeout(appendLine, 1400);
        }

        /* 3-D parallax tilt on mouse move */
        var card = document.getElementById('hero-tech-card');
        var win  = document.getElementById('tech-window');
        if (!card || !win) return;

        var ticking = false;
        card.addEventListener('mousemove', function (e) {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function () {
                var rect = card.getBoundingClientRect();
                var dx = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
                var dy = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
                win.style.transition = 'transform 0.08s linear, box-shadow 0.35s ease';
                win.style.transform  = 'perspective(900px) rotateX(' + (-dy * 6) + 'deg) rotateY(' + (dx * 9) + 'deg) scale(1.01)';
                ticking = false;
            });
        });

        card.addEventListener('mouseleave', function () {
            win.style.transition = 'transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease';
            win.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }());

    /* ── Card click / keyboard ── */
    document.querySelectorAll('[data-project]').forEach(function (card) {
        card.addEventListener('click', function () {
            openModal(card.dataset.project);
        });
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(card.dataset.project);
            }
        });
    });

})();
