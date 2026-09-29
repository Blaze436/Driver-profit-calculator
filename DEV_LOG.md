# Development Log

## Day 1 — Setup & First JavaScript
**Date:** 18 September 2026
**Time spent:** ~3.5 hours

### What I did
- Set up folder structure for Driver-Profit-Calculator
- Created `index.html` with basic HTML5 skeleton (DOCTYPE, head, meta, title, body, h1)
- Created `app.js` and linked it to the HTML with a `<script>` tag
- Verified the JS connection via browser DevTools console
- Learned `let` vs `const` (variable vs constant)
- Learned `console.log()` as the print equivalent
- Wrote my first JavaScript function: `totalDistance(rideKm, deadKm)`
- Fixed a shadowing issue (parameter names matched outer variable names)
- Researched precise commission rates using perplexity

### What worked
- The `<script src="app.js">` tag at the bottom of `<body>` loaded correctly
- Console showed "JS connection successful" on first try

### What confused me
- A `share-modal.js` error appeared in the console that wasn't mine (Apparently Brave browser injects it — ignored)

## Day 2 — Building the Calculation Engine
**Date:** 19 September 2026
**Time spent:** ~3 hours

### What I did
- Wrote 6 new JavaScript functions to complete the calculation engine, adding to the `distance()` function from Day 1
- `fuelCost(totalKM, fuelPrice, efficiency)` — calculates petrol expenditure
- `platformFeeAmount(fareAmount, commission)` — calculates the platform's cut
- `salesTaxAmount(fareAmount, taxRate)` — calculates 5% provincial sales tax on fare
- `maintenanceCostAmount(totalKM, maintenancePerKM)` — calculates wear-and-tear cost
- `netProfitAmount(...)` — subtracts all costs from fare to get net profit
- `profitKMAmount(totalProfit, totalKM)` — divides net profit by total distance and rounds down
- Verified the full chain against two independently hand-calculated scenarios (Karachi inDrive, and Bykea)
- Refactored to fix a "magic number" issue (the sales tax rate `0.05` was hardcoded inline — replaced with a named constant `salesTaxRate`)
- Used `Math.floor()` for the first time, since the spec requires profit per km to always round down
- Established a naming pattern: function names describe actions (`fuelCost`), variable names describe values (`petrolCost`)

### What worked
- Every function returned the expected result on the first try — no debugging needed
- Composition worked cleanly: the output of one function (`totalDistance`) fed directly into the next (`fuelCost`)
- Both test scenarios matched hand calculations perfectly:
  - Karachi: Net Profit 500, Profit/km 25
  - Bykea: Net Profit 382.5, Profit/km 25
- Discovered a real behaviour of `Math.floor()` — in the Bykea test, `382.5 ÷ 15 = 25.5` and the floor function correctly rounded it down to `25`

### What confused me
- Noticed that some values produce decimals (platform fee `100.5`, sales tax `50.25`, net profit `504.25`) while profit per km is always a whole number — this raised the question of whether net profit should also be rounded
- The distinction between "calculation math" (keep precise) and "display formatting" (round for humans) — understood conceptually, but the decision was deferred to when the UI is built
- Learned that `console.log()` is NOT the same as user-facing display; it's a developer tool. The real display will happen in HTML on Day 3

## Day 3 — The DOM: Connecting the Engine to a Real Page
**Date:** 20 September 2026
**Time spent:** ~3 hours

### What I did
- Learned what the DOM is: the browser's live, in-memory copy of the HTML that JavaScript can read from and write to
- Added 7 `<input>` fields to `index.html`, one for each value that was previously hardcoded
- Each input has a unique `id` so JavaScript can find it
- Added a `<button>` with `id="calculateButton"` and two output `<p>` elements
- Used `document.getElementById()` to find elements in the DOM
- Learned that `.value` reads what's inside an input, and everything comes back as a string
- Learned `Number()` to convert strings to actual numbers
- Added a click event listener with `addEventListener("click", function() { ... })`
- Understood that code runs at page load, but input values must be read on click
- Moved all calculation code inside the click handler so it runs on every button press
- Learned `.textContent` to write text into a page element
- Displayed Net Profit and Profit per KM directly on the page (not just the console)
- Changed commission input to a percentage (10, not 0.10) for better UX, and converted it to a decimal at the read point
- Updated `data_schema.json` to reflect the percentage change and renamed `maintenanceCost` to `maintenanceRate`

### What worked
- The full chain ran correctly on first click with Karachi numbers: Net Profit 500, Profit per KM 25
- Successfully ran a second scenario (different efficiency and maintenance values) and got the correct output: Net Profit 300, Profit per KM 20
- The distinction between `.value` (read from input) and `.textContent` (write to page) became clear
- Understood that `type="number"` on an input shows the numeric keyboard on mobile — good for UX

### What confused me
- At first, I thought the input reading code wasn't working because the console showed empty strings. Then I understood: the code runs at page load, but the input fields were empty at that moment. Values typed later need to be read inside an event handler.
- Learned that `Number("")` returns 0 (not NaN), and dividing by zero produces `Infinity`

### What I learned about breaking it
- **Empty fare field** → result becomes a negative number (silent bug — looks like a real calculation)
- **Empty other fields** → similar silent bugs (variables default to 0)
- **Negative inputs** → accepted, produce odd results
- **`1e100` (scientific notation)** → produces huge numbers like `8.5e+99`, technically valid math
- **Setting efficiency to 0** → Petrol Cost becomes `Infinity` → Net Profit becomes `-Infinity`
- **Setting both distances to 0** → Profit per KM becomes `Infinity` (division by zero)
- Letters cannot be typed into `type="number"` fields, and pasting letters is blocked too

## Day 4 — Refinement & UI Structure Planning
**Date:** 21 September 2026
**Time spent:** ~3 hours

### What I did
- Fixed the sales tax magic number by adding `const salesTaxRate = 0.05;` inside the click handler, scoped only to the calculation
- Re-tested the app with the Karachi scenario — confirmed output still returns 500 / 25
- Completed a self-review pass of `app.js` and `index.html` with fresh eyes
- Renamed `distance()` → `calculateTotalDistance()` to avoid shadowing with the variable `totalDistance` and make the function name read as a clear verb
- Renamed `fuelCost()` → `fuelCostAmount()` to follow the `<thing>Amount` naming pattern used by the other functions
- Added a missing unit label to the Maintenance Rate input field (PKR/KM)
- Fixed a spelling typo in a comment ("accross" → "across")
- Sketched the three-layer UI structure on paper:
  - Layer 1: **Details** tab (pre-inputs — vehicle efficiency, fuel price, maintenance)
  - Layer 2: **Calculate Profit** overlay (per-ride inputs — fare, distances, platform dropdown, calculate button)
  - Layer 3: **Results** popup (Net Profit, Profit/KM, verdict message)
- Decided on back/close affordances: `< Back` top-left for the Calculate overlay, `X` top-right for the Results popup, plus the Android back button
- Deferred the traffic-light indicator (red / yellow / green) to post-MVP

### What worked
- The rename of `distance` to `calculateTotalDistance` reads much cleaner at the call site: `const totalDistance = calculateTotalDistance(rideDistance, deadDistance);` — function is a verb, variable is a noun
- Self-review found real issues (missing unit, naming inconsistency, shadowing) — proving the habit is valuable
- Sketches produced a clear three-layer flow that matches the Grok mockups
- Identified a genuinely useful UX principle: "Editing and setting numbers happens in the Details tab; choosing/selecting happens in the Calculate tab" — this is called **separation of configuration from action**

### What confused me
- Nothing major, but I realized the Details tab will need more inputs than the current implementation (4 commission fields, one per platform, instead of just 1)
- Learned that the traffic-light feature isn't hard to code but requires deciding profit thresholds first — a research question for after launch
- Realized my current `index.html` doesn't yet reflect the three-layer design; that restructure comes on a future day

## Day 5 — Multi-Platform Commission Logic
**Date:** 22 September 2026
**Time spent:** ~3 hours

### What I did
- Researched whether commission rates stay constant per driver — confirmed they do (Perplexity research + primary sources)
- Settled a design debate about whether to make presets editable: decided on fixed presets + an active input field that can be freely edited
- Learned about JavaScript objects as lookup tables — direct equivalent of Python dictionaries
- Built the `platformDefaults` object with 4 platforms (inDrive 10, Yango 9.71, Bykea 20, Custom 0)
- Added a `<select>` dropdown to `index.html` with 4 options, each showing the platform name and its default rate
- Kept the commission input field and pre-filled it with inDrive's default (10)
- Wired the dropdown to the input using a `change` event listener — selecting a platform auto-fills the input with that platform's rate
- Confirmed the click handler already works with this design because it reads from the input field (single source of truth)

### What worked
- The `platformDefaults[selectedPlatform]` lookup pattern clicked immediately — it's the same as a Python dict lookup
- All 4 platforms tested successfully:
  - inDrive (10%): Net Profit 500
  - Yango (9.71%): Net Profit 502.9
  - Bykea (20%): Net Profit 400
  - Custom (15%, typed): Net Profit 450
- Realized the design decision made earlier in the day — editable presets vs. fixed presets — simplified the code significantly. No editing logic, no persistence, no array of saved customs
- The `change` event on a `<select>` works cleanly

### What I learned
- JavaScript objects are direct equivalents of Python dictionaries — same use case, slightly different syntax
- The `change` event fires immediately when a dropdown option is selected (unlike `click`, which requires a specific action)
- Keeping one element as the "single source of truth" (the commission input) is cleaner than having multiple elements fight over the same data
- Commission rates are stable per driver (verified via research) — so a "set once" approach is appropriate, not a new value every ride

### What confused me
- For a moment I thought the dropdown and input field were duplicates — then understood they're complementary: the dropdown is a shortcut, the input is what's actually used
- Noted that Yango's rate produces a decimal (502.9), which will need rounding for display — but that's a display concern, not a calculation bug, and it's deferred to when the real UI is built

## Day 6 — Custom Rate & "Last-Used Value" Behavior
**Date:** 23 September 2026
**Time spent:** ~3 hours

### What I did
- Resolved a design fork that came up after Day 5: presets are immutable, there's ONE persistent custom rate set in Details, and the Calculate-area input never writes back to either
- Confirmed via research that commission rates are stable per driver — supports the "set once, remember" design
- Added a "Details (placeholder)" section to `index.html` with a `customCommissionInput` field for the driver's saved custom rate
- Wired the Details input to update `customCommissionRate` using an `"input"` event (fires on every keystroke, unlike `"change"`)
- Updated the dropdown handler with an `if / else` branch: "Custom" loads the driver's saved rate, other platforms load their preset
- Fixed the page-load state: dropdown now starts blank instead of incorrectly showing "inDrive"
- Discovered and fixed a real bug: HTML `<select>` elements don't fire `change` when the user re-picks the already-selected option
- Applied the "fire and forget" pattern: after every pick, the dropdown resets to a blank placeholder option so the same choice can be re-selected
- Confirmed the "never writes back" guarantee by testing: Calculate-area edits do NOT corrupt presets or the Details-saved custom rate

### What worked
- The `if / else` lookup pattern is clean: `platformDefaults[selected]` for presets, `customCommissionRate` for Custom
- The "fire and forget" dropdown design (always resets to blank) makes the dropdown purely a shortcut, not a state indicator — much cleaner mental model
- All 4 platforms + typed overrides tested and correct
- The "never writes back" guarantee held through every attempt to break it

### What I learned
- The `"input"` event fires on every keystroke; `"change"` only fires when the value commits (like leaving the field or pressing Enter)
- HTML `<select>` elements don't re-fire `change` when the user picks the same option again — a real limitation to work around, not a bug
- The "fire and forget" pattern (reset to blank after selection) makes a dropdown usable as a repeated shortcut
- The "last-used value" behavior is already implemented by the input field itself — the input holds whatever was last typed/picked, and nothing resets it. No extra tracking variable needed unless we discover the input gets destroyed on Day 8
- HTML files are static — user changes don't persist across reloads without `localStorage`

### What confused me
- Initially removed the entire Details event listener when I only needed to remove part of it — a small misunderstanding of the instructions
- Had to think through the trade-off: should Details changes live-update the commission input? Decided against it, because with a blank-reset dropdown, we can't tell if the user is currently "on Custom"

### Design decisions locked in
- **Presets are fixed** — never editable
- **One persistent custom rate** — set in Details, lives in a variable until
- **Calculate input is the single source of truth** — dropdown is a shortcut
- **No live-update from Details → Calculate** — user must re-pick Custom to refresh
- **Dropdown resets to blank after every pick** — enables re-selecting the same option

## Day 7 — Validation & Edge Cases
**Date:** 24 September 2026
**Time spent:** ~5 hours

### What I did
- Chose Option A for validation philosophy: block calculation entirely and show a clear error message (vs. warning or silent fixing)
- Reasoned that drivers need one clear outcome, and silent failures (like negative profit from empty inputs) would confuse them
- Updated `index.html`:
  - Dead distance input now defaults to `value="0"` with `step="0.001"` (matches speed-first design)
  - Ride distance input uses `step="0.001"` to accept 3-decimal precision (allows 0.250 for 250m)
  - Labels updated to reflect units and precision
  - Added `<p id="errorDisplay">` for inline validation errors
  - Added `<p id="customCommissionError">` for inline Details-tab errors
- Wrote `validateInputs()` — a single function that receives raw strings and returns either `null` (all valid) or a specific error message
- Validation rules:
  - Fare, ride distance, petrol price, vehicle efficiency: required, must be > 0
  - Commission rate: optional, must be 0-100
  - Dead distance, maintenance rate: optional, must be >= 0
- Rewrote the click handler to:
  1. Read raw strings (not numbers — critical for distinguishing "" from 0)
  2. Validate first
  3. Only convert to numbers if validation passed
  4. Return early on error without touching the calculation chain
- Replaced the initial `alert()` debug with proper on-page error display
- Added "reset results to —" behavior so stale results don't linger alongside new errors
- Applied inline validation to the custom commission input in Details tab (special case: bad data was crossing screen boundaries via the dropdown)
- Deferred inline validation for the other three Details fields (petrol, efficiency, maintenance) to Day 8 when the real Details tab is built

### What worked
- The `validateInputs()` function shape — one function, one job, one place to edit
- Early return pattern in the click handler — cleanly separates "invalid" from "valid" paths
- The raw-string-first approach correctly distinguishes empty inputs from zero values
- All 13 break tests from Day 3 now handled:
  - Empty fare, empty distance, empty petrol, empty efficiency → clear messages
  - Efficiency = 0 → "Please enter a valid Vehicle Efficiency" (not Infinity)
  - Negative numbers → clear messages
  - Commission = 0 → valid (allows taxi / no-platform use case)
  - Commission = 101 → rejected
  - Scientific notation (1e100) → displays huge number (display issue, deferred)
  - Valid Karachi scenario → 500 / 25 as expected

### What I learned
- The critical distinction between validating the raw string (before conversion) versus the number (after conversion)
- The early `return` pattern is cleaner than nesting everything in `if / else` blocks
- Inline validation is important when bad data crosses screen boundaries (custom commission → dropdown → Calculate input)
- Deferred validation is acceptable when the error can be fixed in the same screen where it appears
- Adding validation for just one Details field (custom commission) creates a temporary inconsistency but saves time; the other three will be done in the same pass as the Details tab build on Day 8

### What confused me
- Initially thought the `validateInputs` parameters needed a `0` suffix to avoid shadowing, but the parameters are scoped to the function — the outer variables don't conflict
- Had to work through whether inline validation should be applied to all four Details fields or just custom commission

### Design decisions locked in
- **Option A validation philosophy** — invalid input blocks calculation and shows a clear message
- **Single validation function** — receives raw strings, returns `null` or an error message string
- **Inline validation only where necessary** — custom commission gets it because its data crosses screens; other Details fields defer to Day 8
- **Placeholder parameter naming** — `petrolPriceRaw0` (with a 0) is temporary; will be cleaned up post-MVP

### Known issues deferred to later days
- Long decimal outputs (e.g., `8.5e+99`) — fixed in UI polish with `.toFixed()`
- Details-tab fields other than custom commission don't show inline errors yet — deferred to Day 8
- No persistence — reloading the page resets everything — deferred to Day 12 (localStorage)

## Day 8 — Real Navigation: Details / Calculate Overlay / Settings
**Date:** 25 September 2026
**Time spent:** ~3 hours

### What I did
- Restructured `index.html` from a flat single-page layout into four screen containers:
  - `detailsScreen` — pre-inputs (petrol, efficiency, maintenance, custom commission)
  - `settingsScreen` — placeholder heading only
  - `calculateScreen` — per-ride inputs (fare, distances, dropdown, commission, calculate button)
  - `resultsScreen` — net profit and profit/km displays
- Added a bottom `<nav>` bar with three buttons: Details, +, Settings
- Added a `< Back` button to the Calculate screen and an `✕` close button to the Results screen
- Wrote `showScreen(screenId)` — a single function that hides all four screens and shows one
- Wired five click handlers: three nav buttons, one back button, one close button
- Added `showScreen("resultsScreen")` at the end of the calculate click handler so results become visible after calculation
- Removed the duplicate `errorDisplay` element (one was accidentally in both `detailsScreen` and `calculateScreen`)
- **Kept every existing `id` the same throughout** — no changes needed to the calculation logic in `app.js`

### What worked
- The "hide all, then show one" pattern in `showScreen()` is simple and reliable
- The move-and-keep-IDs strategy paid off — calculation logic still works untouched
- All navigation flows correctly: Details → + → Calculate → Calculate button → Results → ✕ → Calculate → Back → Details
- The `value="0"` approach on the commission input eliminates the empty-field ambiguity Claude flagged before Day 8
- All 13 Day 3 break tests still pass in the new structure

### What I learned
- `element.style.display = "none"` vs `"block"` is the simplest mechanism for screen switching (no CSS classes yet — that comes with Tailwind)
- When you're moving HTML around, preserving IDs means JS doesn't need to know about the move — it just finds the same elements in new places
- A calculation running correctly doesn't mean the user can see the result — the DOM gets updated, but if the container is hidden, nothing appears
- Cross-screen validation is a real challenge: errors on one screen may point to inputs on another

### What confused me
- Momentarily thought the Calculate button was broken — but the calculation was running; the results were just hidden inside a `display: none` container

### Design decisions locked in
- **Details screen is the landing screen** on page load
- **Every screen has its own heading** (no shared persistent `<h1>`) — saves vertical space on mobile and matches the Grok mockups
- **Back button on Calculate → Details** (the "home" concept)
- **Close button on Results → Calculate** (so the driver can tweak inputs and re-calculate)
- **Nav buttons visible at all times** (bottom of the page, even on Calculate and Results — though for MVP, these two screens will hide the nav in a later Tailwind pass to feel more "overlay"-like)

### Known issues deferred
- Cross-screen validation: errors on the Calculate screen may point to inputs on the Details screen. Requires either inline validation on Details fields or routing the user to the right screen automatically
- Screens are still unstyled — everything is default browser styling. Tailwind comes next
- Calculate and Results screens currently take over the full page instead of appearing as overlays with dimmed backgrounds behind them

### Save button(Idea)
Right now the errors made in Detals Tab only appear after the Calculate Button is pressed in Calculate tab. To counteract this problem, I have proposed to add a **Save** Button in Details Tab. Following are three reasons why:
 - It solves the Cross-Screen validation problem: Errors will be caught in the Details Tab when the Save button is pressed.
 - It creates a **Natural Commit** moment, giving the driver a confirmation that their Details are saved.
 - It matches and performs localStroage's actual behaviour: The save button will be used to save the Details in LocalStorage.

 ## Day 9 — Save Button, Tailwind Styling, and Design Backlog
**Date:** 26 September 2026
**Time spent:** ~4 hours

### What I did
- Fixed commission-blank bug: commission is now required (>0), no silent empty-as-zero behavior
- Added Save Details button with `validateDetails()` function
- Wired Save button: shows green "Saved ✓" or red error message inline
- Added "hide on input" listener so message disappears when user starts editing
- Added Tailwind CSS via CDN
- Styled all four screens (Details, Calculate, Results, Settings) with dark-mode card layouts
- Styled bottom nav: fixed position, floating circular + button
- Increased text sizes throughout for driver readability (text-lg body, text-3xl headings, text-4xl result numbers)
- Fixed + button centering with `leading-none`
- Fixed `Math.round(netProfit)` display (502.9 → 503)

### What worked
- Tailwind's card pattern (bg-neutral-800 rounded-xl p-6) creates consistent styling across screens
- The inline "hide message on input" pattern felt much cleaner than setTimeout auto-dismiss
- Splitting number display from label display on Results fixed both formatting and readability
- Empty state design for Settings screen (icon + message) makes the "coming soon" feel intentional

### What I learned
- Tailwind utility class naming (p-4 = padding, bg-neutral-800 = dark gray, etc.)
- Missing `});` on an event handler can silently break ALL subsequent code
- `leading-none` fixes vertical text centering in flex containers
- `text-sm`, `text-base`, `text-lg`, `text-2xl` are the Tailwind size scale — misreading `2xl` as `2x1` breaks the class silently
- The `forEach` pattern for wiring multiple similar listeners

### What confused me
- Broke everything by forgetting the closing `});` — took 5 minutes to find
- `text-2x1` typo went unnoticed until the screenshot showed small headings
- The + button wasn't vertically centered due to the font's default line-height

### Design ideas backlogged (from end-of-day brainstorm)
- **Urdu translation** — critical for market reach. 8-10 hours. Deferred to November refinement.
- **(i) info buttons** on inputs — deferred until user testing shows confusion
- **Traffic-light verdict** on Results — planned post-MVP
- **Pie chart** of cost breakdown — phase 2 "Stats" feature
- **Day/Night contrast toggle** — skipped; app is already dark-mode
- **Inline dropdown inside commission input** — deferred; current separate elements work fine
- **FAQ content in Settings** — deferred to Urdu/help-content pass

### Known issues deferred
- Calculate/Results screens still show bottom nav (should feel more overlay-like)
- No persistence yet — reload resets everything

## Day 10 — Real Phone Testing & Mobile Fixes
**Date:** 27 September 2026
**Time spent:** ~2 hours

### What I did
- Set up Live Server over LAN to open the app on a real Android phone via `http://192.168.0.35:5500`
- Discovered and resolved a Windows Firewall issue blocking the connection
- Tested the entire user flow on the actual device:
  Details → Save → + → Calculate → Results → Close → Back → Settings
- Found and fixed four real device issues:
  1. **+ button off-center** — text characters sit on a baseline, not vertically centered. Fixed with an SVG icon.
  2. **No visible feedback on tap** — added `active:scale-95 transition-transform` to buttons and `active:text-green-500` to nav
  3. **Save message hidden below the fold** — added `scrollIntoView({ behavior: "smooth", block: "center" })` to both error and success paths
  4. **Labels too dim in bright light** — bumped `text-neutral-400` → `text-neutral-300` across labels, `text-neutral-500` → `text-neutral-400` for secondary text
- Additionally increased and brightened the Results screen text for driver readability

### What worked
- The full flow works flawlessly on a real phone
- Number keyboard appears correctly on all number inputs
- No iOS-style zoom-in on input focus (thanks to `text-lg`)
- Keyboard pushes nav bar up without hiding inputs
- Screen transitions feel instant — very responsive
- The nav-first user flow is preferred over back/X buttons — validates the three-destination design

### What I learned
- **Text characters don't center vertically in flex containers** — they sit on a baseline. SVG icons solve this cleanly.
- **Live Server over LAN** is a fast way to test on a real device once the firewall is configured
- **Firewall issues** are a common first-time blocker for phone testing
- **Visual feedback on tap** matters more on mobile than desktop
- **`scrollIntoView`** with smooth behavior is the clean way to draw attention to a message
- **Brightness matters more on a phone** in daylight — a driver needs higher contrast

### What confused me
- Briefly thought the + button still wasn't centered after the first fix — realized the `+` text character was the problem, not the alignment classes

### Design decisions confirmed
- **Nav-first user flow**: driver naturally prefers the bottom nav buttons over back/X buttons
- **Number keyboard** works as intended on mobile

## Day 11 — localStorage Persistence
**Date:** 28 September 2026
**Time spent:** ~2 hours

### What I did
- Learned the `localStorage` API: only two core operations (`setItem`, `getItem`)
- Understood the critical constraint: **localStorage only stores strings** — numbers get silently converted, objects need explicit conversion
- Learned the JSON bridge: `JSON.stringify()` to save objects, `JSON.parse()` to load them
- Designed the storage shape: bundled object under one key (`driverSettings`) rather than four separate keys
  - Reasoning: bundled matches the domain ("driver settings is one thing"), gives atomic saves (no partial corruption), and is easier to extend later
- Wrote `saveSettingsToStorage()` — builds a `settingsToSave` object from all four Details inputs, stringifies it, saves under key `driverSettings`
- Wrote `loadSettingsFromStorage()` — reads the key, checks for `null` (first-time user), parses the JSON, fills the four inputs
- Used `|| ""` fallback on load to guard against missing keys (defensive loading)
- Wired `saveSettingsToStorage()` into the existing Save button handler (success path only)
- Wired `loadSettingsFromStorage()` to run on page load, **before** the commission rate sync
- Verified the full cycle: enter → Save → close → reopen → values restored

### What worked
- The bundled-object approach made the save logic one line, not four
- The `if (saved === null) return;` check cleanly handles first-time users without errors
- The `|| ""` fallback on load future-proofs against format changes
- DevTools Application tab makes the storage directly visible — very useful for confirming the JSON blob is correct
- Order of operations at page load (load settings → sync commission) is critical; getting it wrong would cause silent bugs

### What I learned
- **localStorage only stores strings** — a 2009 design decision to keep the API universal and simple
- **`JSON.stringify()` / `JSON.parse()`** are the bridge for any non-string data (objects, arrays, numbers when type matters)
- **`localStorage.getItem()` returns `null` for missing keys** — the standard way to detect first-time users
- **Bundling related values into one object** gives atomic saves (all-or-nothing) vs. separate keys which can partially fail
- **Order matters at page load**: load from storage BEFORE syncing variables that depend on the loaded values
- **`|| ""` fallbacks** on load prevent `"undefined"` from ever appearing in inputs

### What confused me
- Initially thought `JSON.stringify()` converts "number → string" — clarified that it converts ANY JavaScript value to a JSON-formatted string, and `JSON.parse()` reverses it back to the original type

### Design decisions locked in
- **Single key `driverSettings`** — bundled object, not four separate keys
- **Always save all four fields**, even if some are empty — simpler, uniform handling
- **Defensive loading** — `|| ""` guards against missing keys in future format changes
- **Details-only persistence** — Calculate's commission input is still session-only by design (last-used value, resets on reload)

## Day 12 — Full Manual Test Pass
**Date:** 29 September 2026
**Time spent:** ~2.5 hours

### What I did
- Applied `try...catch` around `JSON.parse` in `loadSettingsFromStorage()` — corrupted data now logs a warning instead of crashing the script
- Changed `Math.round` → `Math.floor` for net profit display, matching MVP_MUST.md's "always round down" spec
- Built a 6-scenario test table with hand-calculated expected outputs (via Desmos regression for speed)
- Ran every scenario through the real app and compared to hand calculations — all 6 matched:
  - Karachi/inDrive: 500 / 25
  - Yango: 502 / 25 (floor applied)
  - Bykea: 400 / 20
  - Custom 12%: 480 / 24
  - Very short ride (0.25 km): 123 / 492
  - Unprofitable ride: -240 / -14 (negative floor)
- Tested first-time user path: tap + before visiting Details
- Tested corrupted storage recovery
- Tested empty maintenance persistence
- Fixed cross-screen error messages to point users to the Details tab

### What worked
- The bundled localStorage object saved and loaded cleanly across reloads
- `try...catch` correctly handled corrupted JSON without crashing
- `|| ""` fallback kept empty maintenance as empty (not "0" or "undefined")
- Order of operations at page load (load settings → sync commission) remained correct

### What I learned
- **Hand calculation before testing is essential** — otherwise "it looks right" replaces real verification
- **Desmos can be used as a calculation engine** for multiple scenarios — a good trick for future testing
- **`Math.floor` on negatives rounds away from zero** (-13.333 → -14). Acceptable for our use case since any negative is "losing money" anyway.
- **`try...catch` is the standard pattern** for any code that parses external data (JSON, files, network responses)
- **Cross-screen validation errors are a real UX problem** — the fix is to include location hints in error messages

### Edge case discovered (not a bug)
- **Very short rides inflate Profit/KM.** Scenario 5 (0.25 km) showed "492 PKR/km" from a 123 PKR total profit. Mathematically correct but misleading, because fare has a fixed-minimum component that doesn't scale with distance.
- **Decision:** Leave as-is for MVP. The driver sees both numbers and can interpret them. Post-MVP might hide Profit/KM for rides under 1 km or add a "high due to short ride" label.

### Design decisions locked in
- **Rounding is always down** (`Math.floor` for both net profit and profit/KM) — conservative choice, honest for a profit calculator
- **Cross-screen error messages point to Details tab** — saves the driver from hunting for the missing field
- **Corrupted storage fails safe** — behaves like first-time user, no crash

## Day 13 — Deploy Day & Google Analytics
**Date:** 29 September 2026
**Time spent:** ~3 hours

### What I did
- Made the GitHub repository public (required for free GitHub Pages)
- Enabled GitHub Pages from Settings → Pages → main branch → root folder
- Received the live URL: https://blaze436.github.io/Driver-profit-calculator/
- Tested the live site on laptop and phone (both WiFi and mobile data)
- Verified the live site behaves identically to the local version (all calculations correct, persistence works, all four screens navigate properly)
- Set up Google Analytics 4 as a new property
- Added the GA4 tracking script to `index.html` in the `<head>`
- Added two event tracking calls to `app.js`:
  - `calculate_profit` (fires in the Calculate button handler)
  - `save_details` (fires in the Save Details handler)
- Registered a Custom Dimension in GA4 for the `platform` event parameter
- Verified tracking works via GA4 Realtime report
- Fixed a platform tracking bug: every calculation was logging as `platform: "Custom"` because the dropdown resets to `""` after each selection
  - Added a `lastSelectedPlatform` variable to remember the last choice
  - Updated the dropdown handler to set it
  - Updated the gtag call to use it instead of reading the (already-reset) dropdown value
- Sent the feedback request to my brother and will send to more testers shortly

### What worked
- GitHub Pages deployment was a one-click process once the repo was public — no build step, no config, just worked
- The live URL works over mobile data (not just WiFi), which is what a driver will actually use
- GA4 Realtime showed events within 30 seconds of firing
- The `platform` dimension fix was a two-line change

### What I learned
- **GitHub Pages only works on public repos for free accounts** — the "private repo" upgrade prompt is why it initially looked like a paid feature
- **GA4's setup form has an `https://` prefix built into the field** — typing the full URL again creates `https://https://...` and triggers a validation error
- **Brave Browser blocks Google Analytics by default** (and most trackers) — the shield icon in the address bar toggles per-site blocking. Had to disable it for my own site to see the events come through
- **GA4 Realtime only shows the last 30 minutes of activity** — historical reports take 24–48 hours to populate
- **Custom event parameters need a "Custom Dimension" registered** before they show up in GA4 reports — otherwise they're just stored, not displayed
- **Fire-and-forget dropdowns reset the selected value to blank** — good for UX (allows re-selection) but breaks anything that reads the dropdown later. Solution: save the last-selected value in a separate variable

### What confused me
- Briefly thought GA4 wasn't working — turned out Brave was blocking the tracking script on my own browser
- The URL validation error on GA4 setup (double `https://`)

### Real-world metrics so far
- Live URL deployed and publicly accessible
- Total unique visitors to the live site: ~5 (including my own tests)
- Total `calculate_profit` events: 3
- Total `save_details` events: 0 (all testers so far have been me)
- Real user testing: starting now — feedback message sent to my brother
