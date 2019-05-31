/**
 * Coins: Given an infinite number of quarters (25 cents), dimes (10 cents),
 * nickels (5 cents), and pennies (1 cent), write code to calculate the number
 * of ways of representing n cents.
 * 
 * solution 1, expensive recursion:
 * go through each coin type and loop the amount of it from 0...until amount *
 * coin type > input n
 * then for each amount you do: amount * coin type then -n, and remaining.. you
 * pass it to the next call without that coin type
 * 
 * solution 2, dynamic programming
 * what is the sub problem
 * for each coin type and each amount: 0..n
 * you can build reusable record:
 * if coin type 3,7,1, and n is 15
 * sort it so you can build from the smallest coin type
 * : 1,3,7
 * then go from smallest change amount: 0 and go all the way to 15 to count how
 * ways to give changes:
 * 
 *       n: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
 * coin: 1: 1 1 1 1 1 1 1 1 1 1 1  1  1  1  1  1 
 *          ^default it to one so later on we can use it as some sort of base case
 *          each of the '1' means only 1 way to make change
 * then you go to the next coin type
 *       n: 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
 * coin: 1: 1 1 1 1 1 1 1 1 1 1 1  1  1  1  1  1 
 * coin: 3: 1 1 1 2
 *          each time you should ask, if I don't use any of this coin type and
 *          pass the entire n to all previous coin type, what would the amount?
 *          then you ask if I use one of this coin type(this case 3), and what
 *          would be all of the possible ways to make change for the remaining value?
 *          so if n is 6 and coin type is 3, then 6-3 (use 3 for once) remaining
 *          value is 3, and you use that as the new n to pick cached value from
 *          same row, and this case you would end up with 2, so 1 + 2 = 3
 *          possible total ways. if coins type are only 1,3, and input is 6
 *          why pick from same row? because the value would already included all
 *          possible ways already. In the same example, coin type 3, and 6-3 =3
 *          the new n is 3, picking it from the same row gives you 2 which includes
 *          all the possible ways for n is 3: 3 or 1,1,1
 *          
 * 
 * time and space complexity:
 * time n * coin types (k)
 * and if you sort the coin types then kLogk + nk
 * space same as time but you can simplify to n because you just need to have
 * one row of cache result
 * 
 */

export function allWaysToMakeChange(coins, n) {
  if (n < 1) {
    1;
  }
  coins = coins.sort();
  const finalRowOfCacheResults = coins.reduce((preRowCacheResult, coinType, coinTypeIndex) => {
    const curRowCacheResult = Array(n+1);
    preRowCacheResult.forEach((countForNotUsingCurCoinType, newN) => {
      let result;
      if (newN === 0) {
        result = 1;
      } else if (coinTypeIndex === 0) {
        // this is the first time we calculating results:
        result = newN%coinType === 0 ? 1 : 0;
      } else {
        const countForUsingCurCoinTypeOnce = curRowCacheResult[newN - coinType] || 0;
        result = countForNotUsingCurCoinType + countForUsingCurCoinTypeOnce;
      }
      curRowCacheResult[newN] = result;
    });
    return curRowCacheResult;
  }, Array(n+1));
  return finalRowOfCacheResults[finalRowOfCacheResults.length - 1];
}