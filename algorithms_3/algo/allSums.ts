/**
 * Problem:

You have an array of integers nums and an array queries, where queries[i] is
a pair of indices (0-based). Find the sum of the elements in nums from the
indices at queries[i][0] to queries[i][1] (inclusive) for each query,
then add all of the sums for all the queries together. Return that number
modulo 10^9 + 7.

Example:

javascript

sumInRange(nums, queries) => {
  //...
}

let nums = [3, 0, -2, 6, -3, 2];
let queries = [[0, 2], [2, 5], [0, 5]];

sumInRange(nums, queries) // Returns: 10

Explanation: The sum of the elements from indices 0 to 2 is 1,
from indices 2 to 5 is 9, and from indices 0 to 5 is 6. So the
answer is 1 + 9 + 6 = 16.

Write a function to solve this problem.

Constraints:

1 <= nums.length <= 10^5
-10^3 <= nums[i] <= 10^3
1 <= queries.length <= 3 * 10^5
queries[i].length == 2
0 <= queries[i][0] <= queries[i][1] < nums.length
 */

export function sumInRange(nums, queries) {
    if (!nums.length || !queries.length) return 0;
    const sortedQueries = queries.sort(([q1Start, q1End], [q2Start, q2End]) => {
        if (q1Start - q2Start !== 0 ) {
            return q1Start - q2Start;
        } else {
            return q1End - q2End;
        }
    });

    let curSum = nums[0];
    let totalSum = 0;
    let windowStart = 0;
    let windowEnd = 0;
    for (let i = 0; i < sortedQueries.length; i++) {
        const [qStart, qEnd] = sortedQueries[i];
        // the windowStart index will always go forward or stay
        // the windowEnd index will sometimes go forward, sometimes go backward
        while(windowStart !== qStart) {
            curSum -= nums[windowStart];
            windowStart++;
        }

        while(windowEnd !== qEnd) {
            if (qEnd < windowEnd) {
                // if going backward, then - the value at current windowEnd index first
                curSum -= nums[windowEnd];
                windowEnd--;
            } else {
                windowEnd++;
                curSum += nums[windowEnd];
            }
        }
        totalSum += curSum;
    }

    return totalSum;
}

describe('test', () => {
    it('should work', () => {
        let nums = [3, 0, -2, 6, -3, 2];
        let queries = [[0, 2], [2, 5], [0, 5]];
        expect(sumInRange(nums, queries)).to.equal(10);
    });
});