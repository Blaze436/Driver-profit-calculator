# Driver Profit Calculator — Text Content

## Details Tab — Field Hints

**Petrol Price (PKR/L)**
Current petrol price per litre in rupees. Please update regularly (e.g., 330).

**Vehicle Efficiency (KM/L)**
Car's Mileage or Average. How many kilometers your vehicle travels on 1 liter of petrol.

**My Custom Commission Rate (%)**
Self-Entered Commission in Percent your ride-hailing app takes per ride. Pre-sets for YanGo, inDrive, and BYKEA are available.

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
Which app this ride is from. Selecting one auto-fills the commission rate.

**Commission Rate (%)**
Percentage the platform takes from the fare. Auto-filled when you pick a platform, but you can edit it.

## Settings Tab — FAQ

**Why is Petrol Price empty?**
Due to constantly fluctuating Price of Petrol, the app requires you to self-enter and update it regulary. Updating Every week is ideal.

**What is dead distance?**
Dead distance is the km you drive to reach the passenger before the ride starts. Example: if the app shows the passenger is 3 km away, that’s 3 km of dead distance. You burn petrol but don’t earn any fare for it.

**What is vehicle efficiency?**
Also known as car's Mileage or Average: how many kilometers your vehicle travels on 1 litre of petrol. A Honda CD70 might get 45 km/L. A Suzuki Alto with AC might get 15 km/L. Check your owner's manual, or estimate it yourself.

**What is My Custom Commission?**
Your Self-Entered commission rate(%). It can be saved and used when calculating a ride through Platform selector. It appears as "Custom" in drop down menu.

**What number should I use for maintenance?**
This is optional. It’s a rough estimate of wear‑and‑tear cost per km: tyres, oil, chain, small repairs, etc. A common estimate for bikes is 2.5 PKR/km. Cars cost more. If you're unsure, leave it empty.

**What is Save Details button?**
It saves your Petrol Price, Vehicle Efficiency, Custom Commission, and Maintenance rate locally in your browser, so you don't have to enter them again. Remember: they will be lost if you clear your Browser Cache.

**Where do the commission rates come from?**
- inDrive: 10% (varies by city, range is 8–12%)
- Yango: 9.71% (uniform nationally in Pakistan)
- Bykea: 20% (approximate — no official source)

You can override any of these if your actual rate is different.

**Is there Sales Tax?**
The app assumes 5% sales tax on the fare — this is the standard provincial rate accross Pakistan. It's calculated on the full fare.

**How is profit calculated?**
Fare − Petrol cost − Platform commission − Sales tax − Maintenance = Net Profit.
Then Profit per KM = Net Profit ÷ Total Distance.

**Why does profit per KM round down?**
Being conservative. If the actual value is 25.9 PKR/km, the app shows 25. This avoids showing more profit than you actually made.

**Is my data private?**
Yes. Your settings are saved only on your own device, in your browser's local storage. Nothing is sent to any server. If you clear your browser data, your settings will be lost.