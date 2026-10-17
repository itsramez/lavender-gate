import './styles.css';

// ------------------------------------------------------------------
// Sticky header: adds a background/shadow once the page scrolls past
// the hero area.
// ------------------------------------------------------------------
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const toggle = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

// ------------------------------------------------------------------
// Mobile hamburger menu: toggles a full-screen nav overlay.
// ------------------------------------------------------------------
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    document.body.classList.toggle('nav-open', isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

// ------------------------------------------------------------------
// Scroll-reveal animations: any element with the `.reveal` class
// fades/slides into view once it enters the viewport. Siblings inside
// a `[data-stagger]` container are delayed incrementally.
// ------------------------------------------------------------------
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  document.querySelectorAll('[data-stagger]').forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      if (child.classList.contains('reveal')) {
        child.style.transitionDelay = `${index * 100}ms`;
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

// ------------------------------------------------------------------
// Highlight the current page in the nav.
// ------------------------------------------------------------------
function initActiveNavLink() {
  const normalize = (path) => {
    const last = path.split('/').filter(Boolean).pop() || 'index.html';
    return last.replace(/\.html$/, '');
  };

  const current = normalize(window.location.pathname);
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (normalize(href) === current) {
      link.classList.add('active');
    }
  });
}

// ------------------------------------------------------------------
// Photo galleries: any [data-gallery] container cycles through its
// .gallery-slide children via prev/next arrows or dot clicks.
// ------------------------------------------------------------------
function initGalleries() {
  document.querySelectorAll('[data-gallery]').forEach((gallery) => {
    const slides = gallery.querySelectorAll('.gallery-slide');
    if (slides.length <= 1) return;

    const dots = gallery.querySelectorAll('.gallery-dot');
    let index = 0;

    const show = (nextIndex) => {
      slides[index].classList.remove('active');
      if (dots[index]) dots[index].classList.remove('active');
      index = (nextIndex + slides.length) % slides.length;
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
    };

    gallery.querySelector('.gallery-prev')?.addEventListener('click', (event) => {
      event.preventDefault();
      show(index - 1);
    });

    gallery.querySelector('.gallery-next')?.addEventListener('click', (event) => {
      event.preventDefault();
      show(index + 1);
    });

    dots.forEach((dot, dotIndex) => {
      dot.addEventListener('click', (event) => {
        event.preventDefault();
        show(dotIndex);
      });
    });
  });
}

// ------------------------------------------------------------------
// Contact form: front-end only, no backend. Builds a mailto: link from
// the field values and opens it, so the visitor's own email app sends
// the message directly to LavenderGate. A real backend/email service
// (e.g. Formspree, Netlify Forms) could be wired in here later by
// replacing the mailto redirect with an actual fetch() POST.
// ------------------------------------------------------------------
const CONTACT_EMAIL = 'info@lavendergate.org';

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const confirmation = form.querySelector('.form-confirmation');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    form.reset();
    if (confirmation) {
      confirmation.classList.add('show');
    }
  });
}

// ------------------------------------------------------------------
// Back to top: fades in a floating button once the visitor has
// scrolled past the hero, and smooth-scrolls to top on click.
// ------------------------------------------------------------------
function initBackToTop() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;

  const toggle = () => {
    button.classList.toggle('show', window.scrollY > 500);
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNav();
  initScrollReveal();
  initActiveNavLink();
  initGalleries();
  initContactForm();
  initBackToTop();
});
