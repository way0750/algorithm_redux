/**
 * BST Sequences: A binary search tree was created by traversing through an array from
 * left to right and inserting each element. Given a binary search tree with distinct elements,
 * print all possible arrays that could have led to this tree.
 * ex:   2
 *     1   3
 * return [ [2,1,3], [2,3,1]]
 * basically finding all permutations of sub trees
 * 
 * recursive solution:
 * recursive call if left/right has child
 * what to always return: [ [], [], []]
 * what to do with returns:
 *  you will get two arrays of arrays
 *  ex: [ a, b ] [c, d]: mix them up as
 * [ 
 *  ac, ca,
 *  ad, da,
 *  bc, cb,
 *  bd, db
 * ]
 * how to break problem smaller: recursively call .left .right
 */

export function BSTSequence(node) {
    if (!node) return [];

    const leftSeqs = BSTSequence(node.left);
    const rightSeqs = BSTSequence(node.right);

    if (!leftSeqs.length && !rightSeqs.length) {
        return [ [ node.value ]];
    }

    if (!leftSeqs.length || !rightSeqs.length) {
        const onlySeq = leftSeqs || rightSeqs || [];
        return onlySeq.map((seq) => {
            return [node.value, ...seq];
        });
    }

    const newSeqs = [];
    leftSeqs.forEach((leftSeq) => {
        rightSeqs.forEach((rightSeq) => {
            newSeqs.push(
                [node.value, ...leftSeq, ...rightSeq],
                [node.value, ...rightSeq, ...leftSeq],
            )
        });
    });
    return newSeqs;
}

describe('BST Sequence', () => {
    it('should return all patterns', () => {
        const node1 = { value: 'D', left: null, right: null };
        const node2 = { value: 'B', left: null, right: null };
        const node3 = { value: 'E', left: null, right: null };
        const node4 = { value: 'A', left: null, right: null };
        const node5 = { value: 'F', left: null, right: null };
        const node6 = { value: 'C', left: null, right: null };
        const node7 = { value: 'G', left: null, right: null };

        node4.left = node2;
        node4.right = node6;

        node2.left = node1;
        node2.right = node3;

        node6.left = node5;
        node6.right = node7;

        expect(BSTSequence(node4)).to.equal([]);
    });
});