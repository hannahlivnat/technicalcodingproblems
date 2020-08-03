const assert = require('assert');
const fib = require('../problems/fib')
const maxDuffelBagValue = require('../problems/cakethief')

//Fibonacci Tests

describe('fib()', () => {
  it('should return 0 when passed value 0 as argument', () => {
    assert.equal( fib(0), 0);
  });

  it('should return 1 when passed argument 1', () => {
    assert.equal(fib(1), 1);
  })

  it('should return 8 when passed argument 6', () => {
    assert.equal(fib(6), 8);
  })

  it('should return error when passed negative argument', () => {
    assert.throws(() => {fib(-1);},
        Error,
        /Index was negative, no such thing as a negative index in a series./
    );
  })

  
})

// Cake Thief
describe('maxDuffleBagValue()', () => {
  //it('should return error when passed negative weight or value', () => {
  //  const cakeTypes = [
  //    { weight: -7, value: 160 },
  //    { weight: 3, value: 90 },
  //    { weight: 2, value: 15 },
  //  ];

  //  const capacity = 20;

  //  assert.throws(() => { maxDuffelBagValue(cakeTypes, capacity) },
  //    Error,
  //    /Index was negative, no such thing as a negative index in a series./
  //  );
  //})
  it('should return 16000 when given the below cake array with one cake types in duffle bag', () => {
    const cakeTypes = [
      { weight: 1, value: 800 },
      { weight: 3, value: 90 },
      { weight: 2, value: 15 },
    ];

    const capacity = 20;

    assert.equal(maxDuffelBagValue(cakeTypes, capacity), 16000);
  })
  it('should return 555 when given the below cake array with multiple cake types in duffle bag', () => {
    const cakeTypes = [
      { weight: 7, value: 160 },
      { weight: 3, value: 90 },
      { weight: 2, value: 15 },
    ];

    const capacity = 20;

    assert.equal(maxDuffelBagValue(cakeTypes, capacity), 555);
  })
})

