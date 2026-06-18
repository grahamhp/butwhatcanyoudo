# "But What Can You Do, Anyway?"
## Campaign Master Plan — Launch by July 4, 2026

---

## EXECUTIVE SUMMARY

A nonpartisan grassroots campaign to vote out every member of Congress — Republican or Democrat — who has accepted AIPAC funding and voted to send weapons used against civilians. The campaign uses powerful visual media, district-tailored messaging, and a website that turns the defeatist question "But what can you do, anyway?" into a concrete answer.

**Launch Date:** July 4, 2026
**Election Day:** November 3, 2026
**Time to Launch:** 19 days (June 15 – July 4)
**Daily Commitment:** 2 hours focused work
**Total Pre-Launch Hours:** ~38 hours

---

## CRITICAL RESEARCH FINDING — NOTE FOR GRAHAM

**Thomas Massie lost his Kentucky primary on May 19, 2026** to Trump-backed Ed Gallrein. Massie will not be on the November ballot. He was one of the only Republican members of Congress who consistently voted against aid to the government of Israel and refused AIPAC money. This is actually a powerful data point for the campaign — it shows that BOTH parties punish dissent on this issue. We should reference Massie's ouster as evidence that this isn't a left/right issue.

**Mamdani won the NYC mayoral race** defeating Andrew Cuomo, proving that anti-AIPAC candidates can win. This is a centerpiece proof-of-concept for the campaign.

---

## CAMPAIGN RED LINES (NON-NEGOTIABLE)

1. Never say "Israel" alone — always "the government of Israel"
2. Never use "from the river to the sea" or "free Palestine"
3. Never use language of historical protest movements
4. Always make explicitly clear: this is not anti-Jewish
5. Actively recruit Jewish allies and feature Jewish voices
6. Not pro-Democrat or pro-Republican — only anti-genocide
7. No AI-generated photos — only verified real images
8. Never instruct anyone to do anything illegal

---

## BRAND IDENTITY ✅ FINALIZED

**Campaign Name:** But What Can You Do?
**Domain:** butwhatcanyoudo.org (registered on Porkbun) — may add butwhatcanyou.do later as a redirect
**Primary Hashtag:** #ButWhatCanYouDo
**Secondary Hashtag:** #WhoVotedYes (used when sharing specific candidate accountability data)

### Visual Identity (see STYLE_GUIDE.md for full details)
- **Foundation:** Black & white photography — always real, never AI-generated
- **Three accent colors:** Urgent Red (#FF4136), Electric Blue (#00A8E8), Vivid Yellow (#FFC500)
- **Color logic:** Red = accusation/emotion, Blue = unity/solidarity, Yellow = money/data
- **Color rule:** Same hex on all backgrounds — no muting. Yellow on white only in large bold headlines.
- **Typography:** Oswald/Bebas Neue for poster headlines, Inter for website body, Source Code Pro for citations
- **Poster style:** B&W photojournalism with bold colored text overlay. Stark. Unavoidable. Makes you stop scrolling.

---

## WORKSTREAMS

### 1. CANDIDATE DATABASE
**Goal:** A comprehensive, verified database of every 2026 federal race with candidate positions on weapons transfers to the government of Israel.

**Key Data Sources:**
- [Track AIPAC](https://www.trackaipac.com/endorsements) — AIPAC endorsements and funding data
- [Track AIPAC Congress Tracker](https://www.trackaipac.com/congress) — individual member funding profiles
- [Ballotpedia 2026 House Races](https://ballotpedia.org/United_States_House_of_Representatives_elections,_2026)
- [270toWin Interactive Map](https://www.270towin.com/2026-house-election/)
- FEC.gov filing data
- OpenSecrets.org contribution data
- VoteSmart.org voting records

**Data Points Per Race:**
- District, state, incumbent name, party
- AIPAC funding received (career total + 2026 cycle)
- Key votes on weapons transfers, aid packages
- Direct quotes supporting weapons transfers
- Challenger name(s), party, position on the issue
- District demographics (religion, ethnicity, political lean, urban/rural)
- Redistricting status (new district lines? how much did it shift?)

**Priority Tiers:**
1. **Tier 1 — Toss-ups with AIPAC incumbents** (highest impact)
2. **Tier 2 — Redistricted seats where new voters haven't locked in** 
3. **Tier 3 — All other AIPAC-funded incumbents**

**Known Toss-Up Races (Cook Political Report, June 2026):**

*Democratic-held toss-ups:*
- Adam Gray — CA
- Derek Tran — CA
- Jared Golden — ME
- Gabe Vasquez — NM
- Laura Gillen — NY
- Don Davis — NC (heavily redistricted)
- Marcy Kaptur — OH
- Emilia Sykes — OH
- Vicente Gonzalez — TX (heavily redistricted)
- Marie Gluesenkamp Perez — WA

*Republican-held toss-ups:*
- David Schweikert — AZ (running for governor — open seat)
- Juan Ciscomani — AZ
- Gabe Evans — CO
- Mariannette Miller-Meeks — IA
- Tom Barrett — MI
- Don Bacon — NE
- Ryan Mackenzie — PA
- Scott Perry — PA

**States with New Maps for 2026:** California, Missouri, North Carolina, Texas, Ohio, Utah

### 2. WEBSITE

**Platform Recommendation:** Custom-built static site deployed on Netlify or Vercel (both free tier). This gives full design control for the powerful visual impact we need, and Claude/AI tools can help build every page.

**Alternative:** If speed matters more than customization, use Carrd.co ($19/yr for Pro) for a fast single-page launcher, then build the full site over time.

**Site Structure:**

```
Homepage — "What can you do, anyway?"
├── /lookup — "Find Your Fight" (location-based district lookup + tailored messaging)
├── /posters — Downloadable poster gallery
├── /how-to — Video + guide: how to print and display posters
├── /talk — Talking points + why new language matters
├── /races — The database: who to vote out, who to support
├── /volunteer — Get involved: organize, print, display, share
├── /groups — Find or create a local group
├── /about — The story: why this exists
└── /support — Buy Me a Coffee link
```

**Homepage Concept:**
- Opens with stark black screen, white text fading in: *"What can you do, anyway?"*
- Scroll reveals: a B&W image of destruction, then the text shifts to bold color: *"This."*
- Then shows the three core actions: LEARN → SHARE → VOTE
- Below: a district lookup field — enter your zip, see your fight

**Location-Based Messaging Engine (/lookup):**
- User enters zip code or address
- API identifies congressional district (Google Civic Information API — free)
- Cross-references candidate database
- Returns tailored talking points based on district demographics:
  - Christian-majority areas → bombed churches, "First they came for..." framing
  - Military/veteran areas → "Our tax dollars, their bombs" framing
  - Suburban parent areas → children, schools, hospitals framing
  - Rural/libertarian areas → government overreach, "Why are we funding foreign wars?" framing
  - College areas → historical accountability, "What will you tell your kids?" framing

### 3. POSTER DESIGN

**Launch Set (6 posters for July 4):**

1. **"The government of Israel told us to." — Every AIPAC politician.**
   B&W: bombed Gaza cityscape. Text in bold coral/red-orange.

2. **"First they came for the hospitals. Then the schools. Then the churches. Then the mosques. Your representative voted yes."**
   B&W: destroyed building. Text in white + coral highlight on "voted yes."

3. **"$X billion. That's how much your tax dollars sent to bomb civilians. Your rep's name is [___]."**
   B&W: child in rubble. Text in bold white + coral. (Personalized per district)

4. **"Not left. Not right. Just human."**
   B&W: diverse group of Americans. Text centered, bold.

5. **"What did you do during the genocide? — Your kids, someday."**
   B&W: empty chair / family dinner table. Text in coral.

6. **"This isn't about religion. This is about bombs."**
   B&W: destroyed mosque AND church side by side. Text in white.

**Photo Sources (verified, non-AI):**
- Wire services: AP Images, Reuters, AFP (licensing required for commercial use, but editorial/advocacy use has different rules — need to research fair use)
- Creative Commons sources: Wikimedia Commons, Unsplash (limited conflict imagery)
- Journalist contacts: many photojournalists have shared images under open licenses
- Organizations: UNRWA, WHO, ICRC press offices often release images for editorial use

**Poster Specs:**
- Standard sizes: 11×17" (tabloid, cheap to print), 18×24" (standard poster), 24×36" (large format)
- File format: High-res PDF + PNG for home printing, plus print-shop-ready files
- Every poster includes: campaign URL, hashtag, QR code to website

### 4. SOCIAL MEDIA STRATEGY

**Accounts to Create:**
- TikTok (primary — this is where viral happens)
- Instagram (visual-first, poster sharing)
- Twitter/X (engagement, commentary, amplification)
- Reddit (r/politics, state/city subreddits, targeted AMAs)
- Facebook (older demographics, group organizing)
- LinkedIn (Graham's personal launch post — professional credibility)
- Threads (secondary to Instagram)

**Content Pillars:**
1. **Poster reveals** — one at a time, dramatic reveal style
2. **District spotlights** — "Did you know your rep took $X from AIPAC?"
3. **Quote cards** — actual quotes from reps defending weapons transfers
4. **Success stories** — Mamdani winning, AIPAC losses
5. **How-to content** — printing, displaying, organizing
6. **Jewish voices** — prominently feature Jewish anti-occupation activists

**Viral Strategy:**
- Launch on July 4 — intentional irony: "Independence from what?"
- First TikTok: Graham telling the story — "Everyone kept asking me, 'What can you do, anyway?' Here's what."
- Tag and DM creators/influencers who've posted about the issue
- Submit to Reddit with genuine, non-astroturfed posts
- Cross-post poster images everywhere with hashtag
- Encourage remixing: "Make your own. Here's the template."

### 5. VOLUNTEER & ORGANIZING INFRASTRUCTURE

**Phase 1 (Launch):**
- Volunteer signup form on website (name, email, zip, skills, availability)
- Simple email list (free tier: Mailchimp or ButtonDown)
- Discord server or Signal group for early volunteers

**Phase 2 (Post-Launch, as people join):**
- Local group creation tool (link to Facebook Groups, Discord, or WhatsApp Communities)
- Volunteer roles: poster printers, poster hangers, content creators, data researchers, social media managers, local organizers
- Print shop outreach toolkit: template email/letter asking local print shops to offer at-cost printing
- Business outreach toolkit: template for asking businesses to display posters

**Phase 3 (Growth):**
- Regional coordinators for priority districts
- Event attendance coordination (showing up at politician events)
- Canvassing toolkit for high-priority districts

### 6. TALKING POINTS & MESSAGING FRAMEWORK

**Core Message Architecture:**

*The Problem:* Members of Congress — in both parties — accept millions from AIPAC and then vote to send billions in weapons that have been used to kill tens of thousands of civilians, including thousands of children.

*The Solution:* Vote them out. Every single one. Replace them with candidates who won't accept money from foreign government lobbies and won't vote to arm governments committing mass atrocities.

*The Proof It Works:* Mamdani beat Cuomo. AIPAC-backed candidates lost in multiple races. When people show up, the money loses.

*The Ask:* Learn who your rep is. Learn what they voted for. Share this with everyone you know. Vote in November.

**Why New Language Matters (dedicated page):**
- Existing protest language has been co-opted, mischaracterized, and weaponized
- Phrases like "free Palestine" and "from the river to the sea" — whatever they mean to activists — have been successfully framed as threatening to many Americans
- People who are horrified by what's happening shut down when they hear phrases they associate with extremism
- This campaign reaches the people who aren't at protests but ARE disgusted by what they see
- The target audience is the suburban parent, the churchgoer, the veteran, the moderate — people who will vote differently if they understand the issue clearly
- We don't need to convince activists. We need to convince voters.

**Write-In Strategy (for districts with no acceptable candidate):**
- If both candidates are AIPAC-funded, encourage voters to write in a symbolic name
- Suggested: a religious figure (Jesus, Muhammad, Moses — the irony is powerful)
- Or: "No More" / campaign name as write-in
- Note: not all states allow write-ins — need state-by-state research

---

## DAILY WORK SCHEDULE: JUNE 15 – JULY 4

### WEEK 1: FOUNDATION (June 15–21)

**Day 1 — Sunday, June 15: Brand & Strategy Lock-In** (TODAY)
- [x] Research the 2026 landscape
- [x] Create this master plan
- [ ] Finalize campaign name, hashtag, domain name
- [ ] Register domain
- [ ] Define color palette, font selections, visual style guide

**Day 2 — Monday, June 16: Website Architecture**
- [ ] Set up GitHub repo + Netlify/Vercel deployment
- [ ] Build website skeleton (all page routes, navigation, basic layout)
- [ ] Create homepage with "What can you do, anyway?" opening
- [ ] Set up basic CSS with brand colors and typography

**Day 3 — Tuesday, June 17: Candidate Database — Part 1**
- [ ] Scrape/compile AIPAC endorsement data from Track AIPAC
- [ ] Cross-reference with Cook Political Report toss-up races
- [ ] Begin spreadsheet: Tier 1 races (toss-ups + AIPAC-funded)
- [ ] Collect first batch of direct quotes from incumbents

**Day 4 — Wednesday, June 18: Candidate Database — Part 2**
- [ ] Complete Tier 1 race profiles (20-25 races)
- [ ] Add redistricting data (new vs. old district lines)
- [ ] Add demographic data per district
- [ ] Research which states allow write-in votes

**Day 5 — Thursday, June 19: Poster Design — Part 1**
- [ ] Source 6+ verified B&W photographs (wire services, CC-licensed)
- [ ] Design Poster #1: "The government of Israel told us to."
- [ ] Design Poster #2: "First they came for the hospitals..."
- [ ] Design Poster #3: "$X billion in your tax dollars..."

**Day 6 — Friday, June 20: Poster Design — Part 2**
- [ ] Design Poster #4: "Not left. Not right. Just human."
- [ ] Design Poster #5: "What did you do during the genocide?"
- [ ] Design Poster #6: "This isn't about religion. This is about bombs."
- [ ] Export all posters in 3 sizes + QR codes

**Day 7 — Saturday, June 21: Website Content — Core Pages**
- [ ] Write /about page (Graham's story, the origin question)
- [ ] Write /talk page (talking points + why new language)
- [ ] Write /how-to page (printing guide, supplies list, display tips)
- [ ] Build poster gallery page with download links

### WEEK 2: BUILD & POPULATE (June 22–28)

**Day 8 — Sunday, June 22: Location Lookup Engine**
- [ ] Integrate Google Civic Information API
- [ ] Build zip code → district → candidate lookup
- [ ] Create messaging templates for each demographic profile
- [ ] Test with 5+ districts across different demographics

**Day 9 — Monday, June 23: Races Page + Database Integration**
- [ ] Build /races page with filterable/searchable candidate database
- [ ] Each race card shows: incumbent, AIPAC $, key votes, challenger, district info
- [ ] Add "Share this race" functionality
- [ ] Link each race to the location lookup

**Day 10 — Tuesday, June 24: Volunteer & Organizing Pages**
- [ ] Build volunteer signup form (integrate with Mailchimp/ButtonDown)
- [ ] Build /groups page (how to start a local chapter)
- [ ] Create print shop outreach template
- [ ] Create business display request template
- [ ] Set up Discord server or similar for early volunteers

**Day 11 — Wednesday, June 25: Social Media Setup**
- [ ] Create accounts: TikTok, Instagram, Twitter/X, Facebook, Threads
- [ ] Design profile images, banners, bios (consistent across platforms)
- [ ] Schedule first week of post-launch content
- [ ] Draft Graham's personal launch post (LinkedIn)

**Day 12 — Thursday, June 26: Content Creation Sprint**
- [ ] Create 10 shareable quote cards (actual rep quotes + AIPAC $)
- [ ] Create 5 "Did you know?" district spotlight graphics
- [ ] Write script for first TikTok (Graham's story)
- [ ] Create social media templates others can customize

**Day 13 — Friday, June 27: Website Polish**
- [ ] Mobile responsiveness testing and fixes
- [ ] Page load speed optimization (compress images, lazy loading)
- [ ] SEO basics: meta tags, Open Graph images, sitemap
- [ ] Add analytics (privacy-respecting: Plausible or Umami, both have free tiers)
- [ ] Add Buy Me a Coffee integration

**Day 14 — Saturday, June 28: Testing & Content Review**
- [ ] Full website walkthrough — every page, every link
- [ ] Fact-check every claim, quote, and dollar amount in the database
- [ ] Test location lookup across 10+ zip codes
- [ ] Have 1-2 trusted friends review the site and give feedback

### WEEK 3: POLISH & LAUNCH (June 29 – July 4)

**Day 15 — Sunday, June 29: Refinement**
- [ ] Incorporate feedback from testers
- [ ] Fix any bugs or broken flows
- [ ] Finalize all poster files for download
- [ ] Prepare print-ready poster pack (ZIP file with all sizes + instructions)

**Day 16 — Monday, June 30: Launch Content Preparation**
- [ ] Film TikTok launch video
- [ ] Write LinkedIn post
- [ ] Write Reddit posts (r/politics, relevant state subs)
- [ ] Prepare Instagram/Facebook/Twitter launch posts
- [ ] Prepare launch email for early volunteer list

**Day 17 — Tuesday, July 1: Influencer Outreach**
- [ ] Compile list of 50+ creators/influencers who've posted about the issue
- [ ] Draft personalized DMs/emails for each
- [ ] Send first wave of outreach (biggest names first)
- [ ] Identify journalists who cover this space — pitch the story

**Day 18 — Wednesday, July 2: Final Pre-Launch**
- [ ] Final fact-check pass on all content
- [ ] Ensure all downloads work
- [ ] Stage all social media posts for scheduled publishing
- [ ] Backup everything
- [ ] Deep breath

**Day 19 — Thursday, July 3: Soft Launch**
- [ ] Share with close network for final feedback
- [ ] Fix any last-minute issues
- [ ] Prepare for tomorrow

**Day 20 — FRIDAY, JULY 4: LAUNCH 🇺🇸**
- [ ] Deploy final website
- [ ] Publish LinkedIn post
- [ ] Post TikTok launch video
- [ ] Post on Instagram, Facebook, Twitter, Threads
- [ ] Post on Reddit
- [ ] Send influencer outreach wave 2
- [ ] Monitor, engage, respond

---

## POST-LAUNCH ROADMAP (July 5 – November 3)

### July: Growth Phase
- Daily social media posting
- Weekly new poster releases
- Recruit first wave of volunteers
- Begin local group formation in Tier 1 districts
- Track and share media coverage

### August: Organize Phase
- Local groups printing and displaying posters
- Coordinated visibility events in Tier 1 districts
- Print shop partnerships established
- Business display network growing
- Content creators making their own versions

### September: Pressure Phase
- Attendance at politician town halls and events
- District-specific campaigns with personalized posters
- Canvassing in highest-priority districts
- Media interviews and press coverage push

### October: Final Push
- Maximum social media intensity
- "30 Days" countdown campaign
- Celebrity/influencer amplification
- Get-out-the-vote coordination
- Election day logistics planning

### November 3: Election Day
- GOTV (Get Out The Vote) push
- Poll monitoring
- Results tracking and celebration/next steps planning

---

## TOOLS & RESOURCES

| Need | Tool | Cost |
|------|------|------|
| Website hosting | Netlify or Vercel | Free |
| Domain | Namecheap or Porkbun | ~$10/yr |
| Design | Figma (free tier) + Canva | Free |
| Poster layout | Canva Pro or Figma | Free tier works |
| Email list | ButtonDown or Mailchimp | Free tier |
| Analytics | Plausible or Umami | Free (self-hosted) |
| Donations | Buy Me a Coffee or Ko-fi | Free (they take small %) |
| District lookup | Google Civic Information API | Free |
| Social scheduling | Buffer or Later | Free tier |
| Volunteer chat | Discord | Free |
| Code hosting | GitHub | Free |
| AI assistance | Claude + ChatGPT | Existing subscriptions |

## KEY DATA SOURCES

| Source | URL | What It Provides |
|--------|-----|-------------------|
| Track AIPAC | trackaipac.com | AIPAC endorsements, funding data |
| Ballotpedia | ballotpedia.org | Race profiles, candidate info |
| Cook Political Report | cookpolitical.com | Race ratings, toss-ups |
| 270toWin | 270towin.com | Interactive maps |
| OpenSecrets | opensecrets.org | Campaign finance data |
| FEC | fec.gov | Official filing data |
| Google Civic API | developers.google.com | Zip-to-district lookup |

---

## SCALABILITY DESIGN

The campaign is designed to start solo and scale:

**Solo (now):** Graham builds core site + 6 posters, launches on social media
**5-10 volunteers:** Others start creating posters, managing social accounts, researching candidates
**50+ volunteers:** Local groups form, regional coordinators emerge, print networks established
**Viral:** The brand, templates, and message are open-source — anyone can create and share content using the established visual language and messaging guidelines

**Key design principle:** Everything should be remixable. Open-source the poster templates. Let people make their own. The brand is the style (B&W + bold color text) and the message (nonpartisan, anti-genocide, pro-accountability), not a centralized organization.

---

## RISK MITIGATION

1. **Accusations of antisemitism:** Proactively feature Jewish voices. Include Jewish organizations against the occupation (Jewish Voice for Peace, IfNotNow, etc.). Never conflate the government of Israel with Jewish people.

2. **Legal risks around poster display:** Never instruct anyone to post on private property without permission or violate local ordinances. Frame all guidance as "here's how people display advocacy materials legally."

3. **Misinformation claims:** Every dollar figure, quote, and vote must be sourced and verifiable. Include source links on the website. Accuracy is credibility.

4. **Platform bans/shadowbanning:** Diversify across platforms. Own the website and email list — those can't be taken away. Don't rely on any single platform.

5. **Burnout (solo operator):** The plan is designed to attract volunteers quickly. The July 4 launch is a minimum viable campaign, not the finished product.

---

*Last updated: June 15, 2026*
*Next session: Finalize brand name + register domain*
