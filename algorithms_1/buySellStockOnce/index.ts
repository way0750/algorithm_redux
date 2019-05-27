/**
 * Best Time to Buy and Sell Stock
 * 
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * If you were only permitted to complete at most one transaction
 * (i.e., buy one and sell one share of the stock), design an algorithm to find the
 * maximum profit. Note that you cannot sell a stock before you buy one.
  Example 1:

  Input: [7,1,5,3,6,4]
  Output: 5
  Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
              Not 7-1 = 6, as selling price needs to be larger than buying price.
  Example 2:

  Input: [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transaction is done, i.e. max profit = 0.
  
  solution 1:
  set two pointers: one slow, one fast to 0 index
  set curMax value to 0;
  loop through the array
  the fast one moves by one index each loop
 * the sow pointer takes the index of fast pointer whenever value at fast -
 * value at slow is 0 or less
 * whenever fast - slow is larger than curMax, update curMax
 * 
 * return curMax
 * 
 * time and space:
 * time: looping through the array once, within each loop, you might end up call
 * Math.max through out the entire array. So worst case it's 2N which is N
 * space: constant
 */

export function maxProfit (prices) {
  let curMax = 0;
  let buyIndex = 0;
  for (let sellIndex = 0; sellIndex < prices.length; sellIndex++) {
    const buyPrice = prices[buyIndex];
    const sellPrice = prices[sellIndex];
    const profit = sellPrice - buyPrice;
    if (profit <= 0) {
      buyIndex = sellIndex;
    } else {
      curMax = profit > curMax ? profit : curMax;
    }
  }
  return curMax;
}

describe('buy sell stock once', () => {
  it('should return 0 for no possible profit', () => {
    const prices = [9,8,7,6,5,4,3,2,1,0];
    const profit = maxProfit(prices);
    expect(profit).to.equal(0);
  });
  it('should return 0 for empty array', () => {
    const prices = [];
    const profit = maxProfit(prices);
    expect(profit).to.equal(0);
  });
  it('should return 8', () => {
    const prices = [7,8,5,6,1,2,3,4,9,8,7,9,6,5,-1,-2,4,4,4];
    const profit = maxProfit(prices);
    expect(profit).to.equal(8);
  });
  it('should return 5 for example', () => {
    const prices = [7,1,5,3,6,4];
    const profit = maxProfit(prices);
    expect(profit).to.equal(5);
  });
});