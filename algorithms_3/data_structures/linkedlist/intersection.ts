/**
 * Intersection: Given two (singly) linked lists, determine if the two lists intersect.
 * Return the inter- secting node. Note that the intersection is defined based on reference,
 * not value. That is, if the kth node of the first linked list is the exact same node (by reference)
 * as the jth node of the second linked list, then they are intersecting.
 * mark all nodes of one of the list, then run the 2nd and see if any nodes have been marked
 * return the first one that's marked, else null;
 * time: O(l1 + l2), space: O(1);
 */

export function getIntersectionFirstTry(list1, list2) {
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
        curNode = curNode.next;
    }
    return intersectedNode;
}

function getLength (list) {
    let length = 0;
    let curNode = list;
    while(curNode) {
        length++;
        curNode = curNode.next;
    }
    return length;
}

export function getIntersection(list1, list2) {
    const list1Length = getLength(list1);
    const list2Length = getLength(list2);
    let [longList, shortList] = list1Length > list2Length ? [list1, list2] : [list2, list1];
    let advanceCount = Math.abs(list1Length - list2Length);
    while (longList && shortList) {
        if (advanceCount) {
            longList = longList.next;
            advanceCount--;
        } else {
            if (longList === shortList) {
                return longList;
            }
            longList = longList.next;
            shortList = shortList.next;
        }
    }

    return null;
}

describe('find intersecton', () => {
    it('should get intersection', () => {
        const n1 = { value: 1, next: null };
        const n2 = { value: 1, next: null };
        const n3 = { value: 1, next: null };
        const n4 = { value: 1, next: null };
        const n5 = { value: 1, next: null };
        const n6 = { value: 1, next: null };
        n1.next = n2;
        n2.next = n3;
        n3.next = n4;
        n4.next = n5;
        n5.next = n6;

        const n7 = { value: 1, next: null };
        const n8 = { value: 1, next: null };
        const n9 = { value: 1, next: null };
        n7.next = n8;
        n8.next = n9;
        n9.next = n5;
        expect(getIntersection(n1, n2).value).to.equal(n5.value);
    });
});
