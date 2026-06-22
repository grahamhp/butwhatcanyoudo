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

if ('IntersectionObserver' in window) {
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

  // Visibility must fail open. Dynamic sections such as the poster gallery are
  // populated after this observer is attached, and some browsers never fire the
  // initial intersection callback for those containers.
  window.setTimeout(() => {
    fadeEls.forEach(el => el.classList.add('visible'));
  }, 450);
} else {
  fadeEls.forEach(el => el.classList.add('visible'));
}

// --- Nav hide/show on scroll ---
let lastScroll = 0;
const nav = document.getElementById('nav');

if (nav) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });
}

// --- Homepage Zip Code Lookup ---
// This function works on the homepage. It uses the lookup engine if loaded,
// otherwise redirects to the lookup page.
async function lookupZip() {
  const zipInputEl = document.getElementById('zipInput');
  const resultDiv = document.getElementById('zipResult');
  const zip = zipInputEl ? zipInputEl.value.trim() : '';

  if (!resultDiv) return;

  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    resultDiv.innerHTML = '<p style="color: var(--red);">Please enter a valid 5-digit zip code.</p>';
    return;
  }

  if (typeof lookupZipEstimate !== 'function' && typeof lookupDistrict !== 'function') {
    window.location.href = '/lookup/?zip=' + zip;
    return;
  }

  resultDiv.innerHTML = '<p class="text-muted">Estimating your congressional district...</p>';

  try {
    const result = typeof lookupZipEstimate === 'function'
      ? await lookupZipEstimate(zip)
      : lookupDistrict(zip);

    if (result && result.primaryCandidate) {
      const c = result.primaryCandidate;
      const partyColor = c.party === 'D' ? 'text-blue' : 'text-red';
      const partyLabel = c.party === 'D' ? 'Democrat' : 'Republican';
      const messaging = result.messaging;

      let voteSummary = '';
      if (typeof KEY_VOTES !== 'undefined') {
        KEY_VOTES.forEach(v => {
          const vote = c.keyVotes[v.id];
          if (vote === 'Yes') {
            voteSummary += `<span class="text-red" style="font-size: 0.85rem; margin-right: 8px;">X ${v.title.split(' - ')[0].trim()}: Voted Yes</span><br>`;
          }
        });
      }

      const estimateNote = result.isEstimate
        ? '<p class="text-yellow" style="font-size: 0.82rem; margin-top: 8px;">ZIP estimate. ZIP codes can cross district lines; use address for the most precise result.</p>'
        : '';

      resultDiv.innerHTML = `
        <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left; padding: 24px;">
          <p class="text-mono text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">YOUR DISTRICT: ${result.district}</p>
          <h3 style="margin-bottom: 4px;">${c.name}</h3>
          <p style="margin-bottom: 12px;">
            <span class="${partyColor}" style="font-weight: 600;">${partyLabel}</span>
            <span class="text-muted"> - ${c.districtLabel}</span>
            ${c.redistricted ? '<span style="display: inline-block; padding: 2px 6px; background: rgba(255,197,0,0.15); color: var(--yellow); font-size: 0.7rem; border-radius: 2px; margin-left: 6px;">REDISTRICTED</span>' : ''}
          </p>
          ${c.aipacEndorsed ? '<p class="text-yellow" style="font-size: 0.9rem; font-weight: 600; margin-bottom: 8px;">Foreign Lobby Endorsed</p>' : ''}
          ${c.aipacTrip ? '<p class="text-muted" style="font-size: 0.85rem; margin-bottom: 8px;">Accepted foreign lobby-funded trip</p>' : ''}
          ${voteSummary ? '<div style="margin-bottom: 12px;">' + voteSummary + '</div>' : ''}
          ${c.notableActions ? '<p class="text-muted" style="font-size: 0.85rem; font-style: italic; margin-bottom: 12px;">' + c.notableActions + '</p>' : ''}
          ${estimateNote}
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
      const districtLine = result && result.district
        ? `<p class="text-yellow" style="font-size: 0.9rem; margin-bottom: 12px;">Estimated district: ${result.district}. This district is not fully researched in our public database yet.</p>`
        : '';
      resultDiv.innerHTML = `
        <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left; padding: 24px;">
          <p class="text-mono text-muted" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">ZIP ${zip}</p>
          <h3 style="margin-bottom: 12px;">We found what we could from this ZIP estimate.</h3>
          ${districtLine}
          <p class="text-muted" style="margin-bottom: 16px;">ZIP codes can cross congressional district lines. Use address for the most precise result, or enter your district directly.</p>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <a href="/lookup/?zip=${zip}" class="btn btn-red" style="padding: 10px 20px; font-size: 0.85rem;">Open lookup page</a>
            <a href="/races/" class="btn btn-outline" style="padding: 10px 20px; font-size: 0.85rem;">Browse all races</a>
          </div>
        </div>
      `;
    }
  } catch (error) {
    resultDiv.innerHTML = `
      <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left; padding: 24px;">
        <h3 style="margin-bottom: 8px;">ZIP estimate is unavailable right now.</h3>
        <p class="text-muted" style="margin-bottom: 16px;">You can still use the lookup page to enter your district directly, or use an address for the most precise Census match.</p>
        <a href="/lookup/?zip=${zip}" class="btn btn-red" style="padding: 10px 20px; font-size: 0.85rem;">Open lookup page</a>
      </div>
    `;
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
