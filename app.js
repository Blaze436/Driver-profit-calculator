const fare = 1000;
const rideDistance = 18;
const deadDistance = 2;
const commissionRate = 0.10;
const petrolPrice = 300;
const vehicleEfficiency = 20;
const salesTaxRate = 0.05;
const maintenanceRate = 2.5;

// Calculates total distance (ride + dead distance)
function distance(rideKM, deadKM) {
  return rideKM + deadKM;
}

// Calculates total fuel expenditure (total distance, petrol price, and vehicle efficiency)
function fuelCost(totalKM, fuelPrice, efficiency) {
  return (totalKM * fuelPrice) / efficiency;
}

// Calculates platform fee (fare and commission rate)
function platformFeeAmount(fareAmount, commission) {
  return fareAmount * commission;
}

// Calculates sales tax amount (fare and sales tax rate)
function salesTaxAmount(fareAmount, taxRate) {
  return fareAmount * taxRate;
}

// Calculates maintenance cost (total distance and maintenance rate)
function maintenanceCostAmount(totalKM, maintenancePerKM) {
  return totalKM * maintenancePerKM;
}

// Calculates net profit (total fare, petrol cost, platform fee, sales tax, and maintenance cost)
function netProfitAmount(totalFareAmount, totalPetrolCost, totalPlatformFee, totalSalesTax, totalMaintenanceCost) {
  return totalFareAmount - totalPetrolCost - totalPlatformFee - totalSalesTax - totalMaintenanceCost;
}

// Calculates profit per kilometer (total profit and total distance)
function profitKMAmount(totalProfit, totalKM) {
  return Math.floor(totalProfit / totalKM);
}

console.log("Fare:", fare);
console.log("Ride Distance:", rideDistance);
console.log("Dead Distance:", deadDistance);
const totalDistance = distance(rideDistance, deadDistance);
console.log("Total Distance:", totalDistance);
console.log("Commission Rate:", commissionRate);
console.log("Petrol Price:", petrolPrice);
console.log("Vehicle Efficiency:", vehicleEfficiency);
const petrolCost = fuelCost(totalDistance, petrolPrice, vehicleEfficiency);
console.log("Petrol Cost:", petrolCost);
const platformFee = platformFeeAmount(fare, commissionRate);
console.log("Platform Fee:", platformFee);
console.log("Sales Tax Rate:", salesTaxRate);
const salesTax = salesTaxAmount(fare, salesTaxRate);
console.log("Sales Tax:", salesTax);
console.log("Maintenance Rate:", maintenanceRate);
const maintenanceCost = maintenanceCostAmount(totalDistance, maintenanceRate);
console.log("Maintenance Cost:", maintenanceCost);
const netProfit = netProfitAmount(fare, petrolCost, platformFee, salesTax, maintenanceCost);
console.log("Net Profit:", netProfit);
const profitPerKM = profitKMAmount(netProfit, totalDistance);
console.log("Profit per KM:", profitPerKM);