/*
There are a number of people queued up, and each person wears a sticker indicating their initial position in the queue. 
Initial positions increment by  from  at the front of the line to  at the back. Any person in the queue can bribe the person directly in 
front of them to swap positions. If two people swap positions, they still wear the same sticker denoting their original places in line. 
One person can bribe at most two others. Determine the minimum number of bribes that took place to get the queue into its current state!

Function Description: Complete the function minimumBribes in the editor below. It must print an integer representing the minimum number of bribes necessary, 
or Too chaotic if the line configuration is not possible. minimumBribes has the following parameter(s): q, an array of integers
*/

//Initial Attempt : Bubble Sort
const { performance } = require('perf_hooks');

function minimumBribes(q) {
  const bribes = {};
  let tooMuchChaos = false;

  //Sort queue using bubble sort (O(n^2))
  //Keep track of bribes 
  for (let i = 0; i < q.length; i++) {
    let sorted = false;
    for (let j = 0; j < q.length; j++) {
      if (q[j] > q[j + 1]) {
        if (bribes[q[j]] === 2) {
          tooMuchChaos = true;
          break;
        } else {
          if (q[j] in bribes) {
            bribes[q[j]]++;
          } else {
            bribes[q[j]] = 1;
          }
          [q[j], q[j + 1]] = [q[j + 1], q[j]]
        }

      }
    }
    if (sorted) {
      break;
    }
  }
  //if too much chaos, return too much chaos. Else, return min num of bribes
  if (tooMuchChaos) {
    console.log("Too chaotic");
  } else {
    const minBribes = Object.values(bribes).reduce((a, b) => { return a + b });
    console.log(minBribes);
  }
}

const startTime = performance.now();
minimumBribes([2, 1, 5, 3, 4]) //3
const endTime = performance.now();

console.log(`This function took ${endTime - startTime} milliseconds`);

const startTimeTwo = performance.now();
minimumBribes([1, 2, 5, 3, 7, 8, 6, 4]) //7
const endTimeTwo = performance.now();
console.log(`This function took ${endTimeTwo - startTimeTwo} milliseconds`);

//Second Attempt 
//function minBribes(q) {
//  let minBribes = 0;


//}

//const startTime3 = performance.now();
//minBribes([2, 1, 5, 3, 4]) //3
//const endTime3 = performance.now();

//console.log(`This function took ${endTime3 - startTime3} milliseconds`);

//const startTime4 = performance.now();
//minBribes([1, 2, 5, 3, 7, 8, 6, 4]) //7
//const endTime4 = performance.now();
//console.log(`This function took ${endTime4 - startTime4} milliseconds`);