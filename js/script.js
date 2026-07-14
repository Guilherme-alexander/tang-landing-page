// =========================================================>
// MENU MOBILE
(() => {
    const toggle = document.querySelector('.menu-toggle');
    const list = document.querySelector('.menu-mobile ul');
    if (!toggle || !list) return;

    toggle.addEventListener('click', () => {
        const isOpen = list.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    list.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            list.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
})();

// =========================================================>
// SLIDER HEADER
(() => {
    const slides = document.querySelectorAll('.slider .slider-track img');
    const bullets = document.querySelectorAll('.bullets-single');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function goTo(index) {
        slides[current].classList.remove('active');
        bullets[current].classList.remove('active-bullets');
        bullets[current].setAttribute('aria-selected', 'false');

        current = index;

        slides[current].classList.add('active');
        bullets[current].classList.add('active-bullets');
        bullets[current].setAttribute('aria-selected', 'true');
    }

    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            goTo(index);
            restart();
        });
    });

    function restart() {
        clearInterval(timer);
        timer = setInterval(() => goTo((current + 1) % slides.length), 6000);
    }
    restart();
})();

// =========================================================>
// SESSÃO SABOR — mixer de sabores
(() => {
    const root = document.documentElement;
    const jarra = document.getElementById('jarra');
    const nome = document.getElementById('sabor-nome');
    const buttons = document.querySelectorAll('.sabor-btn');
    if (!jarra || !buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const { flavor, color, jarra: jarraSrc } = btn.dataset;

            root.style.setProperty('--cor1', color);
            jarra.src = jarraSrc;
            jarra.alt = `Jarra com suco de ${flavor}`;
            nome.textContent = flavor;

            buttons.forEach(b => b.setAttribute('aria-pressed', 'false'));
            btn.setAttribute('aria-pressed', 'true');

            btn.classList.remove('pop');
            void btn.offsetWidth; // restart animation
            btn.classList.add('pop');
        });
    });
})();

// =========================================================>
// FORM + TOAST
(() => {
    const form = document.querySelector('#contato form');
    const toast = document.querySelector('.toast');
    const closeBtn = document.querySelector('.toast .close');
    if (!form || !toast) return;

    let hideTimer;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        toast.classList.add('active');
        form.reset();

        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => toast.classList.remove('active'), 5000);
    });

    closeBtn?.addEventListener('click', () => {
        toast.classList.remove('active');
        clearTimeout(hideTimer);
    });
})();

// =========================================================>
// SCROLL REVEAL
(() => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('in-view'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    items.forEach(el => observer.observe(el));
})();
