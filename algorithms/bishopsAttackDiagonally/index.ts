// On our special chessboard, two bishops attack each other if they share the same diagonal. This includes bishops that have another bishop located between them, i.e. bishops can attack through pieces.

// You are given N bishops, represented as (row, column) tuples on a M by M chessboard. Write a function to count the number of pairs of bishops that attack each other. The ordering of the pair doesn't matter: (1, 2) is considered the same as (2, 1).
// For example, given M = 5 and the list of bishops:

// (0, 0)
// (1, 2)
// (2, 2)
// (4, 0)
// The board would look like this:

// [b 0 0 0 0]
// [0 0 b 0 0]
// [0 0 b 0 0]
// [0 0 0 0 0]
// [b 0 0 0 0]

// You should return 2, since bishops 1 and 3 attack each other, as well as bishops 3 and 4.

function getDiagonalGroupCount(points: Array<Array<number>>, upward: boolean = true) {
  const diagonalGroupCounts = points.reduce((diagonalGroup, points) => {
    const [y, x] = points;
    const diagonalX = upward ? x + y : x - y;
    const diagonalPoint = `${upward ? 'upward' : 'downward'}_X: ${diagonalX}`;

    diagonalGroup[diagonalPoint] = diagonalGroup[diagonalPoint] || 0;
    diagonalGroup[diagonalPoint]++;

    return diagonalGroup;
  }, {});

  return diagonalGroupCounts;
}

export function attackDiagonally(points: Array<Array<number>>): number {
  const upwardDiagonalGroupCounts = getDiagonalGroupCount(points);
  const downwardDiagonalGroupCounts = getDiagonalGroupCount(points, false)

  const allGroups = {
    ...upwardDiagonalGroupCounts,
    ...downwardDiagonalGroupCounts
  };

  const pairCount = Object.keys(allGroups).reduce((count, groupId) => {
    const groupCount = allGroups[groupId];
    if (groupCount > 1) {
      count += (groupCount * (groupCount - 1)) / 2;
    }
    return count;
  }, 0);

  return pairCount;
}

describe('Attack diagonally', () => {
  it('should work for the example above:', () => {
    const points = [
      [0, 0],
      [1, 2],
      [2, 2],
      [4, 0]
    ];
    expect(attackDiagonally(points)).to.equal(2);
  });

  it('should work for 1 diagonal line', () => {
    const points = [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ];

    expect(attackDiagonally(points)).to.equal(10);
  });

  it('should work for 2 diagonal line', () => {
    const points = [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
      [4, 0],
      [3, 1],
      [1, 3],
      [0, 4],
    ];

    expect(attackDiagonally(points)).to.equal(20);
  });
});