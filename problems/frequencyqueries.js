/* 
Directions : https://www.hackerrank.com/challenges/frequency-queries/problem
*/

// First Attempt -- Failed 5 test cases due to timeout / stack overflow error
function freqQuery(queries) {
  const arrFreq = {};
  const results = [];

  //loop through array
  for (let instruction of queries) {
    let value = instruction[1]
    // if instruction is 1 - add
    if (instruction[0] === 1) {
      if (value in arrFreq) {
        arrFreq[value]++;
      } else {
        arrFreq[value] = 1;
      }
    }
    // if instruction is 2 - delete
    else if (instruction[0] === 2) {
      if (value in arrFreq) {
        if (arrFreq[value] > 1) {
          arrFreq[value]--;
        } else {
          delete arrFreq[value];
        }
      }
    }
    // if instruction is 3 - check freq.
    else {
      let valueExists = 0;
      for (let num of Object.values(arrFreq)) {
        if (num === value) {
          valueExists = 1;
          break;
        }
      }
      console.log(arrFreq, value, valueExists);
      results.push(valueExists);
    }
  }
  return results;
}

//Second Attempt : Used for..in loop instead of Object.value()
//Failed one test case for timing out

function freqQuery(queries) {
  const arrFreq = {};
  const results = [];

  //loop through array
  for (let instruction of queries) {
    let value = instruction[1]
    // if instruction is 1 - add
    if (instruction[0] === 1) {
      if (value in arrFreq) {
        arrFreq[value]++;
      } else {
        arrFreq[value] = 1;
      }
    }
    // if instruction is 2 - delete
    else if (instruction[0] === 2) {
      if (value in arrFreq) {
        if (arrFreq[value] > 1) {
          arrFreq[value]--;
        } else {
          delete arrFreq[value];
        }
      }
    }
    // if instruction is 3 - check freq.
    else {
      let valueExists = 0;
      //CHANGED LOOP BELOW 
      for (let key in arrFreq) {
        if (arrFreq[key] === value) {
          valueExists = 1;
          break;
        }
      }
      results.push(valueExists);
    }
  }
  return results;

}
