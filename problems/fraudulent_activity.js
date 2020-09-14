const { count } = require("console");
/* 
Problem -- https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem?h_l=interview&playlist_slugs%5B%5D%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D%5B%5D=sorting&isFullScreen=true
*/

const { performance } = require("perf_hooks");

/* 
Questions:
1 - Will there be any variations in data type of input or can I expect all integers? 

Edge Cases: 
1 - test even vs odd num of trailing days, is median calculated correctly? 
2 - What happens if array is empty?
3 - What happens if array length n < d + 1?

Fradulent activity: 
* Must be >= 2x of client's median spending for d number of days prior
* If above is true, notification is sent
* No notifications can be send until day d + 1, or index d of the array.

Median : 
Middle num for odd num of trailing days / average of two middle 
nums for even num of trailing days

Input: 
Int of trailing days to track, arr of client's total daily expenditures

Output: 
Int representing the number of client notifications
*/

// ==================================================================================
// ATTEMPT ONE - 3 PASSED TESTS, FIVE FAILED TEST FOR TIME OUT
// ==================================================================================
const findMedian = (arr, evenOrOdd) => {
    arr.sort((a, b) => {
        return a - b;
    }); //time complexity depends on browser could be merge sort O(n log n) or Timsort O(n).

    if (evenOrOdd === "odd") {
        let median = arr[(arr.length - 1) / 2];
        return median;
    }

    if (arr.length === 2) {
        let median = (arr[0] + arr[1]) / 2;
        return median;
    }

    let half = arr.length / 2;
    let median = (arr[Math.floor(half)] + arr[Math.ceil(half)]) / 2;
    console.log(`Half is ${half}, and median is ${median}`);

    return median;
};

// Complete the activityNotifications function below.
const activityNotifications = (expenditure, d) => {
    //store num of client notifications
    let clientNotifications = 0;

    //check that array is not empty or less than d
    if (expenditure.length <= d) {
        return clientNotifications;
    }

    //check if d is even or odd
    let evenOrOdd = d % 2 === 0 ? "even" : "odd";

    //iterate through expenditure array starting at index d. For each iteration,
    //collect data from i - d : i - 1 and sort to find median. Compare that median
    // to expenditure[i] to determine if notification should be sent.

    for (let i = d; i < expenditure.length; i++) {
        //worst case O(n) time -- num of elements in array
        let trailingDays = expenditure.slice(i - d, i); //worst case O(n) time -- num of elements in array
        let median = findMedian(trailingDays, evenOrOdd); // worst case O()
        console.log('median:', median);
        if (expenditure[i] >= 2 * median) {
            clientNotifications++;
            console.log(`Attempt One: With median ${median}, client notifications increased to ${clientNotifications}`);
        }
    }
    console.log('Attempt One: ', clientNotifications);
    return clientNotifications;
};

// ===================================================
// TEST CASES => ATTEMPT ONE
// ==================================================

//arr length less than or equal to d
console.log(activityNotifications([3, 2, 5], 3)); //0

//empty array
console.log(activityNotifications([], 3)); //0

//odd array length
console.log(activityNotifications([1, 2, 3, 4, 4], 4)); //0

//even array length
console.log(activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5)); //2

//even array length

console.log(activityNotifications([10, 20, 30, 40, 50], 3)); //1

// ==================================================================================
// ATTEMPT TWO REFACTOR
// ==================================================================================

// Complete the activityNotifications function below.
const activityNotifications2 = (expenditure, d) => {
    let clientNotifications = 0;

    // BASE CASE ==================
    if (expenditure.length <= d) {
        return clientNotifications;
    }

    let median;
    //For while loop:
    let firstIndex = 0;
    let lastIndex = d;
    let isOdd = d % 2 != 0;
    let half = d / 2;
    //If even:
    let lowerIndex = Math.floor(half);
    let higherIndex = Math.ceil(half);
    console.log(`Half is ${half}. Lower Index and Higher Index are ${lowerIndex}, ${higherIndex}`);
    
    while (lastIndex < expenditure.length) {
        //fill the counting array to the set constraint between 0 - 200
        let countSort = new Array(201).fill(0);

        //use countsort for the trailing days
        for (let i = firstIndex; i < lastIndex; i++) {
            countSort[expenditure[i]]++;
        }
        console.log(countSort);

        let sum = 0;
        let j = 0;

        if (isOdd) {
            let stopper = half;
            while (sum < stopper) {
                countSort[j] += sum;
                sum = countSort[j];
                j++;
            }

            median = j - 1;
            console.log(median);

        } else {
            let stopper = higherIndex;
            let firstValue;
            let lastValue;

            while (sum < stopper) {
                countSort[j] += sum;
                sum = countSort[j];

                if (sum === lowerIndex) {
                    firstValue = j;
                }

                if (sum === higherIndex) {
                    lastValue = j;
                }

                j++;
            }

            median = (firstValue + lastValue) / 2;
            console.log(`Median is ${median}`);
        }

        if (expenditure[lastIndex] >= 2 * median) {
            clientNotifications++;
            console.log(`With median ${median}, client notifications increased to ${clientNotifications}`);
        }

        firstIndex++;
        lastIndex++;
    }
    console.log(`Final client notification count: ${clientNotifications}`);
    return clientNotifications;
};

// ==================================================
// TEST CASES => ATTEMPT TWO
// ==================================================
//arr length less than or equal to d
console.log(activityNotifications2([3, 2, 5], 3)); //0

//empty array
console.log(activityNotifications2([], 3)); //0

//odd array length
console.log(activityNotifications2([1, 2, 3, 4, 4], 4)); //0

//even array length
console.log(activityNotifications2([2, 3, 4, 2, 3, 6, 8, 4, 5], 5)); //2

//even array length
console.log(activityNotifications2([10, 20, 30, 40, 50], 3)); //1


