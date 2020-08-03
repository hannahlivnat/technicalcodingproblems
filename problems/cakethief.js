//cake thief - take an array of cake objects which each 
// have a monetary type and value and write 
// a function maxDuffelBagValue() that takes an array of cake type objects and a weight capacity, and returns the maximum monetary value the duffel bag can hold.

const insertionSort = (array, cakeRatio, cakeWeight, cakeValue ) => {
  let firstIndex = 0,
    lastIndex = array.length - 1,
    middleIndex = Math.floor((lastIndex + firstIndex) / 2),
    middleIndexObject = array[middleIndex],
    middleIndexRatio = middleIndexObject.ratio,
    newCakeObject = {ratio: cakeRatio, weight: cakeWeight, value: cakeValue}
  console.log('The object in the middle index is', middleIndexObject , 'and the ratio is', middleIndexRatio);
  console.log('Cake ratio is', cakeRatio);
  if(array[middleIndex + 1] === undefined) {
    return array.splice(middleIndex, 0, newCakeObject)
  }

  let nextObject = array[middleIndex + 1],
    nextObjectRatio = nextObject.ratio

  console.log('The object next to the middle index is', nextObject, 'and the ratio is', nextObjectRatio);

  //this currently creates an infinite loop don't run yet 
  while((parseInt(middleIndexRatio) > parseInt(cakeRatio) || parseInt(nextObjectRatio) < parseInt(cakeRatio) && firstIndex < lastIndex)) {
    if (cakeRatio < nextObjectRatio) {
      lastIndex = middleIndex - 1;
    } else if (cakeRatio > middleIndexRatio) {
      firstIndex = middleIndex + 1;
    }
    middleIndex = Math.floor((lastIndex + firstIndex)/2)
  }

  return array.splice(middleIndex, 0, newCakeObject)
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
      cakearraywithratios.push({ ratio: `${ratio}`, weight: `${cake.weight}`, value: `${cake.value}` })
    } else {
      insertionSort(cakearraywithratios, ratio, cake.weight, cake.value);
      console.log('The new array is', cakearraywithratios);
    }

  })

  let numberOfTopCakes = capacity / hash[highestValueForWeight].weight;
  let valueofTopCakes = numberOfTopCakes * hash[highestValueForWeight].value;
  
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

maxDuffelBagValue(cakeTypes, capacity);

module.exports = maxDuffelBagValue;
