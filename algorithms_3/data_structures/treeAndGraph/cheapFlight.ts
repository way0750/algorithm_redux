/**
 * Problem Statement:

There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w.

Now given all the cities and flights, together with starting city src and the destination dst, your task is to find the cheapest price from src to dst with up to k stops. If there is no such route, output -1.

Constraints:

    The number of nodes n will be in range [1, 100], with nodes labeled from 0 to n - 1.
    The size of flights will be in range [0, n * (n - 1) / 2].
    The format of each flight will be (src, dst, price).
    The price of each flight will be in the range [1, 10000].
    k is in the range of [0, n - 1].
    There will not be any duplicated flights or self cycles.

Example 1:

plaintext

Input:
n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 1
Output: 200

Explanation:
The cheapest price from city 0 to city 2 with up to 1 stop costs 200, as marked red in the graph:

markdown

0 --100--> 1 --100--> 2
|                      ^
|______500_____________|

Example 2:

plaintext

Input:
n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]]
src = 0, dst = 2, k = 0
Output: 500

Explanation:
The cheapest price from city 0 to city 2 with up to 0 stop costs 500, as marked blue in the graph:

markdown

0 --100--> 1 --100--> 2
|                      ^
|______500_____________|

a graph search that aims at getting the path with the lightest weight (price) with at most k
nodes between the src node to the dest node

{
    0: { edge: [{ to: 8, price: 200 }, { to 78, price: 100 }], visited: false }
}



 */


export function getCheapestFlight(flights, src, dst, k) {
    /**
     * base case:
     *  fightCount is = flightCount - 1 > k but still not at dst
     *      return Infinity;
     *  at dst
     *      return the total price
     * what to always return
     *      always an integer which is the total price
     * what to do with return
     *      if there are multiple, return the smallest integer
     * how to break problem smaller
     *      just call all the edges
     */

    // make graph
    const graph = {};
    flights.forEach(([src, dst, price]) => {
        graph[src] = graph[src] || { visited: false, edges: [] };
        graph[dst] = graph[dst] || { visited: false, edges: [] };
        graph[src].edges.push({ dst, price });
    });

    function search (flightCount, city, curTotalPrice) {
        // end of path search
        if (city === dst) {
            return curTotalPrice;
        }

        let { edges } = graph[city];
        edges = edges.filter((edge) => !graph[edge.dst].visited);
        if (flightCount - 1 === k || !edges.length) {
            return -1;
        }

        // make sure to make visited to false before returning
        graph[city].visited = true;
        const validPaths = [];
        edges.forEach((edge) => {
            const price = search(flightCount + 1, edge.dst, curTotalPrice + edge.price);
            if (price !== -1) {
                validPaths.push(price);
            }
        });

        graph[city].visited = false;
        return validPaths.length ? Math.min(...validPaths) : -1;
    }

    const cheapestFlight = search(0, src, 0);

    return cheapestFlight;
}

describe('test', () => {
    it('should return the right price', () => {
        const flights = [[0,1,100],[1,2,100],[0,2,500]];
        const src = 0, dst = 2, k = 1;

        expect(getCheapestFlight(flights, src, dst, k)).to.equal(200);
    });
    it('should return the right price', () => {
        const flights = [[0,1,100],[1,2,100],[0,2,500]];
        const src = 0, dst = 2, k = 0;

        expect(getCheapestFlight(flights, src, dst, k)).to.equal(500);
    });
});