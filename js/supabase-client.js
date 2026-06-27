// ============================================================
// SUPABASE CLIENT — butwhatcanyoudo.org
// Shared library for all pages. Handles groups, volunteers,
// email subscriptions, contact messages, and analytics.
// ============================================================

const SUPABASE_URL = 'https://huiunvlqhydbgizuzcrf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_HVgqFOaJLJbjpSaQW2Bsmg_B8xYYNyY';

// Will be initialized after CDN script loads
let _supabase = null;
let _initCallbacks = [];
let _initStarted = false;

// Session ID for analytics (no PII — random per session)
function getSessionId() {
  let sid = sessionStorage.getItem('bwcyd_sid');
  if (!sid) {
    sid = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2) + Date.now().toString(36);
    sessionStorage.setItem('bwcyd_sid', sid);
  }
  return sid;
}

// Initialize Supabase client — loads CDN script if needed
function initSupabase() {
  return new Promise((resolve, reject) => {
    if (_supabase) { resolve(_supabase); return; }
    _initCallbacks.push({ resolve, reject });
    if (_initStarted) return;
    _initStarted = true;

    // Check if already loaded
    if (window.supabase && window.supabase.createClient) {
      _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      _initCallbacks.forEach(cb => cb.resolve(_supabase));
      _initCallbacks = [];
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
    script.onload = () => {
      try {
        _supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        _initCallbacks.forEach(cb => cb.resolve(_supabase));
      } catch (e) {
        _initCallbacks.forEach(cb => cb.reject(e));
      }
      _initCallbacks = [];
    };
    script.onerror = () => {
      const err = new Error('Failed to load Supabase client library');
      _initCallbacks.forEach(cb => cb.reject(err));
      _initCallbacks = [];
    };
    document.head.appendChild(script);
  });
}

// ============================================================
// GROUPS
// ============================================================

const SupaGroups = {
  // Search approved groups by state, optionally filtered by type and city
  async search({ state, city, type, limit = 50 } = {}) {
    const sb = await initSupabase();
    let query = sb
      .from('groups')
      .select('id, created_at, name, slug, description, type, city, state, zip_code, contact_method, public_contact, external_link, member_count, featured')
      .eq('status', 'approved')
      .eq('active', true)
      .order('featured', { ascending: false })
      .order('member_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (state) query = query.eq('state', state);
    if (type) query = query.eq('type', type);
    if (city) query = query.ilike('city', `%${city}%`);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  // Get group counts by state (for map overlay)
  async countsByState() {
    const sb = await initSupabase();
    const { data, error } = await sb.rpc('get_group_counts_by_state');
    if (error) throw error;
    return data || [];
  },

  // Submit a group application
  async apply({
    name, description, type = 'general',
    city, state, zipCode,
    organizerName, organizerEmail,
    socialProfileUrl, whyMessage,
    contactMethod = 'email', publicContact, externalLink
  }) {
    const sb = await initSupabase();
    const { data, error } = await sb.from('groups').insert({
      status: 'pending',
      name,
      description,
      type,
      city,
      state,
      zip_code: zipCode,
      organizer_name: organizerName,
      organizer_email: organizerEmail,
      social_profile_url: socialProfileUrl,
      why_message: whyMessage,
      contact_method: contactMethod,
      public_contact: publicContact,
      external_link: externalLink
    }).select('id, verification_token');

    if (error) throw error;
    return data?.[0];
  },

  // Join an existing group
  async join({ groupId, name, email, zipCode, phone, message }) {
    const sb = await initSupabase();
    const { data, error } = await sb.from('group_members').insert({
      group_id: groupId,
      name,
      email,
      zip_code: zipCode,
      phone: phone || null,
      message: message || null
    });

    if (error) {
      if (error.code === '23505') throw new Error('You have already joined this group.');
      throw error;
    }
    return data;
  },

  // Get a single group by slug
  async getBySlug(slug) {
    const sb = await initSupabase();
    const { data, error } = await sb
      .from('groups')
      .select('id, created_at, name, slug, description, type, city, state, zip_code, contact_method, public_contact, external_link, member_count, featured')
      .eq('slug', slug)
      .eq('status', 'approved')
      .eq('active', true)
      .single();

    if (error) throw error;
    return data;
  }
};

// ============================================================
// VOLUNTEERS
// ============================================================

const SupaVolunteers = {
  async signup({
    name, email, zipCode, state, city,
    roles = [], skills, message, availability,
    preferredContact = 'email', phone
  }) {
    const sb = await initSupabase();
    const { data, error } = await sb.from('volunteers').insert({
      name,
      email,
      zip_code: zipCode,
      state,
      city,
      roles,
      skills: skills || null,
      message: message || null,
      availability: availability || null,
      preferred_contact: preferredContact,
      phone: phone || null
    });

    if (error) {
      if (error.code === '23505') throw new Error('This email is already registered as a volunteer. Thank you!');
      throw error;
    }
    return data;
  }
};

// ============================================================
// EMAIL SUBSCRIBERS
// ============================================================

const SupaEmail = {
  async subscribe({ email, name, zipCode, state, source }) {
    const sb = await initSupabase();
    const { data, error } = await sb.from('email_subscribers').insert({
      email,
      name: name || null,
      zip_code: zipCode || null,
      state: state || null,
      source: source || window.location.pathname
    });

    if (error) {
      if (error.code === '23505') throw new Error('This email is already subscribed.');
      throw error;
    }
    return data;
  },

  async unsubscribe(token) {
    const sb = await initSupabase();
    const { data, error } = await sb.rpc('unsubscribe_by_token', {
      unsub_token: token
    });

    if (error) throw error;
    return data;
  }
};

// ============================================================
// CONTACT MESSAGES
// ============================================================

const SupaContact = {
  async send({ name, email, subject, message, pageSource }) {
    const sb = await initSupabase();
    const { data, error } = await sb.from('contact_messages').insert({
      name,
      email,
      subject: subject || null,
      message,
      page_source: pageSource || window.location.pathname
    });

    if (error) throw error;
    return data;
  }
};

// ============================================================
// POSTER ANALYTICS
// ============================================================

const SupaPosters = {
  async logEvent(posterId, action = 'download') {
    try {
      const sb = await initSupabase();
      await sb.from('poster_events').insert({
        poster_id: posterId,
        action,
        session_id: getSessionId(),
        state: sessionStorage.getItem('bwcyd_state') || null,
        zip_code: sessionStorage.getItem('bwcyd_zip') || null
      });
    } catch (e) {
      // Analytics should never block the user
      console.warn('Poster event logging failed:', e);
    }
  },

  async getPopular(limit = 10) {
    const sb = await initSupabase();
    const { data, error } = await sb
      .from('poster_events')
      .select('poster_id')
      .eq('action', 'download')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;

    // Count downloads per poster
    const counts = {};
    (data || []).forEach(d => {
      counts[d.poster_id] = (counts[d.poster_id] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id, count]) => ({ poster_id: id, downloads: count }));
  }
};

// ============================================================
// SITE ANALYTICS
// ============================================================

const SupaAnalytics = {
  async logEvent(eventType, data = {}) {
    try {
      const sb = await initSupabase();
      await sb.from('site_events').insert({
        event_type: eventType,
        page: window.location.pathname,
        data,
        session_id: getSessionId(),
        state: sessionStorage.getItem('bwcyd_state') || null,
        zip_code: sessionStorage.getItem('bwcyd_zip') || null,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null
      });
    } catch (e) {
      // Never block the user for analytics
      console.warn('Analytics event failed:', e);
    }
  },

  // Log a page view (call once per page load)
  async pageview() {
    return this.logEvent('pageview');
  },

  // Get public stats (for homepage counters)
  async getPublicStats() {
    const sb = await initSupabase();
    const { data, error } = await sb.rpc('get_public_stats');
    if (error) throw error;
    return data;
  }
};

// ============================================================
// AUTO-INIT: Log pageview on every page that includes this script
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => SupaAnalytics.pageview());
} else {
  SupaAnalytics.pageview();
}
