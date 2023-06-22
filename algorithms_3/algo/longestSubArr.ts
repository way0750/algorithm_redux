/**
 * find the longest sub array of integers that the difference between the largest and
 * smallest is no more than 1
 * return the size of that sub array
 * 1,2,1,2,1,2,9,8,9,8,9,-1
 * for the sake of being able to remove all the numbers that are too big or small
 *  then for current number, if any previous numbers (from the big and/or small queue) are
 *  too big or small, pop that queue and move the slow pointer forward
 */

export function slideWindow(arr) {
    let smallQ = [];
    let bigQ = [];
    let slowP = 0;
    let maxLength = 1;
    function isDiffValid(queue, curNum) {
        return Math.abs(curNum - (queue.length ? queue[0] : curNum)) > 1;
    }
    for (let fastP = 0; fastP <= arr.length; fastP++) {
        const curNum = fastP === arr.length ? arr[arr.length - 1] : arr[fastP];
        maxLength = Math.max(fastP - slowP);
        while (isDiffValid(smallQ, curNum) || isDiffValid(bigQ, curNum)) {
            // the difference between curren number between smallQ and bigQ is > 1
            // that means we will need to ger rid of either one of them by moving the slowP forward
            if (isDiffValid(smallQ, curNum)) smallQ.pop()
            if (isDiffValid(bigQ, curNum)) bigQ.pop()
            slowP++;
        }
        // now with one or both queues's numbers completely gone
        // add current number to one of them
        // === smallQ
        // === bigQ
        // one of the Q is empty
        // both are empty
        if (smallQ.length && smallQ[0] === curNum) {
            smallQ.push(curNum)
        } else if (bigQ.length && bigQ[0] === curNum) {
            bigQ.push(curNum);
        } else if (!smallQ.length || !bigQ.length) {
            const newQueue = [curNum];
            const oldQueue = smallQ.length ? smallQ : bigQ;
            const oldQueueNum = oldQueue.length ? oldQueue[0] : Infinity;
            if (oldQueueNum > curNum) {
                bigQ = oldQueue;
                smallQ = newQueue;
            } else {
                bigQ = newQueue;
                smallQ = oldQueue;
            }
        }
    }
    return maxLength;
}

describe('tst', () => {
    it('', () => {
        const array = [1, 1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
        expect(slideWindow(array)).to.equal(7);
    });
});