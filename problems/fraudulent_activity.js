/* 
Problem -- https://www.hackerrank.com/challenges/fraudulent-activity-notifications/problem?h_l=interview&playlist_slugs%5B%5D%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D%5B%5D=sorting&isFullScreen=true
*/

const assert = require('assert');

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

//ATTEMPT ONE -- PASSED 3 TEST CASES, FAILED 5 DUE TO TIMEOUT
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
    console.log(evenOrOdd);

    //iterate through expenditure array starting at index d. For each iteration,
    //collect data from i - d : i - 1 and sort to find median. Compare that median
    // to expenditure[i] to determine if notification should be sent.

    for (let i = d; i < expenditure.length; i++) {
        //worst case O(n) time -- num of elements in array
        let trailingDays = expenditure.slice(i - d, i); //worst case O(n) time -- num of elements in array
        let median = findMedian(trailingDays, evenOrOdd); // worst case O()
        console.log(
            "Trailing Days: ",
            trailingDays,
            "Median: ",
            median,
            "Compare to: ",
            expenditure[i]
        );
        if (expenditure[i] >= 2 * median) {
            clientNotifications++;
        }
    }

    return clientNotifications;
};


//TEST CASES

//arr length less than or equal to d
console.log(activityNotifications([3, 2, 5], 3)); //0

//empty array
console.log(activityNotifications([], 3)); //0

//odd array length
console.log(activityNotifications([1, 2, 3, 4, 4], 4)); //0

//even array length
console.log(activityNotifications([1, 2, 3, 10], 2)); //1

//even array length
console.log(activityNotifications([1, 2, 3, 4, 10, 2], 4)); //1

