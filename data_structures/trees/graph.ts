/**
 * Graph
 * Just a tree that has cycle...
 * But what if in a graph there are multiple disconnected graphs?
 * well create a containing class for those disconnected graphs
 * just so you can maintain the idea that a graph has all the nodes connected
 * and if any nodes are not connected, then they should be in different graph
 * 
 * Attr:
 * for each node object
 * nodeId: just in case you can't just use value as id, or values are repeated
 * value: the actual value
 * hasBeenVisited: good for looping
 * 
 * the class itself should have a storage of all the nodes, and list of edges
 * methods:
 * forEach: to loop through each node
 *
 */