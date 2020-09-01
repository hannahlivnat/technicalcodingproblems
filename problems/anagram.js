/* SUMMARY OF INSTRUCTIONS
Complete the makeAnagram function in the editor below. 
It must return an integer representing the minimum total characters that 
must be deleted to make the strings anagrams.

makeAnagram has the following parameter(s):

a: a string
b: a string

*/
const { performance } = require('perf_hooks');

function makeAnagram(a, b) {
  if (a === b) {
    return 0;
  } else {
    let matchHash = {};
    let deleteCount = 0;
    let longerString = (a.length > b.length) ? a : b;
    let shorterString = (longerString === a) ? b : a;

    // Begin count of each character in longer string
    // with for loop (O(n) time)
    for (let char of shorterString) {
      if (matchHash.hasOwnProperty(char)) {
        matchHash[char][0]++;
      } else {
        matchHash[char] = [1, 0];
      }
    }

    // compare characters of longer string to existing
    // hash
    for (let char of longerString) {
      if (matchHash.hasOwnProperty(char)) {
        matchHash[char][1]++;
      } else {
        deleteCount++;
      }
    }

    for (let array of Object.values(matchHash)) {
      if (array[0] != array[1]) {
        const difference = Math.abs(array[0] - array[1]);
        deleteCount += difference;
      }
    }
    return deleteCount;

  }
}
const t1 = performance.now();
console.log(makeAnagram("showman", "woman"));
const t2 = performance.now();

console.log(`Performance for smaller call was ${t2 - t1} mill.`);

const t3 = performance.now();
console.log(makeAnagram("fcrxzwscanmligyxyvym", "jxwtrhvujlmrpdoqbisbwhmgpmeoke"));
const t4 = performance.now();
console.log(`Performance for longer call was ${t4 - t3} mill.`);
