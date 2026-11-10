/**
 * Mohammed Najaf - Portfolio, Resume & Bio-Data Interactive Scripts
 * Lava Red & Deep Volcanic Black Edition
 * Features: Dual-Theme Switcher, Scroll Entrance Observer,
 * Interactive Category Filtering, Contact Validation, and Audio-Visual Animations
 */

(function() {
  'use strict';

  // ==========================================
  // 1. Rock-Solid Theme Switcher (Dark / Light)
  // ==========================================
  const THEME_KEY = 'najaf_portfolio_theme';
  const htmlEl = document.documentElement;

  const sunIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  const moonIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  function applyTheme(theme) {
    const btn = document.getElementById('theme-toggle');
    if (theme === 'light') {
      htmlEl.setAttribute('data-theme', 'light');
      if (btn) {
        btn.innerHTML = moonIcon;
        btn.setAttribute('aria-label', 'Switch to dark mode');
        btn.setAttribute('title', 'Switch to dark mode');
      }
    } else {
      htmlEl.setAttribute('data-theme', 'dark');
      if (btn) {
        btn.innerHTML = sunIcon;
        btn.setAttribute('aria-label', 'Switch to light mode');
        btn.setAttribute('title', 'Switch to light mode');
      }
    }
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  }

  // Self-executing theme initialisation
  (function initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch (e) {}

    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = savedTheme ? savedTheme : (prefersLight ? 'light' : 'dark');
    applyTheme(initial);
  })();

  // Attach native click handler
  document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
      });
    }

    const current = htmlEl.getAttribute('data-theme') || 'dark';
    applyTheme(current);
  });

  // ==========================================
  // 2. Mobile Navigation Toggle
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', function() {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
      });

      document.addEventListener('click', function(e) {
        if (!e.target.closest('.header')) {
          navMenu.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', false);
        }
      });

      // Close mobile drawer when a nav link is selected
      navMenu.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
          navMenu.classList.remove('open');
          mobileBtn.setAttribute('aria-expanded', false);
        });
      });
    }
  });

  // ==========================================
  // 3. Highlight Active Navigation Item
  // ==========================================
  function highlightActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
      const linkHref = link.getAttribute('href');
      if (linkHref === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', highlightActiveNav);

  // ==========================================
  // 4. Scroll Reveal Animations (IntersectionObserver)
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    // Automatically apply animate-on-scroll class to cards, metrics, and articles
    const targetElements = document.querySelectorAll(
      '.card, .figma-metrics-banner, .project-card, .resume-section, .resume-paper, .biodata-paper, .contact-info-card'
    );

    targetElements.forEach(el => el.classList.add('animate-on-scroll'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('is-visible'));
    }
  });

  // ==========================================
  // 5. Toast Notifications
  // ==========================================
  function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '<polyline points="20 6 9 17 4 12"></polyline>';
    if (type === 'error') {
      iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
    } else if (type === 'info') {
      iconSvg = '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
    }

    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${iconSvg}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 15);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  window.showToast = showToast;

  // ==========================================
  // 6. Print & PDF Action Buttons
  // ==========================================
  document.addEventListener('click', function(e) {
    const printBtn = e.target.closest('.btn-print');
    if (printBtn) {
      e.preventDefault();
      window.print();
    }
  });

  // ==========================================
  // 7. Copy to Clipboard Button
  // ==========================================
  document.addEventListener('click', function(e) {
    const copyBtn = e.target.closest('.btn-copy');
    if (copyBtn) {
      e.preventDefault();
      const textToCopy = copyBtn.getAttribute('data-copy-text');
      if (textToCopy && navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast('Copied to clipboard: ' + textToCopy);
        }).catch(() => {
          showToast('Failed to copy text', 'error');
        });
      }
    }
  });

  // ==========================================
  // 8. Project Category Filter (Vanilla JS with Emil Kowalski transitions)
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const filter = btn.getAttribute('data-filter');
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(function(card) {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity 240ms cubic-bezier(0.16, 1, 0.3, 1), transform 240ms cubic-bezier(0.16, 1, 0.3, 1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });

  // ==========================================
  // 9. Contact Form Handling (Real Transmission via FormSubmit)
  // ==========================================
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      // Check for success redirect from fallback POST
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('status') === 'success') {
        showToast('Thank you! Your message was transmitted successfully.', 'success');
        if (window.history && window.history.replaceState) {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }

      contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        const submitBtn = contactForm.querySelector('button[type="submit"]');

        const name = (nameInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const subject = (subjectInput?.value || '').trim();
        const message = (messageInput?.value || '').trim();

        if (!name) {
          showToast('Please provide your name.', 'error');
          nameInput?.focus();
          return;
        }

        if (!email) {
          showToast('Please provide your email address.', 'error');
          emailInput?.focus();
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showToast('Please enter a valid email address.', 'error');
          emailInput?.focus();
          return;
        }

        if (!message) {
          showToast('Please enter your message.', 'error');
          messageInput?.focus();
          return;
        }

        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg>
          <span>Transmitting Message...</span>
        `;

        try {
          const endpoint = 'https://formsubmit.co/ajax/mohammednajaf.nj5@gmail.com';
          const payload = {
            name: name,
            email: email,
            _subject: subject || `Portfolio Inquiry from ${name}`,
            message: message,
            _template: 'table',
            _captcha: 'false'
          };

          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          });

          if (response.ok) {
            submitBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Message Transmitted!</span>
            `;
            showToast('Thank you, ' + name + '! Your message was delivered to Mohammed Najaf.', 'success');
            contactForm.reset();
            setTimeout(() => {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnHtml;
            }, 3000);
          } else {
            throw new Error('Endpoint returned HTTP ' + response.status);
          }
        } catch (err) {
          console.warn('Direct transmission failed, redirecting to mailto fallback:', err);
          submitBtn.innerHTML = originalBtnHtml;
          submitBtn.disabled = false;
          showToast('Transmission fallback: Launching email client...', 'info');

          // Fallback to mailto link
          const mailtoSubject = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
          const mailtoBody = encodeURIComponent(`Sender: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:mohammednajaf.nj5@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
        }
      });
    }
  });

})();
