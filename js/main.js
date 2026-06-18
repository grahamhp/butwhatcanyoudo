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

// --- Homepage Zip Code Lookup ---
// This function works on the homepage. It uses the lookup engine if loaded,
// otherwise redirects to the lookup page.
function lookupZip() {
  const zip = document.getElementById('zipInput').value.trim();
  const resultDiv = document.getElementById('zipResult');

  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    resultDiv.innerHTML = '<p style="color: var(--red);">Please enter a valid 5-digit zip code.</p>';
    return;
  }

  // If lookup engine is loaded (candidates.js + lookup.js), use it
  if (typeof lookupDistrict === 'function') {
    const result = lookupDistrict(zip);

    if (result && result.primaryCandidate) {
      const c = result.primaryCandidate;
      const partyColor = c.party === 'D' ? 'text-blue' : 'text-red';
      const partyLabel = c.party === 'D' ? 'Democrat' : 'Republican';
      const messaging = result.messaging;

      // Build vote summary
      let voteSummary = '';
      if (typeof KEY_VOTES !== 'undefined') {
        KEY_VOTES.forEach(v => {
          const vote = c.keyVotes[v.id];
          if (vote === 'Yes') {
            voteSummary += `<span class="text-red" style="font-size: 0.85rem; margin-right: 8px;">✗ ${v.title.split('—')[0].trim()}: Voted Yes</span><br>`;
          }
        });
      }

      resultDiv.innerHTML = `
        <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left; padding: 24px;">
          <p class="text-mono text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">YOUR DISTRICT: ${result.district}</p>
          <h3 style="margin-bottom: 4px;">${c.name}</h3>
          <p style="margin-bottom: 12px;">
            <span class="${partyColor}" style="font-weight: 600;">${partyLabel}</span>
            <span class="text-muted"> — ${c.districtLabel}</span>
            ${c.redistricted ? '<span style="display: inline-block; padding: 2px 6px; background: rgba(255,197,0,0.15); color: var(--yellow); font-size: 0.7rem; border-radius: 2px; margin-left: 6px;">REDISTRICTED</span>' : ''}
          </p>
          ${c.aipacEndorsed ? '<p class="text-yellow" style="font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">Lobby Endorsed</p>' : ''}
          ${c.aipacTrip ? '<p class="text-muted" style="font-size: 0.85rem; margin-bottom: 8px;">Accepted lobby-funded trip</p>' : ''}
          ${voteSummary ? '<div style="margin-bottom: 12px;">' + voteSummary + '</div>' : ''}
          ${c.notableActions ? '<p class="text-muted" style="font-size: 0.85rem; font-style: italic; margin-bottom: 12px;">' + c.notableActions + '</p>' : ''}
          <div style="margin-top: 16px; padding: 16px; background: rgba(255,65,54,0.05); border-radius: 2px;">
            <p style="font-weight: 600; margin-bottom: 4px;">${messaging.headline}</p>
            <p class="text-muted" style="font-size: 0.85rem;">${messaging.subtext}</p>
          </div>
          <div style="margin-top: 16px; display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="/lookup/?zip=${zip}" class="btn btn-red" style="padding: 10px 20px; font-size: 0.85rem;">Full details</a>
            <a href="/races/#database" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.85rem;">All races</a>
          </div>
        </div>
      `;
    } else {
      // Zip not in toss-up coverage
      resultDiv.innerHTML = `
        <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left; padding: 24px;">
          <p class="text-mono text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">ZIP ${zip}</p>
          <h3 style="margin-bottom: 12px;">Your district isn't in our toss-up database yet.</h3>
          <p class="text-muted" style="margin-bottom: 16px;">We're tracking the 18 most competitive House races. We're adding more districts regularly.</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="/races/" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.85rem;">Browse all races</a>
            <a href="/lookup/" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.85rem;">Learn more</a>
          </div>
          <form name="zip-notify" method="POST" data-netlify="true" style="margin-top: 16px; display: flex; gap: 8px;">
            <input type="hidden" name="zip" value="${zip}">
            <input type="email" name="email" placeholder="Notify me when added" required style="flex: 1; padding: 10px 14px; font-size: 0.85rem;">
            <button type="submit" class="btn btn-red" style="padding: 10px 16px; font-size: 0.8rem;">Go</button>
          </form>
        </div>
      `;
    }
  } else {
    // Lookup engine not loaded — redirect to lookup page
    window.location.href = '/lookup/?zip=' + zip;
  }
}

// Allow Enter key to trigger zip lookup
const zipInput = document.getElementById('zipInput');
if (zipInput) {
  zipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      // Check if we're on the homepage or lookup page
      if (typeof performLookup === 'function') {
        performLookup();
      } else {
        lookupZip();
      }
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
  } else if (days === 0) {
    countdownEl.textContent = 'TODAY IS ELECTION DAY.';
    countdownEl.style.fontSize = '2.5rem';
  }
}

// --- Active nav link highlighting ---
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});

// --- Smooth scroll for anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
