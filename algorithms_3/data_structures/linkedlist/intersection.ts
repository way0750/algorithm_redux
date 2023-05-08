/**
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect.
 * Return the inter- secting node. Note that the intersection is defined based on reference,
 * not value. That is, if the kth node of the first linked list is the exact same node (by reference)
 * as the jth node of the second linked list, then they are intersecting.
 * mark all nodes of one of the list, then run the 2nd and see if any nodes have been marked
 * return the first one that's marked, else null;
 * time: O(l1 + l2), space: O(1);
 */

export function getIntersection(list1, list2) {
    let curNode = list1;
    while(curNode) {
        curNode.visited = true;
        curNode = curNode.next;
    }
    let curNode2 = list2;
    let intersectedNode = null;
    while (curNode2 && !intersectedNode) {
        if (curNode2.visited) {
            intersectedNode = curNode2;
        }
    }
    curNode = list1;
    while(curNode) {
        delete curNode.visited;
    }
    return intersectedNode;
}