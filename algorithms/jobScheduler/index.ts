// this: https://leetcode.com/problems/task-scheduler/
/**
 * give a list of characters and n
 * ex: [a,a,a,b,b,b];
 * if n = 2
 * you can rearrange the array like this:
 * with a distance between two same characters
 * a, b, ?, a, b, ?, a, b
 * there are 2 char of distance between a, or b
 * return the rearranged list's length
 * 
 * solution:
 * loop through the input array to counter frequency, and group by frequency:
 * 4:[a,b]
 * 3: [c,z]
 * maintain the count of the  most frequent group
 * ex: 4: [a,b]
 * then create an array of same length as the most frequent count
 * add number to each index with the number of the length of the most frequent group
 */

function scheduler(arr, n) {
  const frequency = {};
  arr.forEach((char) => {
    frequency[char] = frequency[char] || 0;
    frequency[char]++;
  });
  const frequencyGroup = {};
  let mostFrequent = 0;
  const uniqChar = Object.keys(frequency);
  uniqChar.forEach((char) => {
    const count = frequency[char];
    mostFrequent = Math.max(count, mostFrequent);
    frequencyGroup[count] = frequencyGroup[count] || [];
    frequencyGroup[count].push(char);
  });

  const initNum = frequencyGroup[mostFrequent].length;
  let jobArray = Array(mostFrequent).fill(initNum);

  const remainingChartCount = arr.length - (mostFrequent * initNum);
  const n1 = Math.floor(remainingChartCount / (jobArray.length - 1));
  const n2 = remainingChartCount % (jobArray.length - 1);
  jobArray = jobArray.map((num, index) => {
    // no need to deal with the last num
    if (index !== jobArray.length - 1) {
      num += n1;
      if (index < n2) {
        num += n2;
      }
      num = Math.max(num, n + 1);
    }
    return num;
  });

  return jobArray.reduce((sum, n) => { return sum + n }, 0);
}

describe('job scheduler', () => {
  it('should exampel work', () => {
    const arr = ['a', 'a', 'a', 'b', 'b', 'b'];
    const n = 2;
    expect(scheduler(arr, n)).to.equal(8);
  });
  it('should exampel work', () => {
    const arr = ['a', 'a', 'a', 'b', 'b', 'b'];
    const n = 1;
    expect(scheduler(arr, n)).to.equal(6);
  });
  it('should exampel work', () => {
    const arr = ['a', 'a', 'a', 'a', 'b', 'b', 'b', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    const n = 4;
    expect(scheduler(arr, n)).to.equal(17);
  });
});