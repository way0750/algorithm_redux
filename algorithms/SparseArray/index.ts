/**
 * You have a large array with most of the elements as zero.
 * 
 * Use a more space-efficient data structure, SparseArray, that implements the
 * 
 * same interface: init(arr, size): initialize with the original large array and
 * size. set(i, val): updates index at i with val. get(i): gets the value at
 * index i.
 * 
 * solution:
 * 
 * this is essentially how JavaScript implements Array:
 * using a JSON object without space actually allocated for the array
 * then when actually assigning a value to an index then in the background just
 * add a property: by using the index as the property key, then maintain a
 * length property for traversal purpose
 * and whenever accessing an index that has yet been deliberately assigned, just
 * return a default value: undefined, but in this case we can just number: 0;
 */