# Driver Profit Calculator — MVP MUST HAVE Features

## Foundation

**File Purpose:** This document defines the MINIMUM features required for the Driver Calculator to be functional, useful, and launchable.

**App Purpose:** Allow drivers to quickly calculate how much profit they are actually making on a ride by taking into account different hidden factors.

**Ideal User:** Pakistani Drivers looking to calculate how much profit they are actually making simply, easily, and in a fast manner.

**Main Principles:**
- Simple Calculator
- Free if possible
- Very fast
- Very easy to use
- Tailored for Pakistani Drivers

**Format: Use this to explain features**
- Concept What is this thing?
- properties: What does it need?
- User Experience: How user interacts
- Questions: for later

---

## MUST HAVE Features (Non-Negotiable)

### 1. Input Fields

**Concept:** Driver enters ride details

**Properties:**
- Ride Distance (km) — required
- Dead Distance (km) — required, default 0
- Offered Fare (PKR) — required

**User Experience:**
- Big input fields (easy to tap on phone)
- Clear labels in plain Urdu/English mix
- Numeric keyboard pops up on phones

---

### 2. Platform Selection

**Concept:** Driver selects which app they're using

**Properties:**
- It is also an input that will appear as a dropdown in input field
- inDrive (commission: 6-12.99%, user sets exact %)
- Yango (commission: 9.71%)
- Bykea (commission: 20%)
- Custom (user enters their own %, or choose a pre-made preset)

**User Experience:**
- Dropdown or radio buttons
- VAT is auto-calculated (5% of commission)
- Driver can change this per ride

---

### 3. Pre-inputs

**concept:** Where the user will initially enter constant details

**Properties:**
- Petrol price (pkr/L) required - regularly asked daily/weekly
- Vehicle efficiency (KM/L) required - depends on the vehicle
- Maintenance (PKR/KM) optional - User defined for extra miscellaneous factors
- VAT (PKR) automatic - 5% of comission
- Comission pre-set
- It is in a seperate tab

**User experience:**
- Entered by users when they first open the app
- Inputs Can be changed any time

---

### 4. Calculation Output

**Concept:** after clicking the BIG calculate button Shows the results clearly

**Properties:**
- Net Profit (PKR) — BIG and clear
- Profit per KM (PKR/km)
- Always round down!

**User Experience:**
- Result appears immediately (or after clicking "Calculate")
- Big, high-contrast numbers (easy to read in a vehicle)

**Questions for later:**
- Should it have small message or red/yellow/green circle indicating whether the ride is worth it? 

---

### 5. Data Persistence

**Concept:** Save settings so driver doesn't re-enter every time

**User Experience:**
- All the constants are remembered
- Platform selection is also remembered
- Everything loads automatically on next visit


---

## Success Criteria

**Rider should be able to:**
- Pre-input constants(Fuel price, Vehicle efficiency etc)
- Quickly input variables(Dead Distance, Ride Distance, Fare and the app they're on)
- Get the actual Profit and Profit per Kilometer