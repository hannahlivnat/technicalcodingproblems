// Fibonnaci Sequence

// BACK TO LOOPS -- BETTER VERSION OF LOOP
// This is called the "bottoms-up approach" -- O(n) time and O(1) complexity
const fib = (n) => {
    if (n < 0) {
        throw new Error(
            "Index was negative, no such thing as a negative index in a series."
        );
    }
    if (n === 0 || n === 1) {
        return n;
    }

    let prevPrev = 0;
    let prev = 1;
    let current;

    for (let i = 1; i < n; i++) {
        current = prev + prevPrev;
        prevPrev = prev;
        prev = current;
    }

    return current;
}

// SOLUTION - LOOPING
//module.exports = (n) => {
//    const series = [0, 1];
      //if(n < 0) {
      //  throw new Error(
      //      "Index was negative, no such thing as a negative index in a series."
      //  );
      // }
//    if (n > 0) {
//        if (n == 1) {
//            return 1;
//        }
//        for (i = 2; i <= n; i++) {
//            const sum = parseInt(series[i - 1]) + parseInt(series[i - 2]);
//            series.push(sum);
//            console.log(series);
//        }
//        return series[series.length - 1];
//    }

//    return 0;
//}

// BAD SOLUTION -- EXPONENTIAL TIME COST THROUGH THIS RECURSIVE METHOD
//const fib = (n) => {
//  if(n === 0 || n === 1) {
//    return n;
//  }
//  return fib(n-1) + fib(n-2);
//}

// use memoization to increase performance
// memoization ensures a function doesn't run the same inputs more than once by keeping a record
// Takes up n space and building call stack that occupies n space so a bit heavy on the space expense
//class Fib {
//    constructor() {
//        this.memo = {};
//    }

//    fib = (n) => {
//        // negative arguments not allowed
//        if (n < 0) {
//            throw new Error(
//                "Index was negative, no such thing as a negative index in a series."
//            );
//        }
//        // base cases
//        if (n === 0 || n === 1) {
//            return n;
//        }

//        if(this.memo.hasOwnProperty(n)) {
//          return this.memo[n];
//        }

//        const result =  this.fib(n - 1) + this.fib(n - 2);
//        this.memo[n] = result

//        return result;
//    };
//}



// MATRIX MULTIPLICATION BRINGS COST DOWN TO O(lg(n))

module.exports = fib;
