/**
 * Route Between Nodes: Given a directed graph, design an algorithm to find out whether
 * there is a route between two nodes.
 * since it's directed, it's not possible to do bi-directional search from the nodes
 * unless it's perfectly like this: a -> b -> c <- d <- e
 * then you can start searching from both a and e
 * but you can still use breadth first search
 * 
 * so breadth first search from node1 and see if you can run into node2
 * use a queue to push all adjacent vertices from the same level in the queue
 * in case there is a cycle, make sure to make each node as visited
 */

export function findPath (node1, node2) {
    const queue = [node1];
    while(queue.length) {
        const curNode = queue.shift();
        if (curNode === node2) {
            return true;
        }
        curNode.visited = true;
        const children = curNode.children.filter((node) => !node.visited);
        queue.push(...children);
    }
    return false;
}

describe('find path between two nodes', () => {
    it('should not find path', () => {
        const node1 = { value: 1, children: [] };
        const node2 = { value: 2, children: [] };
        const node3 = { value: 3, children: [] };
        const node4 = { value: 4, children: [] };
        const node5 = { value: 5, children: [] };

        const node6 = { value: 6, children: [] };

        node1.children.push(node2, node3);
        node2.children.push(node4);
        node3.children.push(node5);
        node5.children.push(node1);

        expect(findPath(node1, node6)).to.equal(false);
    });
    it('should find path', () => {
        const node1 = { value: 1, children: [] };
        const node2 = { value: 2, children: [] };
        const node3 = { value: 3, children: [] };
        const node4 = { value: 4, children: [] };
        const node5 = { value: 5, children: [] };

        const node6 = { value: 6, children: [] };

        node1.children.push(node2, node3);
        node2.children.push(node4);
        node3.children.push(node5);
        node5.children.push(node1, node6);

        expect(findPath(node1, node6)).to.equal(true);
    });
});