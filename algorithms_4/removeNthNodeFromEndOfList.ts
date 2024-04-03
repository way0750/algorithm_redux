const removeNthFromEnd001 = (head, n, curRank = 0, record = { length: 0 }) => {
    if (!head) return null;
    curRank++;
    record.length++;
    const newNext = removeNthFromEnd(head.next, n, curRank, record);
    if ((record.length - curRank + 1) === n) {
        head.next = null;
        return newNext;
    } else {
        head.next = newNext;
        return head;
    }
}

const removeNthFromEnd = (head, n) => {
    if (!n || !head) return head;
    let preNode = null;
    let nNode = null;
    let length = 0;
    let frontNode = head;
    while(frontNode) {
        length++;
        if (length === n) {
            nNode = head;
        } else if (length > n) {
            preNode = nNode;
            nNode = nNode.next;
        }
        frontNode = frontNode.next;
    }

    if (nNode === head) {
        return head.next;
    } else if (nNode) {
        preNode.next = nNode.next;
        nNode.next = null;
        return head;
    }
};

var deleteDuplicates = function(head) {
    const dupRec = {};
    let curNode = head;
    while(curNode) {
        const val = curNode.val;
        dupRec[val] = dupRec[val] || 0;
        dupRec[val]++;
        curNode = curNode.next;
    }
    let uniqHead = null;
    let uniqEnd = null;
    curNode = head;
    while(curNode) {
        const val = curNode.val;
        const nextNode = curNode.next;
        curNode.next = null;
        if (dupRec[val] === 1) {
            if (!uniqHead) {
                uniqHead = curNode;
                uniqEnd = curNode;
            } else {
                uniqEnd.next = curNode;
                uniqEnd = curNode;
            }

        }
        curNode = nextNode;
    }
    return uniqHead;
};

const rotateRight = (head, k) => {
    let curNode = head;
    let oldEndNode = head;
    let length = 0;
    while(curNode) {
        length++;
        oldEndNode = curNode;
        curNode = curNode.next;
    }
    const realK = k % length;
    if (realK === 0) return head;
    curNode = head;
    let newEnd = null;
    let newHead = null;
    let curRank = 1;
    while(curNode && curRank <= (length-realK)) {
        if (curRank === (length-realK)) {
            newEnd = curNode;
            newHead = curNode.next;
        }
        curRank++
        curNode = curNode.next
    }
    newEnd.next = null;
    oldEndNode.next = head;
    return newHead;
}

/**
 * preNode -> swappableNode -> ??
 * preCurNode -> curNode
 */

const partition002 = (head, x) => {
    const leftList = [];
    const rightList = [];
    let curNode = head;
    while(curNode) {
        if (curNode.val < x) {
            leftList.push(curNode);
        } else {
            rightList.push(curNode);
        }
        curNode = curNode.next;
    }

    leftList.forEach((n, index) => {
        n.next = leftList[index+1] || null;
    });
    rightList.forEach((n, index) => {
        n.next = rightList[index+1] || null;
    });
    if (leftList.length && rightList.length) {
        leftList[leftList.length-1].next = rightList[0];
    } else {
        return leftList[0] || rightList[0];
    }
}

const partition = (head, x) => {
    let leftHead = null;
    let leftEnd = null;
    let rightHead = null;
    let rightEnd = null;
    let curNode = head;
    while(curNode) {
        if (curNode.val < x) {
            if (!leftHead) {
                leftHead = curNode;
                leftEnd = curNode;
            } else {
                leftEnd.next = curNode;
                leftEnd = curNode;
            }
        } else {
            if (!rightHead) {
                rightHead = curNode;
                rightEnd = curNode;
            } else {
                rightEnd.next = curNode;
                rightEnd = curNode;
            }
        }

        curNode = curNode.next;
    }

    if (leftEnd) leftEnd.next = null;
    if (rightEnd) rightEnd.next = null;

    if (leftHead && rightHead) {
        leftEnd.next = rightHead;
    }

    return leftHead || rightHead;
}



/**
 * all the left side returns will be the new right node
 * always go down the right side first to flatten it
 *   then pass the right side return to the left side
 *    this way you will have the left end node and right side head node
 * 
 * base case:
 *   !node, return null;
 * what to always return:
 *  always return the head node of a flatten sub tree
 * what to do with returns:
 *  for right side return:
 *   pass it to the left side recursive call
 *  for the left side return:
 *   set it to be the new right child
 * 
 */

const flatten = (tree, rightLink = null) => {
    if (!tree) return rightLink;
    tree.right = flatten(tree.left, flatten(tree.right, rightLink));
    tree.left = null;
    return tree;
}

const sumNumbers = (root, preNum = 0) => {
    let curNum = preNum * 10 + root.val;
    if (!root.left && !root.right) {
        return curNum;
    } else {
        const leftSum = root.left === null ? 0 : sumNumbers(root.left, curNum);
        const rightSum = root.right === null ? 0 : sumNumbers(root.right, curNum);
        return leftSum + rightSum;
    }
}

const flattenTree = (root, arr = []) => {
    if (!root) return arr;
    flattenTree(root.left);
    arr.push(root.val);
    flattenTree(root.right);
    return arr;
}

const kthSmallest = (root, k) => {
    let found = null;

    const search = (root, index = 0) => {
        if (!root) return index;
        let newIndex;
        if (found !== null) {
            newIndex = search(root.left, index);
        }
        newIndex++;
        if (newIndex === k) {
            found = root.val;
        }
        if (found !== null) {
            newIndex = search(root.right, newIndex);
        }

        return newIndex;
    }

    search(root, 0);
    return found;
}

const isValidBST = (root) => {
    let isValid = true;
    const search = (root) => {
        const leftMinMax = root.left ? search(root.left) : [root.val, root.val - 1];
        if (leftMinMax[1] >= root.val) {
            isValid = false;
        }
        const rightMinMax = isValid && root.right ? search(root.right) : [root.val + 1, root.val];
        if (rightMinMax[0] <= root.val) {
            isValid = false;
        }        
        return [
            Math.min(leftMinMax[0], root.val),
            Math.max(root.val, rightMinMax[1]),
        ];
    }
    search(root);
    return isValid;
}

const numIslands = (grid) => {
    const cache = {};
    const maxRow = grid.length;
    const maxCol = grid[0].length;
    const search = (rowIndex, colIndex) => {
        const poses = [
            [rowIndex+1, colIndex],
            [rowIndex-1, colIndex],
            [rowIndex, colIndex+1],
            [rowIndex, colIndex-1],
        ].filter(([rowIndex, colIndex]) => {
            const isInbound = rowIndex > -1 && rowIndex < maxRow && colIndex > -1 && colIndex < maxCol;
            return isInbound && !cache[`${rowIndex}_${colIndex}`] && grid[rowIndex][colIndex] === '1';
        });
        poses.forEach(([rowIndex, colIndex]) => {
            const cellKey = `${rowIndex}_${colIndex}`;
            cache[cellKey] = true;
        });
        poses.forEach(([rowIndex, colIndex]) => {
            search(rowIndex, colIndex);
        });
    };

    let islandCount = 0;
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellKey = `${rowIndex}_${colIndex}`;
            if (!cache[cellKey] && grid[rowIndex][colIndex] === '1') {
                islandCount++;
                cache[cellKey] = true;
                search(rowIndex, colIndex);
            }
        })
    });
    return islandCount;
}