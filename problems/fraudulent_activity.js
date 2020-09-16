const { count } = require("console");
const { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } = require("constants");
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
        let trailingDays = [];
        for(let j = (i - d); j < i; j++) {
            trailingDays.push(expenditure[j]);
        }
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

//activityNotifications([3, 2, 5], 3); //0

//activityNotifications([], 3); //0

//activityNotifications([1, 2, 3, 4, 4], 4); //0

//activityNotifications([2, 3, 4, 2, 3, 6, 8, 4, 5], 5); //2

//activityNotifications([10, 20, 30, 40, 50], 3); //1

// ==================================================================================
// ATTEMPT TWO REFACTOR - 4 test cases passed / 4 test cases failed
// ==================================================================================

// Complete the activityNotifications function below.
const activityNotifications2 = (expenditure, d) => {
    let clientNotifications = 0;

    // BASE CASE ==================
    if (expenditure.length <= d) {
        console.log(`Base case hit, returned 0`);
        return clientNotifications;
    }
    console.log(expenditure);
    let median;
    let countSort = new Array(201);

    //For while loop:
    let firstIndex = 0;
    let lastIndex = d;
    let isOdd = d % 2 != 0;
    let half = d / 2;
    let oddHalf = Math.ceil(half);
    console.log('Odd Half : ', oddHalf);

    //If even:
    let lowerIndex = half;
    let higherIndex = half + 1;
    console.log(`Half is ${half}. Lower Index and Higher Index are ${lowerIndex}, ${higherIndex}`);
    
    while (lastIndex < expenditure.length) {
        //fill the counting array with 0's. 
        countSort.fill(0);

        //use countsort for the trailing days
        for (let i = firstIndex; i < lastIndex; i++) {
            countSort[expenditure[i]]++;
        }

        let sum = 0;
        let j = 0;

        if (isOdd) {
            let stopper = oddHalf;
            while (sum < stopper) {
                countSort[j] += sum;
                sum = countSort[j];
                j++;
            }
            median = j - 1;
            console.log('(ODD) Median: ', median);

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
            console.log('(EVEN) Median: ', median);
        }

        if (expenditure[lastIndex] >= 2 * median) {
            clientNotifications++;
            console.log(`With median ${median}, client notifications increased to ${clientNotifications}`);
        }

        firstIndex++;
        lastIndex++;
    }
    console.log(`Attempt Two: ${clientNotifications}`);
    return clientNotifications;
};

// ==================================================
// TEST CASES => ATTEMPT TWO
// ==================================================
//activityNotifications2([3, 2, 5], 3); //0

//activityNotifications2([], 3); //0

//activityNotifications2([1, 2, 3, 4, 4], 4); //0
////first round - even, half = 2, median should be (2 + 3) / 2 -- 2.5, notifications = 0

//activityNotifications2([2, 3, 4, 2, 3, 6, 8, 4, 5], 5); //2
////first round - odd, half = 2.5, oddHalf = 2, 22334, 
////second - median should be 2, 1 notification
////third - median should be 3, 0 notification
////fourth - median shoul be 6, 0 notifications

//activityNotifications2([10, 20, 30, 40, 50], 3); //1

// ==================================================================================
// ATTEMPT THREE REFACTOR 
// ==================================================================================

//create a queue
class Queue {
    constructor()
    {
        this.stack = [];
        this.max;
        this.min;
        this.stackStart = 0;
    }
    //Implement Queue Functions
    //enqueue(item)
    enqueue(element) {
        this.stack.push(element);

        if (this.max === undefined || element > this.max) {
            this.max = element;
        }

        if (this.min === undefined || element < this.min) {
            this.min = element;
        }
    }
    //dequeue() - might run into issue here
    dequeue() {
        if (this.stackStart > 5) {
            this.stack.splice(0, this.stackStart);
            this.stackStart = 0;
            return;
        }

        this.stackStart++;
    }
    //front()
    front() {
        if(this.stack.isEmpty()) {
            return "No Elements in Queue";
        }
        return this.stack[0];
    }
    //isEmpty()
    isEmpty() {
        return this.stack.length == 0; 
    }
    //printQueue()
    printQueue() {
        let str = "";
        for (let i = 0; i < this.stack.length; i++) {
            str += `${this.stack[i]} `;
        }
        return str;
    }
    //added helpers -- return max and min
    getMax() {
        return this.max;
    }
    getMin() {
        return this.min;
    }
}

const findMedianFromQueue = (queue, isEven, half) => {
    countSort = new Array(queue.getMax() + 1).fill(0);
    let sum = 0;
    let median; 
    let firstTarget = (isEven) ? half : Math.ceil(half);
    let min = queue.getMin();
    let max = queue.getMax();

    for (let i = queue.stackStart; i < queue.stack.length; i++) {
        countSort[queue.stack[i]]++;
    }
    console.log(countSort, firstTarget, queue.stackStart);

    for (let i = min; i <= max; i++) {
        if (countSort[i] > 0) {
            sum += countSort[i];
            if (sum === firstTarget) {
                median = i;
                console.log(`First Target is ${median}`);
                if (!isEven) return median;
            }
            if (sum > firstTarget) {
                if (median === undefined) {
                    median = i;
                    if (!isEven) return median;
                }
                median = (median + i) / 2; 
                console.log(`Next Target is ${median}`);
                return median;
            }
        }
    }
}

const activityNotifications3 = (dailyTotals, daysBeforeNotificationsSent) => {
    let clientNotifications = 0;
    let arrLength = dailyTotals.length;

    //Base case
    if (arrLength <= daysBeforeNotificationsSent) {
        console.log(`Base met, client notifications are ${clientNotifications}`);
        return clientNotifications;
    }
    
    const queue = new Queue();
    let ceiling = daysBeforeNotificationsSent;
    let isEven = daysBeforeNotificationsSent % 2 === 0;
    let half = daysBeforeNotificationsSent / 2;
    let median;

    // Set up queue structure
    for (let i = 0; i < ceiling; i++) {
        queue.enqueue(dailyTotals[i]);
    }

    console.log('Initial queue is: ', queue.stack);
    console.log(`ceiling is ${ceiling} and array length is ${arrLength}`);
    while (ceiling < arrLength) {
        median = findMedianFromQueue(queue, isEven, half);
        let comparison = dailyTotals[ceiling];
        console.log('Median * 2 is : ', median * 2, `and comparison is `, comparison);
        if (comparison >= (median * 2)) {
            clientNotifications++;
            console.log('Client notifications increases');
        }
        //take one of stack, change floor
        ceiling++;
        queue.dequeue();
        queue.enqueue(comparison);
    }

    console.log(`client notifications are : `, clientNotifications);
    return clientNotifications;
}
// ==================================================
// TEST CASES => ATTEMPT THREE
// ==================================================
activityNotifications3([3, 2, 5], 3); //0
activityNotifications3([], 3); //0
activityNotifications3([1, 2, 3, 4, 4], 4); //0
activityNotifications3([2, 3, 4, 2, 3, 6, 8, 4, 5], 5); //2
activityNotifications3([10, 20, 30, 40, 50], 3); //1