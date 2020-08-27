const pairsOfSocks = (array) => {
  pairs = {}
  totalPairs = 0;
  array.map((sock) => {
    if (pairs.hasOwnProperty(sock)) {
      pairs[sock] = pairs[sock] += 1;
    } else {
      pairs[sock] = 1;
    }
  })

  for (sock of Object.values(pairs)) {
    if (sock > 1) {
      pairs = Math.floor(sock / 2);
      totalPairs += pairs;
    }
  }
  console.log(totalPairs);
  return totalPairs;

} 

pairsOfSocks([1, 1, 3, 1, 2, 1, 3, 3, 3, 3]);