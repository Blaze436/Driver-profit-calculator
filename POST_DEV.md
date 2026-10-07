# Driver Profit Calculator — Post-Development

The MVP is shipped. This file tracks what happens after launch, including distribution, feedback, iteration, and future work.

**Live URL:** https://blaze436.github.io/Driver-profit-calculator/
**Repo:** https://github.com/Blaze436/Driver-profit-calculator
**Launched:** 29 September 2026

---

## Current Status (as of 7 October 2026)

- ✅ Deployed and publicly accessible
- ✅ Google Analytics 4 tracking `calculate_profit` and `save_details` events
- ✅ Platform tracking fixed (dropdown reset bug resolved)
- ⏳ Distribution campaign in progress (7-day plan)
- ⏳ User feedback collection starting

**Unique users in GA4:** ~3 (includes my testing and my brother)
**External drivers:** 0
**Calculations logged:** ~10
**Saves logged:** ~5

---

## Distribution Campaign (Oct 6 – Oct 12)

**Goal:** Reach 10 real drivers using it for multiple rides within 2 weeks.

| Day | Date | Task | Status |
|-----|------|------|--------|
| 1 | Oct 6 | Fix analytics, register custom dimension | ✅ |
| 2 | Oct 7 | Write hints + FAQ, create UTM links, request to join groups | ✅ |
| 3 | Oct 8 | Build hints + English FAQ, start daily commenting | ⏳ |
| 4 | Oct 9 | Urdu FAQ + bilingual hints + Help link | ⏳ |
| 5 | Oct 10 | WhatsApp share button, write 2 video scripts | ⏳ |
| 6 | Oct 11 | Record and edit videos | ⏳ |
| 7 | Oct 12 | Launch — post videos, group posts, first DMs | ⏳ |

**Channels:**
- Facebook groups (inDrive, Yango, Bykea drivers)
- TikTok / YouTube Shorts
- WhatsApp Status + personal shares
- Direct messages to drivers who asked questions

**Rules:**
- Join groups on Day 2 so approvals arrive in time
- Comment before posting — build trust, don't spam
- One UTM link per channel to measure attribution
- WhatsApp is for sharing, not cold discovery

---

## UTM Links

See `utm_links.md`.

---

## User Testing Log

| Date | Person | Role | Channel | Feedback |
|------|--------|------|---------|----------|
| 29 Sep | Brother | inDrive/Yango driver | WhatsApp | Great, but a bit hard to understand at first |
| | | | | |

**Feedback to ask for:**
1. Did any number ever look wrong?
2. What confused you?
3. What feature did you keep wishing existed?

---

## Distribution Session Log

### Day 1 — Oct 6
- Moved commission input listener to top-level
- Fixed Platform tracking bug: When user typed over a preset, the platform was still logged as the preset
- Created `POST_DEV.md`

### Day 2 — Oct 7
- Wrote all 9 field hints and 11 FAQ entries in `texts_en.md`
- Created `utm_links.md` with 7 channel-specific links
- Verified UTM tracking works via GA4 DebugView
- Sent join requests to multiple Facebook driver groups
- Archived the old "Platform" custom dimension (replaced by "Ride Platform")

---

## Post-MVP Feature Backlog

Ordered by priority. Add new ideas here — do not implement without a reason (feedback or strong intuition).

### High Priority
1. **Urdu translation** — full interface, not just FAQ. Critical for market reach. Estimated ~8-10 hours.
2. **Traffic-light verdict indicator** — red/yellow/green on Results screen. Needs threshold research.
3. **"Save as my custom rate" button** — one-tap save after typing an override.

### Medium Priority
4. **Trip history** — save past calculations, view weekly summary.
5. **Pie chart breakdown** — on Results screen or a stats view. Shows where money is going.
6. **(i) info buttons** on each input — only if user testing shows confusion about specific fields.

### Lower Priority
7. **Day/Night contrast toggle** — app is already dark mode; low added value.
8. **Inline dropdown inside commission field** — UX refinement, not a real need.
9. **Auto-fetch petrol prices from PSO** — nice-to-have, adds API dependency.

---

## Metrics to Track (Monthly)

Update this table at the end of each month.

| Month | Users | Calculations | Saves | Avg Session | Notes |
|-------|-------|--------------|-------|-------------|-------|
| Oct 2026 | ? | ? | ? | 1 min | Launch month |
| Nov 2026 | | | | | |
| Dec 2026 | | | | | |

**Where to find these:**
- GA4 → Reports → Engagement → Events
- GA4 → Reports → User attributes → Demographics

---

## Feedback Received (User Quotes)

Direct quotes are gold for college applications. Collect them as they come.

> *(placeholder — add as testers respond)*

**Ask permission before quoting.** A one-line note like "Can I quote you in my college app?" should be enough.

---

## College Portfolio Prep

By November 1 (project deadline), collect:

- [ ] Live URL (final)
- [ ] Total calculations performed
- [ ] Unique users count
- [ ] Geographic breakdown (Karachi, Lahore, other)
- [ ] Platform breakdown (inDrive, Yango, Bykea, Custom)
- [ ] Screenshots of the app in use
- [ ] At least 2 real driver quotes
- [ ] Written reflection (from DEV_LOG)
- [ ] Summary of any features added based on feedback

**Screenshot every milestone.** GA4 dashboard, feedback messages, the app on a real phone. These are portfolio artifacts.

---

## Risks / Watch List

- **Distribution may not take.** If the Facebook/TikTok push doesn't bring users, revisit hooks and channels. This is normal for first launches.
- **Silent bugs on live.** Any bug reports get priority. Check GA4 for anomalies (e.g., sudden spikes in `calculate_profit` without corresponding `page_view`).
- **Brave/AdBlock interference.** Some users' browsers may block GA4. Don't interpret low numbers as low usage without checking.

---

## Definition of "Done" (for MVP)

This project is considered done when:

- [ ] Live on a public URL
- [ ] At least 5 real users (not me, not my brother testing)
- [ ] At least 50 real calculations logged
- [ ] At least 3 pieces of written or verbal feedback collected
- [ ] All obvious bugs fixed
- [ ] Portfolio artifacts compiled

Then move to maintenance mode.