export function treeToLinkedlist (tree, rightSideReturn = null) {
    if (!tree) return rightSideReturn;
    const rightReturnVal = treeToLinkedlist(tree.right, rightSideReturn);
    const leftReturnVal = treeToLinkedlist(tree.left, rightReturnVal);
    tree.right = null;
    tree.left = leftReturnVal;
    return tree;
}

xdescribe('', () => {
    it('', () => {
        const node1 = { val: 1, left: null, right: null };
        const node2 = { val: 2, left: null, right: null };
        const node3 = { val: 3, left: null, right: null };
        const node4 = { val: 4, left: null, right: null };
        const node5 = { val: 5, left: null, right: null };
        const node6 = { val: 6, left: null, right: null };
        node1.left = node2;
        node1.right = node5;
        node2.left = node3;
        node2.right = node4;
        node5.right = node6;
        const val = treeToLinkedlist(node1);
        expect(val).to.equal(null);
    })
})

function getRepeatedNum(nums) {
    const expectedProd = (nums.length * (nums.length - 1)) / 2;
    const sum = nums.reduce((n1, n2) => n1 + n2);
    return sum - expectedProd;
}

xdescribe('', () => {
    it('', () => {
        const nums = [1,2,2,3,4];
        expect(getRepeatedNum(nums)).to.equal(2);
    })
});

function getIslands(matrix) {
    const map = matrix.map((row) => row.map((cell) => cell));
    let islandCount = 0;
    map.forEach((row, rowIndex) => {
        row.forEach((cellVal, colIndex) => {
            if (cellVal === '1') {
                islandCount++;
                map[rowIndex][colIndex] = '2';
                let curRing = [[rowIndex, colIndex]];
                while (curRing.length) {
                    const newRing = [];
                    for (let i = 0; i < curRing.length; i++) {
                        const [x, y] = curRing[i];
                        let newPos = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]];
                        newPos.forEach(([x, y]) => {
                            const isXValid = x >= 0 && x < map.length;
                            const isYValid = y >= 0 && y < row.length;
                            if (isXValid && isYValid && map[x][y] === '1') {
                                map[x][y] = '2';
                                newRing.push([x, y]);
                            }
                        });
                    }
                    curRing = newRing;
                }
            }
        });
    });
    return islandCount;
}

describe('', () => {
    it('island count', () => {
        const grid = [
            ["1","1","0","0","0"],
            ["1","1","0","0","0"],
            ["0","0","1","0","0"],
            ["0","0","0","1","1"]
        ];
        expect(getIslands(grid)).to.equal(3);
    });
});

function isPali (s) {
    let leftI = 0;
    let rightI = s.length - 1;
    while (leftI <= rightI) {
        const leftChar = s[leftI].toLowerCase();
        const rightChar = s[rightI].toLowerCase();
        if (!/\w/.test(leftChar)) {
            leftI++;
        } else if (!/\w/.test(rightChar)) {
            rightI--;
        } else if (leftChar !== rightChar) {
            return false;
        } else {
            leftI++;
            rightI--;
        }
    }

    return true;
}

describe('', () => {
    it('', () => {
        const str = "race a car";
        expect(isPali(str)).to.equal(false);
    })
})