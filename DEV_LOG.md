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
