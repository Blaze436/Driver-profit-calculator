# Driver Profit Calculator — Text Content

## Details Tab — Field Hints

**Petrol Price (PKR/L)**
Current petrol price per litre in rupees. Please update regularly (e.g., 330).

**Vehicle Efficiency (KM/L)**
Car's Mileage or Average. How many kilometers your vehicle travels on 1 liter of petrol.

**My Custom Commission Rate (%)**
The rate used when you pick "Custom" from the Platform box in the calculator. Enter your actual rate if it differs from the presets.

**Maintenance Rate (PKR/KM)**
Optional. Estimated cost of wear-and-tear per kilometer in rupees. Leave empty if unsure.

## Calculate Tab — Field Hints

**Fare (PKR)**
The total amount the passenger pays for this ride.

**Ride Distance (KM)**
Distance from pickup to dropoff in kilometers. Decimals allowed. Example: 0.25 for 250m

**Dead Distance (KM)**
Distance from current location to pickup in kilometers. Defaults to 0 if you're already at the pickup.

**Platform**
Which app this ride is from. Selecting one auto-fills the Commission Rate field, and the Platform box then resets — this is normal.

**Commission Rate (%)**
Percentage the platform takes from the fare. Auto-filled when you pick a platform, but you can edit it.

## Settings Tab — FAQ

**Why is Petrol Price empty?**
Due to constantly fluctuating Price of Petrol, the app requires you to self-enter and update it regulary. Updating Every week is ideal.

**What is dead distance?**
Dead distance is the km you drive to reach the passenger before the ride starts. Example: if the app shows the passenger is 3 km away, that’s 3 km of dead distance. You burn petrol but don’t earn any fare for it.

**What is vehicle efficiency?**
Also known as mileage or average: how many kilometers your vehicle travels on 1 liter of petrol. The most accurate way to find yours: fill the tank, reset your trip meter, drive normally, then refill and divide kilometers driven by liters added.

**What is My Custom Commission?**
Your Self-Entered commission rate(%). It can be saved and used when calculating a ride through Platform selector. It appears as "Custom" in drop down menu.

**What number should I use for maintenance?**
Optional. A rough estimate of wear-and-tear cost per km: tyres, oil, chain, small repairs. One way to estimate: take your total yearly/monthly maintenance spending and divide it by total kilometers driven. If unsure, leave it empty.

**What is Save Details button?**
It saves your Petrol Price, Vehicle Efficiency, Custom Commission, and Maintenance rate locally in your browser, so you don't have to enter them again. Remember: they will be lost if you clear your Browser's site data

**Where do the commission rates come from?**
- inDrive: 10% (varies by city, range is 8–12%)
- Yango: 9.71% (uniform nationally in Pakistan)
- Bykea: 20% (approximate — no official source)

You can override any of these if your actual rate is different.

**Is there Sales Tax?**
The app assumes 5% sales tax on the fare. Rates can differ or change by province. It's calculated on the full fare.

**How is profit calculated?**
Fare − Petrol cost − Platform commission − Sales tax − Maintenance = Net Profit.
Then Profit per KM = Net Profit ÷ Total Distance.

**Why does profit per KM round down?**
Being conservative. If the actual value is 25.9 PKR/km, the app shows 25. This avoids showing more profit than you actually made.

**Is my data private?**
Your settings (petrol price, efficiency, commission, maintenance) stay on your device. Nothing is sent to any server. However, anonymous usage data — like how many times the app is opened and which platform was picked — is collected through Google Analytics to help improve the app. No fares, distances, or settings are ever sent.