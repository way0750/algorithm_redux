export function eventualSafeNodes(graph) {
    const goodNodes = {};
    const badNodes = {};
    function search(nodeId) {
        if (!graph[nodeId].length || goodNodes[nodeId]) {
            goodNodes[nodeId] = true;
            return true;
        } else if (badNodes[nodeId]) {
            return false;
        }

        badNodes[nodeId] = true;

        const allPathValid = graph[nodeId].every((edgeNodeId) => {
            return search(edgeNodeId);
        });
        if (allPathValid) {
            delete badNodes[nodeId];
            goodNodes[nodeId] = true;
            return true;
        } else {
            return false;
        }
    }
    const validNodes = [];
    graph.forEach((_, nodeId) => {
        search(nodeId);
        if (goodNodes[nodeId]) validNodes.push(nodeId);
    });

    return validNodes;
}

describe('test', () => {
    it('should work', () => {
        const graph = [[4,9],[3,5,7],[0,3,4,5,6,8],[7,8,9],[5,6,7,8],[6,7,8,9],[7,9],[8,9],[9],[]]
        expect(eventualSafeNodes(graph)).to.equal([]);
    })
})