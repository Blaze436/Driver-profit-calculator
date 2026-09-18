let fare = 1000;
let rideDistance = 18;
let deadDistance = 2;
const commissionRate = 0.10;
const petrolPrice = 330;

function totalDistance(rideKM, deadKM) {
  return rideKM + deadKM;
}

console.log("Fare:", fare);
console.log("Ride Distance:", rideDistance);
console.log("Dead Distance:", deadDistance);
const distance = totalDistance(rideDistance, deadDistance);
console.log("Total Distance:", distance);
console.log("Commission Rate:", commissionRate);
console.log("Petrol Price:", petrolPrice);