/*

A string is said to be a special string if either of two conditions is met:
- All of the characters are the same, e.g. aaa.
- All characters except the middle one are the same, e.g. aadaa.
A special substring is any substring of a string which meets one of those criteria. 
Given a string, determine how many special substrings can be formed from it.

Function Description:
Complete the substrCount function in the editor below. It should return an integer 
representing the number of special substrings that can be formed from the given string.

substrCount has the following parameter(s):
n: an integer, the length of string s
s: a string

*/

// First Attempt

function substrCount(n, str) {
const specialStrings = [];
 for (i = 0; i < n; i++) {
    specialStrings.push(str.charAt(i));
    let buildingSubString = "";
    let skips = 0;
    let nonMatchingChar = "";

    for(j = i + 1; j < n; j++) {
      if (str.charAt(j - 1) === str.charAt(j)) {
        buildingSubString += str.substring(j-1, j+1);
        console.log(buildingSubString);
        if (i + 1 == j) {
          specialStrings.push(str.substring(j - 1, j + 1));
        }
      } else if (str.charAt(j - 1) === str.charAt(j + 1)) {
        if (skips === 0) {
          if (buildingSubString.length > 0) {
            specialStrings.push(buildingSubString);
          }
          skips++;
          nonMatchingChar = str.charAt(j);
          buildingSubString += str.substring(j - 1, j + 2);
          console.log(buildingSubString);
        } else if (skips > 0) {
          let index = buildingSubString.indexOf(nonMatchingChar);
          if(index === buildingSubString.length / 2) {
            specialStrings.push(buildingSubString);
          }
          buildingSubString = "";
        }
      }
    }
   if (buildingSubString.length > 1) {
     specialStrings.push(buildingSubString);
     buildingSubString = "";
   }
  }
  console.log(specialStrings);
  return specialStrings.length;
}

console.log(substrCount(4, "aaaa"));