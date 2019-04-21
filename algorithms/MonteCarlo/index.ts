/**
 * roll a dice for 5, and roll again for 5
 * roll a dice for 5, and roll again for 6
 * 
 * there should be same likelihood for both scenarios 
 */

function rollDice(round, nums) {
  let count = 0;
  while (round) {
    const allCondFulfilled = nums.every((num) => {
      const rollNum = Math.ceil(Math.random() * 6);
      return rollNum === num;
    });

    if (allCondFulfilled) {
      count++;
    }

    round--;
  }

  return count;
}

describe('roll dice', () => {
  it('test 1', () => {
    const round = 10000000;
    const count1 = rollDice(round, [4, 6, 1, 2, 3, 5]);
    const count2 = rollDice(round, [5, 5, 5, 5, 5, 5]);
    expect(count1).to.equal(count2);
  });
});