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

document.getElementById("calculateButton").addEventListener("click", function() {

    // Step 1: Read all input values and convert to numbers
    const fare = Number(document.getElementById("fare").value);
    const rideDistance = Number(document.getElementById("rideDistance").value);
    const deadDistance = Number(document.getElementById("deadDistance").value);
    const commissionPercent = Number(document.getElementById("commissionRate").value);
    const petrolPrice = Number(document.getElementById("petrolPrice").value);
    const vehicleEfficiency = Number(document.getElementById("vehicleEfficiency").value);
    const maintenanceRate = Number(document.getElementById("maintenanceRate").value);

    // Step 2: Convert commission from percentage (10) to decimal (0.10)
    const commissionRate = commissionPercent / 100;

    // Step 3: Run the calculation chain using the functions defined above
    const totalDistance = distance(rideDistance, deadDistance);
    const petrolCost = fuelCost(totalDistance, petrolPrice, vehicleEfficiency);
    const platformFee = platformFeeAmount(fare, commissionRate);
    const salesTax = salesTaxAmount(fare, 0.05);
    const maintenanceCost = maintenanceCostAmount(totalDistance, maintenanceRate);
    const netProfit = netProfitAmount(fare, petrolCost, platformFee, salesTax, maintenanceCost);
    const profitPerKM = profitKMAmount(netProfit, totalDistance);

    // Step 4: Display the results in the output fields
    document.getElementById("netProfitDisplay").textContent = "Net Profit: " + netProfit + " PKR";
    document.getElementById("profitPerKMDisplay").textContent = "Profit per KM: " + profitPerKM + " PKR/KM";
});
