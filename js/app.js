/* ============================================================
   ASWIN M KUMAR — Resume Viewer JavaScript
   Copy link, scroll animations, interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCopyButtons();
});

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const sections = document.querySelectorAll('.resume-section');
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 80}ms`;
    observer.observe(section);
  });
}

/* ---------- Copy to Clipboard ---------- */
function initCopyButtons() {
  // Header copy button
  const headerCopyBtn = document.getElementById('header-copy-btn');
  if (headerCopyBtn) {
    headerCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyCurrentLink();
    });
  }

  // Share section copy button
  const shareCopyBtn = document.getElementById('share-copy-btn');
  if (shareCopyBtn) {
    shareCopyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      copyCurrentLink();
    });
  }

  // Landing page card copy buttons
  document.querySelectorAll('.copy-link-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = btn.dataset.url;
      if (url) {
        copyToClipboard(url);
      }
    });
  });
}

function copyCurrentLink() {
  copyToClipboard(window.location.href);
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showToast('Link copied to clipboard!');
      animateCopyButtons();
    })
    .catch(() => {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Link copied to clipboard!');
        animateCopyButtons();
      } catch (err) {
        showToast('Failed to copy link');
      }
      document.body.removeChild(textarea);
    });
}

function animateCopyButtons() {
  // Animate share section button
  const shareCopyBtn = document.getElementById('share-copy-btn');
  if (shareCopyBtn) {
    shareCopyBtn.classList.add('copied');
    const originalHTML = shareCopyBtn.innerHTML;
    shareCopyBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;
    setTimeout(() => {
      shareCopyBtn.classList.remove('copied');
      shareCopyBtn.innerHTML = originalHTML;
    }, 2000);
  }
}

/* ---------- Toast Notification ---------- */
function showToast(message) {
  // Remove existing toasts
  document.querySelectorAll('.toast').forEach((t) => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    ${message}
  `;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

/* ---------- Copy PDF Link ---------- */
function copyPDFLink(url) {
  copyToClipboard(url);
}
