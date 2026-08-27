/* ==========================================================================
   FONDATION MBOLE ASBL — JAVASCRIPT INTERACTIF
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initNavHighlight();
    initGalleryFilter();
    initBurgerMenu();
});

/* ─── HEADER SCROLL EFFECT ─── */
function initHeader() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        }
    });
}

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentId = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 140) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    });
}

/* ─── BURGER MENU MOBILE ─── */
function initBurgerMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
            });
        });
    }
}

/* ─── GALLERY FILTER ─── */
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const cat = item.getAttribute('data-category');
                const show = filter === 'all' || cat === filter;
                item.style.display = show ? '' : 'none';
                if (show) item.style.animation = 'fadeIn 0.4s ease';
            });
        });
    });
}

/* ─── MODALS ─── */
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.open').forEach(m => {
            m.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
});

/* ─── CONTACT FORM ─── */
function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('fullname').value;
    showToast(`Merci ${name} ! Votre message a bien été envoyé à la Fondation MBOLE ASBL.`);
    e.target.reset();
}

/* ─── TOAST NOTIFICATIONS ─── */
function showToast(message) {
    const zone = document.getElementById('toastZone');
    if (!zone) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i data-lucide="check-circle-2"></i><span>${message}</span>`;
    zone.appendChild(toast);

    lucide.createIcons({ nodes: [toast] });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(110%)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 5000);
}

/* ─── FadeIn animation ─── */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`;
document.head.appendChild(style);
