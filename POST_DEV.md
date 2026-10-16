# Driver Profit Calculator — Post-Development

The MVP is shipped. This file tracks what happens after launch, including distribution, feedback, iteration, and future work.

**Live URL:** https://blaze436.github.io/Driver-profit-calculator/
**Repo:** https://github.com/Blaze436/Driver-profit-calculator
**Launched:** 29 September 2026

---

## Current Status (as of 14 October 2026)

- ✅ Deployed and publicly accessible
- ✅ Google Analytics 4 tracking `calculate_profit` and `save_details` events
- ✅ Platform tracking fixed (typed over a preset now logs the actual platform)
- ✅ Field hints added below all 9 inputs
- ✅ FAQ built in Settings (11 expandable entries via `<details>`/`<summary>`)
- ✅ Joined ~23 Facebook driver groups across Karachi, Lahore, Islamabad, and Pakistan-wide
- ✅ Left initial comments in approved groups (no link, no app mention)
- ✅ Distribution campaign complete(Total 11-Days)

**Unique users in GA4:** ~45 (includes my brother and me)
**Calculations logged:** ~72
**Saves logged:** ~49
**Shares logged:** 1
**Feedback form submissions:** 0

---

## Distribution Campaign (Oct 6 – Oct 12)

**Goal:** Reach 10 real drivers using it for multiple rides within 2 weeks.

| Day | Date | Task | Status |
|-----|------|------|--------|
| 1 | Oct 6 | Fix analytics, register custom dimension | ✅ |
| 2 | Oct 7 | Write hints + FAQ, create UTM links, request to join groups | ✅ |
| 3 | Oct 8 | Build hints + English FAQ, start daily commenting | ✅ |
| 4 | Oct 9 | Urdu FAQ + bilingual hints | ✅ |
| 5 | Oct 10 | Build share button, write 2 video scripts | ✅ |
| 6 | Oct 11 | Favicon, feedback form, FB banner, admin outreach | ✅ |
| 7 | Oct 12 | Launch — 6 groups posted, video deferred | ✅ |

**Channels:**
- Facebook groups (inDrive, Yango, Bykea drivers)
- TikTok / YouTube Shorts
- Direct messages to drivers who asked questions

**Rules:**
- Join groups on Day 2 so approvals arrive in time
- Comment before posting — build trust, don't spam
- One UTM link per channel to measure attribution
- Use `share_button` as the UTM medium and `in_app` as the UTM campaign for the share-button row
- Build shared links from the page address with any existing UTM tags stripped so shares do not inherit the sharer's tags
- WhatsApp is for sharing, not cold discovery

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

### Day 3 — Oct 8
- Added 9 field hints below their inputs (Details and Calculate screens)
- Built FAQ in Settings using native `<details>` / `<summary>` — 11 entries, no JS needed
- Fixed privacy wording in `texts_en.md`: now accurate about Google Analytics receiving anonymous usage data (not "nothing is sent")
- Added share-button UTM rule to `utm_links.md` (`share_button` medium, `in_app` campaign)
- Created `groups.md` to track joined groups and their promotion rules
- Joined ~23 Facebook driver groups across these categories:
  - **Karachi-focused:** indriver karachi, Karachi yango indrive, Yango Drivers Karachi Group, InDrive Pakistan Support
  - **Lahore-focused:** Indrive Lahore unity, InDriver Lahore
  - **Islamabad-focused:** Indriver & Yango Islamabad & Rwp
  - **Pakistan-wide:** inDrive Pakistan, Indriver Drivers and Partners, Yango Driver Pakistan, Online Drivers Pakistan, InDrive Drivers Pakistan, Indriver Unity Pakistan, InDrive Drivers Community, inDriver Drivers Pakistan, Pakistan Driver Hub, Pakistan indrive-careem-uber-bykea-yango pro, indrive issues and solution, and others
- Commented and engaged in larger groups to build credibility before launch (no links, no app mentions)
- Verified all FAQ entries on phone: no sideways scrolling, native expand/collapse works cleanly

### Day 4 — Oct 9
- Added ⓘ toggle buttons next to every field label (Details and Calculate)
- Hints hidden by default; tap ⓘ to reveal English + Urdu simultaneously
- Built Urdu FAQ section in Settings with `lang="ur" dir="rtl"` — all 11 entries translated
- Decision: skipped Help link on Calculate screen — Settings is one tap away via bottom nav
- Completed Urdu text file (`texts_ur.md`) as source of truth for future translations

### Day 5 — Oct 10
- Facebook in-app browser uses separate storage from Chrome/Safari (documented, unverified on-device due to phone being out of service). Added a note to the FAQ and will add it to the launch post. Low-frequency edge case; recovery is one-time refill.
- Built the Share button on Results screen (native share + WhatsApp fallback)
- Share strips any `utm_` tags from the page URL before generating a fresh link
- Fires `share_click` event with `share_method` parameter
- Wrote two 30-second video scripts (saved in `video_scripts.md`)
- Hint ⓘ buttons: 44px tap target, hover/active background
- Urdu Dead Distance phrasing clarified
- Facebook in-app browser edge case documented in the FAQ

### Day 6 — Oct 11
- Added favicon (yellow taxi) — loads in browser tab
- Built feedback form (Google Form) — linked from Settings with `feedback_click` GA4 event
- Wrote Facebook in-app browser banner (one-time dismissible, keyed on `fbBannerDismissed` in localStorage)
- **Admin outreach:** Messaged admins of top 5 launch groups with a personalized Urdu pitch. Noted that admins may require approval before links are posted. Logged initial response — one group approved, others pending.
- Wrote `docs/image_posts.md` with two image-post drafts (carousel structure for FB groups, standalone for WhatsApp Status)
- Added share-message bidi fix (Urdu + English on separate lines)
- **GA4 Reports Snapshot:** customized with 4 cards (Overview, Event count, First user source/medium, Town/City)
- **GA4 Exploration:** "Platform breakdown" saved — shows Bykea/inDrive/Custom/Yango split for `calculate_profit` events
- Ride platform card in Reports snapshot: not yet available (GA4 propagation delay, expected 24-48h)

### Day 7 — Oct 12 (Launch Day)

Posted launch content across Facebook driver groups. Used the Urdu introduction caption + 3 real screenshots (Details, Calculate, Results showing 393 PKR example).

- **Groups reached:** ~6 total (1 approved + 5 with no rules against links), plus more planned later in the day
- **Rejected by admin:** 1 group
- **Still pending admin response:** the rest
- **WhatsApp Status + personal Facebook:** to be posted end of day

**First-hour results:** A couple of real visitors to the site from the first post. GA4 Realtime confirmed `facebook / group_post` as the source. Expected this to be slow — one post in one group is not a launch, it's the start of a trickle.

**Decisions:**
- Skipped the two-scenario videos. Instead, will record one 60-second hybrid video (intro + demo + benefits + CTA) with AI Urdu voiceover. Simpler to land, better retention.
- Video recording deferred to Oct 13. Needed the day to focus on multi-group posting.
- Carousels (3-image posts) drafted for later posting over the coming weeks.

### Day 8 — Oct 13
- GA4 confirmed the first week: 12 new users, 12 Save Details, 12 Calculate Profit, 1 in-app share (100% conversion from visitor to calculator user)
- Prior days: ~4 admin visits, ~15 calculations
- No feedback form submissions yet
- Launch posts on Oct 12 got buried due to a trending topic ("top up") dominating the group feed
- Decided: post going forward in the 6-9 PM PKT window and mid-morning

### Day 9 - Oct 14
- Recorded and edited the 60-second hybrid demo video (silent master, type-in subtitles, blurred title card, arrows on key moments).
- Removed BGM so the master stays clean for future voiceover / keyboard SFX layering.
- Outro shows the actual URL + "This is a community project: No Ads, No Sign-up".
- Published on YouTube Shorts.
- Posted to 4 Facebook driver groups on Oct 13.
- Remaining Facebook groups, TikTok, and Instagram planned for Oct 14. WhatsApp skipped deliberately.
- Posted on YouTube Shorts: 207 views, ~11s average watch time.
- TikTok and Instagram: 0 views each on the initial posts.
- Facebook: 4 driver groups on Oct 13, plus personal post made public.
- Site visits from video content: ~3.
- No likes, comments, or shares yet.

### Day 10 - Oct 15
- Posted the video in many FaceBook groups.
- The video got approved in many groups by admins.
- The results will be logged tomorrow.

### Day 11 - Oct 16
- logged the overall results of the campaign
- Wrap up this campaign for now.

---

## Group Status Snapshot (Oct 11)

Total groups joined: ~23
Groups with recent activity (< 30 min): 6+
Groups with active admin moderation: unknown — check per-post before launch

**Promotion rules to check before Day 7 launch:**
- [ ] Do they allow self-promotion at all?
- [ ] Do they require approval before posting links?
- [ ] Is there a dedicated "share your product" thread or day?

**Strategy for launch day:**
- Post in 5 highest-activity groups first
   1. inDrive Pakistan — biggest inDrive community
   2. Indriver Drivers and Partners — professional-sounding, likely higher engagement
   3. Indriver Lahore unity — regional, local relevance
   4. Yango Driver Pakistan — Yango coverage
   5. Pakistan indrive-careem-uber-bykea-yango pro — multi-platform, cross-audience
- Space posts a few hours apart, not all at once
- Reply to every comment within the first hour
- Do not spam the same message across all groups — vary the intro

**Self Promotion Rules:**
- **inDrive Pakistan** — By Rule 3: No promotion or spam(Note: Try to reach out to admins, since this is a non-profit app in the best interest of drivers themselves. It would be a bummer to to lose the biggest group)
- **Indriver Drivers and Partners** — Same Rule. Needs approval from admin
- **Indriver Lahore unity** — No rules mentioned
- **Yango Driver Pakistan** — No rules mentioned
- **Pakistan indrive-careem-uber-bykea-yango pro** — Some other groups have rules, while some don't
- Note: Regardless of these rules there are still posts that self promote in the interest of both themselves and the comunity, which is exactly what we are trying to do so there is no solid barrier. We just need to reach out.

---

## Post-MVP Feature Backlog

Ordered by priority. Add new ideas here - do not implement without a reason (feedback or strong intuition).

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

## Risks / Watch List

- **Distribution may not take.** If the Facebook/TikTok push doesn't bring users, revisit hooks and channels. This is normal for first launches.
- **Silent bugs on live.** Any bug reports get priority. Check GA4 for anomalies (e.g., sudden spikes in `calculate_profit` without corresponding `page_view`).
- **Brave/AdBlock interference.** Some users' browsers may block GA4. Don't interpret low numbers as low usage without checking.

---

## Launch Campaign Retrospective (16 October 2026)

**Status:** Campaign wrapped. The Driver app now runs on maintenance: reply to comments, note any feedback, occasional post with a fresh intro. It jumps the queue only for bugs or wrong numbers.

### Numbers

**YouTube Shorts:** 212 views, ~11s average watch time.
**TikTok:** 0 views on initial post.
**Instagram:** 0 views on initial post.
**Facebook:** 4 driver groups (Oct 13) + personal post (Oct 15) + more groups (Oct 15 evening).
**Site visits from video:** ~3-5(excluding Facebook).
**Likes / comments / shares across all platforms:** 0.
**Feedback form submissions:** 0.
**External drivers confirmed:** 0.

### Progress against Definition of Done

| Criterion | Target | Current |
|---|---|---|
| Live on public URL | ✅ | ✅ |
| Real users (not me/family) | 5 | ~40 |
| Real calculations | 50 | ~60 (mostly testing) |
| Written/verbal feedback | 3 | 0 |
| Bugs fixed | — | none reported |
| Portfolio artifacts | — | ongoing |

### What worked

- Video production: silent master with type-in subtitles and blurred title card landed well on YouTube Shorts.
- Real screenshots and a working URL in the outro built trust.
- Admin etiquette: messaging admins in Urdu before posting worked better than the English version.
- Posting across multiple groups over several days rather than blasting one day.
- Honest logging: no fabricated user quotes or inflated numbers.

### What didn't work

- TikTok and Instagram reach: new accounts with no history get throttled. Not the video's fault.
- Facebook group posts were buried by a trending topic ("top up") on the launch night.
- Personal FB post was set to friends-only by accident — wasted the first 24 hours.
- YouTube Shorts viewers don't click external links — video views and site visits are largely uncorrelated.
- No engagement on any post.

### What I'd change next time

- **Post at the right time on the first attempt.** Check the group feed for trending topics before posting. If a big topic is dominating, wait.
- **Verify the audience setting** before publishing on any platform.
- **Lead with a hook, not a demo.** The first 3 seconds decide retention. A sharper hook ("How much do you ACTUALLY make per ride?") would likely improve watch time.
- **Set expectations honestly.** 200 views on a first video is normal. 0 on TikTok is normal for a brand new account. Neither is a failure.
- **Don't chase reach; build the Planner.** The Driver app is shipped. The video will keep trickling. Move on.

### Handoff to maintenance mode

- Reply to any comment or DM within 24 hours.
- Log real feedback when it arrives.
- Post occasionally with a fresh intro; do not re-post the same content.
- Any bug report jumps the queue.
- Do not add features to the Driver app until the Planner MVP is complete.

---