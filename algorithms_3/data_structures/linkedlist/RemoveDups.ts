/**
 * Remove Dups: Write code to remove duplicates from an unsorted linked list.
 * 
 * so just maintain a cache to keep track of values you have encountered
 * then remove duplicated one as you run into them
 * time: O(n), space: O(n);
 */

export function removeDup (linkedList, cache = {}) {
    if (!linkedList) {
        return linkedList;
    }
    if (cache[linkedList.value]) {
        return removeDup(linkedList.next, cache);
    } else {
        cache[linkedList.value] = true;
        linkedList.next = removeDup(linkedList.next, cache);
        return linkedList;
    }
}
