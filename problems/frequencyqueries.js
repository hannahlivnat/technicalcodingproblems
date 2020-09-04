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

function freqQueryTwo(queries) {
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

//Third Attempt : Used additional array to track frequency 
function freqQueryThree(queries) {
  const queryResultTracker = {};
  const freqArr = [];
  const results = [];

  for (let query of queries) {
    let instruction = query[0];
    let value = query[1];

    console.log(instruction, value);

    //check if value is in query tracker already
    let tracker = ((value in queryResultTracker) ? parseInt(queryResultTracker[value]) : 0);
    console.log(queryResultTracker);
    console.log(tracker);

    if (instruction === 1) { //insert

      //update key:value pair in query results
      queryResultTracker[value] = tracker + 1;

      //update count for freq. array
      freqArr[(tracker + 1)] = freqArr[(tracker + 1)] + 1 || 1;
      if (tracker != 0) {
        freqArr[tracker]--;
      }

    } else if (instruction === 2) { //delete

      //update key:value pair in query results
      //update count for freq. array
      if(tracker != 0) {
        queryResultTracker[value]--;
        freqArr[tracker] --;
        freqArr[tracker - 1]++;
      }

    } else { //lookup
      console.log(freqArr);
      results.push(((freqArr[value] > 0) ? 1 : 0));
    }

  }

  return results;

}

//console.log(freqQueryThree([[1,1],[2,2],[3,2],[1,1],[1,1],[2,1],[3,2]]));

//Fourth Attempt
function freqQueryFour(queries) {
  const queryResultTracker = {};
  const freqArr = new Array(queries.length).fill(0)
  const results = [];

  for (let query of queries) {
    let instruction = query[0];
    let value = query[1];
    let tracker = queryResultTracker[value] | 0;

    if (instruction === 1) { //insert

      queryResultTracker[value] = tracker + 1;

      freqArr[(tracker + 1)]++;
      if (tracker != 0) {
        freqArr[tracker]--;
      }

    } else if (instruction === 2) { //delete

      if (tracker != 0) {
        queryResultTracker[value]--;
        freqArr[tracker]--;
        freqArr[tracker - 1]++;
      }

    } else { //lookup
      results.push(((freqArr[value] > 0) ? 1 : 0));
    }

  }

  return results;

}

console.log(freqQueryFour([[1, 1], [2, 2], [3, 2], [1, 1], [1, 1], [2, 1], [3, 2]]));