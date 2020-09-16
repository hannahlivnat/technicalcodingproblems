const getSecondLargest = (nums) => {
    // Complete the function
    let max;
    let secondLargest;

    for (let num of nums) {
        if (max === undefined) {
            max = num;
        }

        if (num > max) {
          secondLargest = max;
          max = num;
        }

        if (
            (secondLargest === undefined && num < max) ||
            (secondLargest < num && num < max)
        ) {
            secondLargest = num;
        }
    }
    return secondLargest;
}

console.log(getSecondLargest([10, 9, 9, 8, 8, 11, 8, 0, 9, 1])); //10