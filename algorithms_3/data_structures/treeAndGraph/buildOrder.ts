/**
 * Build Order: You are given a list of projects and a list of dependencies
 * (which is a list of pairs of projects, where the second project is dependent on the
 * first project). All of a project'sdependencies must be built before the project is.
 * Find a build order that will allow the projects to be built. If there is no valid build order,
 * return an error.
 * EXAMPLE Input:
 * projects: a, b, c, d, e, f
 * dependencies: (a, d), (f, b), (b, d), (f, a), (d, c) Output: f, e, a, b, d, c
 * 
 * build a directed graph first with dependencies list [[a, b], [c, d], [a, e]]
 * build it like this:
 * {
 *   a: { path: [ // a, b, e], isCollected: false, isVisited: false, adjNodes: [b, e], path: [] },
 *   b: { path: [], isCollected: false, isVisited: false, adjNodes: [], path: [] },
 *   c: { path: [], isCollected: false, isVisited: false, adjNodes: [d], path: [] },
 *   d: { path: [], isCollected: false, isVisited: false, adjNodes: [], path: [] },
 *   e: { path: [], isCollected: false, isVisited: false, adjNodes: [], path: [] },
 * }
 * then go through each node and set it to isVisited: true to avoid future visit in the loop
 * then ex, for a, go through recursively go through each adjNodes to collect nodes
 *  and collect each node's path is it's there.
 * 
 * at the end just put all the paths together by unshifting them together
 * 
 * time: O(n) n = the amount of nodes, space: O(n) the amount of nodes
 */

function makeGraph(nodes, edges) {
    const graph = nodes.reduce((graph, node) => {
        graph[node] = {
            path: [],
            adjNodes: [],
            isCollected: false,
            isVisited: false,
        };
        return graph;
    }, {});

    edges.forEach(([from, to]) => {
        graph[from].adjNodes.push(to);
    });

    return graph;
}

function getPath (graph, node): any | number[] {
    if (graph[node].isCollected) {
        const path = graph[node].path;
        graph[node].path = [];
        return path;
    }
    if (graph[node].isVisited) {
        return null;
    }
    graph[node].isVisited = true;
    const path = [];
    let isCircular = false;
    graph[node].adjNodes.forEach((adjNode) => {
        const subPath = getPath(graph, adjNode);
        if (subPath === null) {
            isCircular = true;
        } else {
            path.push(...subPath);
        }
    });
    graph[node].isCollected = true;
    graph[node].isVisited = false;
    return isCircular ? null : [node, ...path];
}

export function getBuildOrder(nodes, dependencies) {
    const graph = makeGraph(nodes, dependencies);
    // update graph
    let isCircular = false;
    nodes.forEach((node) => {
        const path = getPath(graph, node);
        if (path === null) {
            isCircular = true;
        } else {
            graph[node].path = path;
        }
    });

    if (isCircular) {
        return null;
    }

    const grandPath = [];
    nodes.forEach((node) => {
        grandPath.unshift(...graph[node].path);
    });

    return grandPath;
}

describe('make graph', () => {
    it('should make graph', () => {
        const projects = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        const edges = [
            ['a', 'd'],
            ['f', 'b'],
            ['b', 'd'],
            ['f', 'a'],
            ['d', 'c'],
        ];
        const graph = makeGraph(projects, edges);
    });
});

describe('get order', () => {
    it('should get order', () => {
        const projects = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        const edges = [
            ['a', 'd'],
            ['f', 'b'],
            ['b', 'd'],
            ['f', 'a'],
            ['d', 'c'],
        ];
        const order = getBuildOrder(projects, edges);
        debugger;
    });
});