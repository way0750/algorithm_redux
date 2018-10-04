// Given a menu with items and an amount, produce all the unique combination of items that sum to that amount
//
// For example:
// menu = [
// ('chips', 1),
// ('pizza', 3),
// ('hotdog', 1.50),
// ('fruit juice', 2.25)
// ]
//
// amount = 5
//
// result => [
//   ['chips', 'chips', 'chips', 'chips', 'chips'],
//   ['chips', 'chips', 'pizza'],
//   ['chips', 'chips', 'hotdog', 'hotdog']
// ]

/**
 * soem observations:
 * two senarios will produce the same sub problem:
 * 3 chips and 0 pizza: 5 - 3 = 2 remainding value with two options left: hotdog and fruit juice
 * 0 chips and 1 pizza: 5 - 3 = 2 remainding value with two options left: hotdog and fruit juice
 * that means we can reuse some previous calculations
 * 
 * solution 1
 * keep increamting the amount of each iterm from 0 until the total value is over the give amount
 * each time you increament:
 * you first check the cache and see if the senario have exists before: reduced valued = remaing options
 *   if yes, take the value (array) from cache
 *     and put current option of the current amount into the cache returned array
 *   if no, you pass the new, reduced value along with remaning options you haven't touch
 * to the next call
 *   an array of array should return, and then put current option of current amount in each sub array
 * 
 * 
 * recursion setup:
 * base case:
 *   when option list is empty and amount is zero, return [[]] and array of one sub array, meaning combination is found
 *   when option list is empty and amount is not zero, return [], meaning no combination is found
 * what to always return, an array of sub array, each sub array is a vaild sub combination
 * what to do with each sub array / sub combination
 *   add current options of current amount to each sub combination, then add all this combination to an array
 *   that holds all the combinations
 * how to make problem smaller:
 *   set curOptionAmount to 0
 *   increament that number until curOption * curOptionAmount is > amount;
 *   each time you increment, you recursively call the sub options array, with value - curOptionAmount;
 * 
 * remember to set a cache and pass it!!!
 */
function allUniqueCombos(options, amount: number, cache: object = {}) {
  if (!options.length) {
    return amount === 0 ? [[]] : [];
  }
  const allCombos = [];
  let curOptionAmount = 0;
  const [curOption, optionVal] = options[0];
  while (curOptionAmount * optionVal <= amount) {
    const subOptions = options.slice(1);
    const reducedAmount = amount - (curOptionAmount * optionVal);

    const subOptionsKeys = subOptions.map(([option]) => option).join('');
    const cacheKey = `options: ${subOptionsKeys}; amount: ${reducedAmount}`;
    let subCombos = cache[cacheKey]
      ? cache[cacheKey]
      : allUniqueCombos(subOptions, reducedAmount, cache);

    const curOptionAtCurAmount = Array(curOptionAmount).fill(curOption);
    subCombos = subCombos.map((combo: Array<string>) => {
      return [...curOptionAtCurAmount, ...combo];
    });
    allCombos.push(...subCombos);
    curOptionAmount++;
  }

  const subOptionsKeys = options.map(([option]) => option).join('');
  const cacheKey = `options: ${subOptionsKeys}; amount: ${amount}`;
  cache[cacheKey] = allCombos;
  return allCombos;
}

describe('all unique combos', () => {
  it('should handle only 1 option', () => {
    const menu = [
      ['chips', 1],
    ];
    const amount = 1;
    const actualResult = allUniqueCombos(menu, amount);
    expect(actualResult).to.deep.equal([['chips']]);
  });

  it('should return [] if no patterns found', () => {
    const menu = [
      ['op1', 100]
    ];
    const amount = 120;
    const actualResult = allUniqueCombos(menu, amount);
    expect(actualResult).to.deep.equal([]);
  });

  it('the prompt input', () => {
    const menu = [
      ['chips', 1],
      ['pizza', 3],
      ['hotdog', 1.50],
      ['fruit juice', 2.25]
    ];
    const amount = 5;
    const actualResult = allUniqueCombos(menu, amount);
    expect(actualResult).to.deep.equal([
      [ 'chips', 'chips', 'hotdog', 'hotdog', ],
      [ 'chips', 'chips', 'pizza', ],
      [ 'chips', 'chips', 'chips', 'chips', 'chips', ],
    ])
  });
});