const {performance} = require('perf_hooks');

function slowrepeatedString(s, n) {
  //take the string s and expand to n characters 
  let i = 0;
  let string = s;
  while (string.length < n) {
    string += string.charAt(i);
    if (i >= s.length) {
      i = 0;
    } else {
      i++
    }
  }
  const regex = /a/g;
  const matches = string.match(regex);
  return (matches || []).length;

  //count how many a's are within string expanded to n characters -- regex?
}

const fastRepeatedString = (s, n) => {
  //find all a characters in string and remainder
  let remainder = n % s.length;
  let aHash = 0;
  let extraAs = 0;
  for (let char in s) {
    if (s.charAt(char) == 'a') {
      aHash++;
      if (char < remainder) {
        extraAs++
      }
    }
  }

  return (aHash * Math.floor(n / s.length)) + extraAs;
}


const t0 = performance.now();
slowrepeatedString('aba', 1000);
const t1 = performance.now();
console.log(`Slow version took ${t1 - t0} milliseconds`);

const t2 = performance.now();
fastRepeatedString('aba', 1000);
const t3 = performance.now();

console.log(`Fast version took ${t3 - t2} milliseconds`);