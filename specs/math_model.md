# Driver Profit Calculator - Mathematical Model

## Constants - User pre-defined

| Constant | Description | Unit | Symbol |
|----------|-------------|------|--------|
| Petrol/Fuel | Petrol price per liter | PKR/L| Pf |
| Vehicle Efficiency or Mileage | Vehicle's Distance per litre | Km/L | Ve|
| Maintenance Cost(optional)| Wear and tear per Kilometer | PKR/Km | Pm |
| VAT(Provisional Tax Rate) | Fare * Provisional Tax Rate | PKR | Pt |

## Variables - User Defined

| Variables | Defination | Units | symbol |
|-----------|------------|-------|--------|
| Ride Distance | Distance of the ride in KM | Km | Dr |
| Dead Distance | Distance of pick-up | Km | Dd |
| Total Distance(Auto-computed) | Ride Distance + Dead Distance | Km | Dt |
| Fare | Payment offered by the passenger | PKR | P |
| Comission Rate | Plateform Fee | PKR | Pc |

## Core calculations

 1. Total distance = Dd + Dr
 2. Petrol cost = (Dt * Pf)/Ve
 3. Platform fee = F * Pc
 4. VAT = F * Pt
 5. Maintanence Cost(optional) = Dt * Pm
 6. Net profit = F - Petrol cost - Platform fee - VAT - Maintanence Cost
 7. Profit per Kilometer = Net profit/Dt

## Sample calculation Walkthrough

### Scenario: Driver in karachi

**Inputs: What user inputs**
- Fare: 1000 PKR
- Ride Distance: 18 Km
- Dead Distance: 2 Km
- Plateform: Yango

**Pre-Inputs: Done by user before-hand**
- Petrol Price: 300 PKR
- Vehicle Efficiency: 20 Km/L
- Platform fee: 10%
- VAT: 5% of the Fare
- Total Maintenance cost: Total distance * 2.5(PKR/KM)

**Calculation: Step by step**
1. Total Distance = 18 + 2 = 20 Km
2. Petrol cost = (20 * 300)/20 = 300 PKR
3. Platform fee = 1000 * 0.10 = 100 PKR
4. VAT = 1000 * 0.05 = 50 PKR
5. Total Maintenance cost = 20 * 2.5 = 50 PKR
6. Net Profit = 1000 - 300 - 100 - 50 - 50 = 500 PKR
7. Profit per Km = 500/20 = 25(Always round down) = 25 PKR/Km

**Outputs: What user sees**
- Actual Profit is 500 PKR
- Actual Profit per Kilometer is 25 PKR/Km

## Real-World Considerations for Pakistan

### Platform fees
- inDrive’s commission rate is ~6-12%(We'll use 10% as default, can be overwritten by the user)
- Yango's commission rate is ~9.71%(We'll use 9.71% as default, can be overwritten by the user)
- Bykea’s commission rate is ~15-20%(we'll use 20% as default, can be overwritten by the user)
- Custom commission rate is user defined

### Petrol Prices
- Current: 341.49 PKR (Source: psopk.com)
- Fluctuation: Every 10-20 Days
- Recommendation: Add an option for user to update Petrol price every Day/Week or self configure fetch from psopk.com

### Additional Considerations
- Provisional Tax: Roughly 5% in every province as of now
- Ac Usage: Can lead to increase in consumption of up to 20% more
- City Traffic: Can cause significant drop in fuel efficiency
- Rent: A lot of driver(including my brother) use cars on daily rent ~3000 PKR
- Oil change: consistent usage leads oil change every month ~5000 PKR