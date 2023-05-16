/**
 * Random Node: You are implementing a binary tree class from scratch which,
 * in addition to insert, find, and delete, has a method getRandomNode()
 * which returns a random node from the tree. All nodes should be equally
 * likely to be chosen. Design and implement an algorithm for getRandomNode,
 * and explain how you would implement the rest of the methods.
 * 
 * assuming you can't delete node in the middle of the tree, you can only add
 * and remove on the last level at the right most available position then use
 * an array to implement this tree class:
 * parent node to children:
 *  parent node index * 2 then +1 for left +2 for right
 * children to parent node:
 *  (children index -1)/2 then floor it
 * getRandomNode would just get a random index by math.random * length
 */

export class TreeWithRandomNode {
    private tree: number[];
    constructor() {
        this.tree = [];
    }

    insert(value) {
        this.tree.push(value);
    }

    find(value) {
        return this.tree.some((val) => val === value);
    }

    delete() {
        const lastNode = this.tree[this.tree.length+1];
        this.tree.splice(this.tree.length+1, 1);
        return lastNode;
    }
    getRandomNode() {
        const randomIndex = Math.floor(Math.random() * this.tree.length);
        return this.tree[randomIndex];
    }
}