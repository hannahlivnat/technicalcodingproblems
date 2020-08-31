/* 
Summary of Instructions: 
Given a 6x6 2D Array, arr, an hourglass is defined to be a subset of values with
indices falling in the following pattern: 
a b c
  d
e f g
There are 16 hourglasses in arr, and their sum is the sum of the values within the 
hourglass. Calculate the hourglass sum for every hourglass in arr, then print the 
maximum sum. 
*/


const hourglassSum = (arr) => {
  // total can't be below -9 * 7 or -63
  let total = -64;

  //find the hourglasses and collect them in their own nested arrays
  for(let row = 0; row < arr.length - 2; row++){
    for (let col = 0; col < arr[row].length - 2; col++) {
      const topValue = arr[row][col] + arr[row][col+1] + arr[row][col + 2];
      const middleValue = arr[row + 1][col + 1];
      const bottomValue = arr[row + 2][col] + arr[row + 2][col + 1] + arr[row + 2][col + 2];

      const hourglassTotal = topValue + middleValue + bottomValue;
      total = (hourglassTotal > total) ? hourglassTotal : total;
    }
  }
  //sum each hourglass and place the sum in a separate array

  return total;

}



hourglassSum([
[1, 1, 1, 0, 0, 0],
[0, 1, 0, 0, 0, 0],
[1, 1, 1, 0, 0, 0],
[0, 0, 2, 4, 4, 0],
[0, 0, 0, 2, 0, 0],
[0, 0, 1, 2, 4, 0]
]);