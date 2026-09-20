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
