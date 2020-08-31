/* 
There is a collection of input strings and a collection of query strings. 
For each query string, determine how many times it occurs in the list of 
input strings.

https://www.hackerrank.com/challenges/sparse-arrays/problem?h_r=profile
*/


const { performance } = require('perf_hooks');

//O(NQ) performance time
function matchingStrings(strings, queries) {
  const results = new Array(queries.length).fill(0);
  for (let string of strings) {
    for (let i = 0; i < queries.length; i++) {
      if (string === queries[i]) {
        results.splice(i, 1, results[i] + 1)
      }
    }
  }
  console.log(results);
  return results;
}

const t0 = performance.now();
matchingStrings(['def', 'de', 'fgh'], ['de', 'lmn', 'fgh']);
//matchingStrings(['def', 'de', 'fgh', 'aba', 'bb', 'tig', 'app', 'ghe', 'igh', 'ii'], ['de', 'lmn', 'fgh', 'ii', 'bbb', 'ba', 'tig', 'pa', 'pap']);
const t1 = performance.now();
console.log(`Time to run was ${ t1 - t0 } milliseconds`);


//O(N + Q)
const fasterMatchingStrings = (strings, queries) => {
  const condensedStrings = {};
  const results = {};

  for (let query of queries) {
    results[query] = 0;
  }

  strings.map((string) => {
    if (results.hasOwnProperty(string)) {
      results[string]++;
    } 
  });

  console.log(Object.values(results));
  return Object.values(results);
}

const t2 = performance.now();
fasterMatchingStrings(['def', 'de', 'fgh'], ['de', 'lmn', 'fgh']);
//fasterMatchingStrings(['def', 'de', 'fgh', 'aba', 'bb', 'tig', 'app', 'ghe', 'igh', 'ii'], ['de', 'lmn', 'fgh', 'ii', 'bbb', 'ba', 'tig', 'pa', 'pap']);
const t3 = performance.now();
console.log(`Time to run was ${t3 - t2} milliseconds`);


//switched to making strings into hashtable and then 
//looping through queries as an array
const fastestMatchingStrings = (strings, queries) => {
  const condensedStrings = {};
  const results = [];

  for (let string of strings) {
    condensedStrings[string] = condensedStrings[string] + 1 || 1;
  }

  for (let query of queries) {
    if (condensedStrings.hasOwnProperty(query)) {
      results.push(condensedStrings[query])
    } else {
      results.push(0)
    }
  }
  console.log(results);
  return results;
}

const t4 = performance.now();
fastestMatchingStrings(['def', 'de', 'fgh'], ['de', 'lmn', 'fgh']);
//fasterMatchingStrings(['def', 'de', 'fgh', 'aba', 'bb', 'tig', 'app', 'ghe', 'igh', 'ii'], ['de', 'lmn', 'fgh', 'ii', 'bbb', 'ba', 'tig', 'pa', 'pap']);
const t5 = performance.now();
console.log(`Time to run was ${t5 - t4} milliseconds`);