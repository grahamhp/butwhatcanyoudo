/* ============================================
   BUT WHAT CAN YOU DO? — Main JavaScript
   ============================================ */

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// --- Scroll Fade-In Animation ---
const fadeEls = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

fadeEls.forEach(el => fadeObserver.observe(el));

// --- Nav hide/show on scroll ---
let lastScroll = 0;
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
});

// --- Zip Code Lookup (placeholder — will connect to Google Civic API) ---
function lookupZip() {
  const zip = document.getElementById('zipInput').value.trim();
  const resultDiv = document.getElementById('zipResult');

  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    resultDiv.innerHTML = '<p style="color: var(--red);">Please enter a valid 5-digit zip code.</p>';
    return;
  }

  resultDiv.innerHTML = `
    <div class="card" style="max-width: 500px; margin: 0 auto; text-align: left;">
      <p class="text-muted" style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">Coming soon</p>
      <p>We're building the database right now. Enter your email and we'll notify you when your district is live.</p>
      <form name="zip-notify" method="POST" data-netlify="true" style="margin-top: 16px;">
        <input type="hidden" name="zip" value="${zip}">
        <input type="email" name="email" placeholder="Your email" required style="margin-bottom: 12px;">
        <button type="submit" class="btn btn-red" style="width: 100%;">Notify me</button>
      </form>
    </div>
  `;
}

// Allow Enter key to trigger zip lookup
const zipInput = document.getElementById('zipInput');
if (zipInput) {
  zipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      lookupZip();
    }
  });
}

// --- Countdown to Election Day (November 3, 2026) ---
const countdownEl = document.getElementById('countdown');
if (countdownEl) {
  const electionDay = new Date('2026-11-03T00:00:00');
  const now = new Date();
  const days = Math.ceil((electionDay - now) / (1000 * 60 * 60 * 24));
  if (days > 0) {
    countdownEl.textContent = days + ' days until Election Day.';
  }
}
