//cake thief - take an array of cake objects which each 
// have a monetary type and value and write 
// a function maxDuffelBagValue() that takes an array of cake type objects and a weight capacity, and returns the maximum monetary value the duffel bag can hold.

// INSERT SORT HIGHEST - LOWEST
const insertionSort = (arr, val) => {
  //set first and last index point 
  let base = 0;
  let ceiling = (arr.length - 1);

  //find midpoint to compare value to
  let midpoint = Math.floor((ceiling + base) / 2);
  //while the value does not match
  while((val < arr[midpoint] || val > arr[midpoint + 1]) || base < ceiling) {
    //if the value < midpoint
    if (val < arr[midpoint]) {
      //set first to midpoint
      base = midpoint;
    }
    //if the value > midpoint
    else if (val > arr[midpoint + 1]){
      //set last to midpoint
      ceiling = midpoint
    }
    //set new midpoint
    midpoint = Math.floor((ceiling + base) / 2)
  }
  //insert value into correct point within sorted array
  arr.splice(midpoint, 0, value);
  console.log(arr);
  return arr;
}

insertionSort([5, 4, 3], 2);

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
