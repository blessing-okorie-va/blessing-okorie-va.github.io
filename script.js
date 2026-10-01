// Navigation toggle
(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav__links--open');
      navToggle.classList.toggle('nav__toggle--active', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('nav__links--open');
        navToggle.classList.remove('nav__toggle--active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

// Nav shadow on scroll
(function () {
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    }, { passive: true });
  }
})();

// Footer year
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/*
// Resume availability check — gracefully handle missing PDF
(function () {
  var viewResume = document.getElementById('viewResume');
  var downloadResume = document.getElementById('downloadResume');
  var comingSoon = document.getElementById('resumeComingSoon');

  if (!viewResume || !downloadResume) return;

  var resumeUrl = viewResume.getAttribute('href');

  fetch(resumeUrl, { method: 'HEAD' })
    .then(function (res) {
      if (!res.ok) throw new Error('Not found');
    })
    .catch(function () {
      viewResume.style.display = 'none';
      downloadResume.style.display = 'none';
      if (comingSoon) comingSoon.style.display = 'block';
    });
})(); */

// Resume availability
(function () {
  var viewResume = document.getElementById('viewResume');
  var downloadResume = document.getElementById('downloadResume');
  var comingSoon = document.getElementById('resumeComingSoon');

  if (!viewResume || !downloadResume) return;

  if (comingSoon) {
    comingSoon.style.display = 'none';
  }

  viewResume.style.display = 'inline-flex';
  downloadResume.style.display = 'inline-flex';
})();

// LinkedIn placeholder — soft disable if no real URL
(function () {
  var li = document.getElementById('linkedinPlaceholder');
  if (li && (li.getAttribute('href') === '#' || !li.getAttribute('href'))) {
    li.style.color = 'var(--color-text-light)';
    li.style.pointerEvents = 'none';
    li.style.cursor = 'default';
    li.setAttribute('title', 'LinkedIn profile coming soon');
  }
})();

// Intersection Observer for subtle reveal animations
(function () {
  if (!('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  var revealSelectors = [
    '.service-card',
    '.project',
    '.step',
    '.about__card',
    '.case-study-section',
    '.case-study-meta__item',
    '.case-study-visual'
  ];

  revealSelectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 600ms ease ' + (i % 4) * 80 + 'ms, transform 600ms ease ' + (i % 4) * 80 + 'ms';
      observer.observe(el);
    });
  });
})();

// Image lightbox
document.querySelectorAll('.case-study-visual img').forEach((image) => {
  image.style.cursor = 'zoom-in';

  image.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'image-lightbox';

    overlay.innerHTML = `
      <button class="image-lightbox__close" aria-label="Close image">&times;</button>
      <img src="${image.src}" alt="${image.alt}">
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const closeLightbox = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', (event) => {
      if (
        event.target === overlay ||
        event.target.classList.contains('image-lightbox__close')
      ) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function handleEscape(event) {
      if (event.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleEscape);
      }
    });
  });
});
