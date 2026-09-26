// Default commission rates for each platform (in percent)
const platformDefaults = {
    inDrive: 10,
    Yango: 9.71,
    Bykea: 20,
    Custom: 0
};

// Driver's saved custom rate (matches the Details input's default for now)
let customCommissionRate = 0; 

// Shows one screen, hides all others
function showScreen(screenId) {
    // Hide all four screens
    document.getElementById("detailsScreen").style.display = "none";
    document.getElementById("settingsScreen").style.display = "none";
    document.getElementById("calculateScreen").style.display = "none";
    document.getElementById("resultsScreen").style.display = "none";

    // Show the requested one
    document.getElementById(screenId).style.display = "block";
}

document.getElementById("navDetails").addEventListener("click", function() {
    showScreen("detailsScreen");
});

document.getElementById("navCalculate").addEventListener("click", function() {
    showScreen("calculateScreen");
});

document.getElementById("navSettings").addEventListener("click", function() {
    showScreen("settingsScreen");
});

document.getElementById("backFromCalculate").addEventListener("click", function() {
    showScreen("detailsScreen");
});

document.getElementById("closeResults").addEventListener("click", function() {
    showScreen("calculateScreen");
});

// Calculates total distance (ride + dead distance)
function calculateTotalDistance(rideKM, deadKM) {
  return rideKM + deadKM;
}

// Calculates total fuel expenditure (total distance, petrol price, and vehicle efficiency)
function fuelCostAmount(totalKM, fuelPrice, efficiency) {
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

function validateDetails(petrolPriceRaw, vehicleEfficiencyRaw, maintenanceRateRaw, customCommissionRaw) {
    // Petrol Price — required, > 0
    if (petrolPriceRaw === "") return "Please enter the Petrol Price.";
    if (Number(petrolPriceRaw) <= 0) return "Please enter a valid Petrol Price.";

    // Vehicle Efficiency — required, > 0
    if (vehicleEfficiencyRaw === "") return "Please enter the Vehicle Efficiency.";
    if (Number(vehicleEfficiencyRaw) <= 0) return "Please enter a valid Vehicle Efficiency.";

    // Maintenance Rate — optional, >= 0
    if (maintenanceRateRaw !== "" && Number(maintenanceRateRaw) < 0) return "Please enter a valid Maintenance Rate.";

    // Custom Commission — required, 0-100
    if (customCommissionRaw === "") return "Please enter a Custom Commission Rate (0 for none).";
    if (Number(customCommissionRaw) < 0 || Number(customCommissionRaw) > 100) return "Custom commission must be between 0 and 100.";

    return null;
}

function validateInputs(petrolPriceRaw, vehicleEfficiencyRaw, maintenanceRateRaw, commissionRateRaw, fareRaw, rideDistanceRaw, deadDistanceRaw) {
    // Validate Petrol Price
    if (petrolPriceRaw === "") return "Please enter the Petrol Price.";
    if (Number(petrolPriceRaw) <= 0) return "Please enter a valid Petrol Price.";

    // Validate Vehicle Efficiency
    if (vehicleEfficiencyRaw === "") return "Please enter the Vehicle Efficiency.";
    if (Number(vehicleEfficiencyRaw) <= 0) return "Please enter a valid Vehicle Efficiency.";

    // Validate Maintenance Rate
    if (maintenanceRateRaw !== "" && Number(maintenanceRateRaw) < 0) return "Please enter a valid Maintenance Rate."; 

    // Validate Commission Rate
    if (commissionRateRaw === "") return "Please enter a Commission Rate (0 for no platform).";
    if (Number(commissionRateRaw) < 0 || Number(commissionRateRaw) > 100) return "Please enter a valid Commission Rate (0-100%).";

    // Validate Fare
    if (fareRaw === "") return "Please enter the Fare.";
    if (Number(fareRaw) <= 0) return "Please enter a valid Fare.";

    // Validate Ride Distance
    if (rideDistanceRaw === "") return "Please enter the Ride Distance.";
    if (Number(rideDistanceRaw) <= 0) return "Please enter a valid Ride Distance.";

    // Validate Dead Distance
    if (deadDistanceRaw !== "" && Number(deadDistanceRaw) < 0) return "Please enter a valid Dead Distance.";

    return null; // No validation errors
}

// When the platform dropdown changes, update the commission input
document.getElementById("platformSelect").addEventListener("change", function() {
    const selectedPlatform = this.value;

    // Ignore the blank placeholder option
    if (selectedPlatform === "") return;

    let rate;
    if (selectedPlatform === "Custom") {
        rate = customCommissionRate;
    } else {
        rate = platformDefaults[selectedPlatform];
    }
    document.getElementById("commissionRate").value = rate;

    // Reset the dropdown so the same option can be re-selected
    this.value = "";
});

document.getElementById("customCommissionInput").addEventListener("input", function() {
    const rawValue = this.value;
    const errorEl = document.getElementById("customCommissionError");

    // Empty: don't update, don't show error (user is still typing)
    if (rawValue === "") {
        errorEl.style.display = "none";
        return;
    }

    const value = Number(rawValue);

    // Negative or over 100: show error, don't update variable
    if (value < 0 || value > 100) {
        errorEl.textContent = "Custom commission must be between 0 and 100.";
        errorEl.style.display = "block";
        return;
    }

    // Valid: hide error, update variable
    errorEl.style.display = "none";
    customCommissionRate = value;
});

document.getElementById("saveDetailsBtn").addEventListener("click", function() {
    const petrolRaw = document.getElementById("petrolPrice").value;
    const efficiencyRaw = document.getElementById("vehicleEfficiency").value;
    const maintenanceRaw = document.getElementById("maintenanceRate").value;
    const commissionRaw = document.getElementById("customCommissionInput").value;

    const error = validateDetails(petrolRaw, efficiencyRaw, maintenanceRaw, commissionRaw);
    const messageEl = document.getElementById("detailsSaveMessage");

    if (error) {
        messageEl.textContent = error;
        messageEl.style.color = "red";
        messageEl.style.background = "rgba(239, 68, 68, 0.15)";
        messageEl.style.display = "block";
        return;
    }

        // All valid
    messageEl.textContent = "Details saved ✓";
    messageEl.style.color = "green";
    messageEl.style.background =  "rgba(34, 197, 94, 0.15)";
    messageEl.style.display = "block";
});

// Hide the save message when the user starts editing any Details field
const detailsInputs = ["petrolPrice", "vehicleEfficiency", "customCommissionInput", "maintenanceRate"];
detailsInputs.forEach(function(id) {
    document.getElementById(id).addEventListener("input", function() {
        const msg = document.getElementById("detailsSaveMessage");
        if (msg.style.display === "block") {
            msg.style.display = "none";
        }
    });
});

// Main function to handle the calculation when the button is clicked
document.getElementById("calculateButton").addEventListener("click", function() {

  // Step 1: Read raw strings (not converted to numbers yet!)
    const fareRaw = document.getElementById("fare").value;
    const rideDistanceRaw = document.getElementById("rideDistance").value;
    const deadDistanceRaw = document.getElementById("deadDistance").value;
    const commissionRateRaw = document.getElementById("commissionRate").value;
    const petrolPriceRaw = document.getElementById("petrolPrice").value;
    const vehicleEfficiencyRaw = document.getElementById("vehicleEfficiency").value;
    const maintenanceRateRaw = document.getElementById("maintenanceRate").value;

    // Step 2: Validate
    const error = validateInputs(
        petrolPriceRaw,
        vehicleEfficiencyRaw,
        maintenanceRateRaw,
        commissionRateRaw,
        fareRaw,
        rideDistanceRaw,
        deadDistanceRaw
    );

    const errorDisplay = document.getElementById("errorDisplay");

    if (error) {
    errorDisplay.textContent = error;
    errorDisplay.style.display = "block";
    document.getElementById("netProfitDisplay").textContent = "—";
    document.getElementById("profitPerKMDisplay").textContent = "—";
    return;
    }

    // Hide any previous error if we got here
    errorDisplay.style.display = "none";

    // Step 3: Now convert to numbers (we know they're valid)
    const fare = Number(fareRaw);
    const rideDistance = Number(rideDistanceRaw);
    const deadDistance = Number(deadDistanceRaw);
    const commissionPercent = Number(commissionRateRaw);
    const petrolPrice = Number(petrolPriceRaw);
    const vehicleEfficiency = Number(vehicleEfficiencyRaw);
    const maintenanceRate = Number(maintenanceRateRaw);

    // Step 4: Set the sales tax rate
    const salesTaxRate = 0.05; // 5% sales tax consistent across all provinces for now

    // Step 5: Convert commission from percentage (10%) to decimal (0.10)
    const commissionRate = commissionPercent / 100;

    // Step 6: Run the calculation chain using the functions defined above
    const totalDistance = calculateTotalDistance(rideDistance, deadDistance);
    const petrolCost = fuelCostAmount(totalDistance, petrolPrice, vehicleEfficiency);
    const platformFee = platformFeeAmount(fare, commissionRate);
    const salesTax = salesTaxAmount(fare, salesTaxRate);
    const maintenanceCost = maintenanceCostAmount(totalDistance, maintenanceRate);
    const netProfit = netProfitAmount(fare, petrolCost, platformFee, salesTax, maintenanceCost);
    const profitPerKM = profitKMAmount(netProfit, totalDistance);

    // Step 7: Display the results in the output fields
    document.getElementById("netProfitDisplay").textContent = Math.round(netProfit);
    document.getElementById("profitPerKMDisplay").textContent = profitPerKM;
    showScreen("resultsScreen");
});

// On page load, sync the Custom rate and pre-fill the commission input
customCommissionRate = Number(document.getElementById("customCommissionInput").value);
document.getElementById("commissionRate").value = customCommissionRate;
