/**
 * Write code to partition a linked list around a value x, such that all nodes less than x come
 * before all nodes greater than or equal to x. lf x is contained within the list, the values of x
 * only need to be after the elements less than x (see below).The partition element x can appear
 * anywhere in the "right partition"; it does not need to appear between the left and right partitions.
 * 
 * maintain two pointers, swabNode and currNode
 * whenever currNode runs into a node with value smaller than x, swab with swabNode, then move swabNode
 *  further by one node
 * 
 * time: O(n), space: O(1);
 * 
 */

export function partition (list, partV) {
    let swabNode = list;
    while(swabNode.value < partV) {
        swabNode = swabNode.next;
    }
    let curNode = swabNode;
    while (curNode) {
        if (curNode.value < partV) {
            const tempSwabVal = swabNode.value;
            swabNode.value = curNode.value;
            curNode.value = tempSwabVal;
            swabNode = swabNode.next;
        }
        curNode = curNode.next;
    }

    return list;
}