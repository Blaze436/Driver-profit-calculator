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
- Researched precise commiccion rates using perplexity

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
