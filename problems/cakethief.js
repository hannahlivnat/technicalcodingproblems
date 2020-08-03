//cake thief - take an array of cake objects which each 
// have a monetary type and value and write 
// a function maxDuffelBagValue() that takes an array of cake type objects and a weight capacity, and returns the maximum monetary value the duffel bag can hold.

// INSERT SORT HIGHEST - LOWEST
const insertionSort = (arr, val) => {
  //set first and last index point 

  //find midpoint to compare value to

  //while the value does not match

    //if the value < midpoint
      //set first to midpoint
    //if the value > midpoint
      //set last to midpoint

    //set new midpoint

  //insert value into correct point within sorted array
}


const maxDuffelBagValue = (cakeTypes, capacity) => {
  //analyze the value/weight ratio of each cake
  const cakearraywithratios = []

  let highestValueForWeight = 0;

  cakeTypes.map((cake) => {
    let ratio = cake.value / cake.weight;

    if (ratio > highestValueForWeight) {
      highestValueForWeight = ratio;
    }

    if(cakearraywithratios.length === 0 ) {
      cakearraywithratios.push({ ratio: ratio, weight: cake.weight, value: cake.value })
    } else {
      insertionSort(cakearraywithratios, ratio, cake.weight, cake.value);
      console.log('The new array is', cakearraywithratios);
    }

  })

  let numberOfTopCakes = capacity / cakearraywithratios[highestValueForWeight].weight;
  let valueofTopCakes = numberOfTopCakes * cakearraywithratios[highestValueForWeight].value;
  
  if (capacity - numberOfTopCakes === 0 ) {
    return valueofTopCakes;
  } 

  
}


const cakeTypes = [
  { weight: 7, value: 160 },
  { weight: 3, value: 90 },
  { weight: 2, value: 15 },
];

const capacity = 20;

//maxDuffelBagValue(cakeTypes, capacity);

module.exports = maxDuffelBagValue;
