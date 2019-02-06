/**
  Given a binary tree, find a minimum path sum from root to a leaf.

  For example, the minimum path in this tree is [10, 5, 1, -1], which has sum 15.

    10
  /  \
  5    5
  \     \
    2    1
        /
      -1

  this is essentially a binary tree depth search challenge, except you need to
  find a cumulative sub tree sum and return the smallest of them all.

  so we can use recursion for this

  base case:
    if the input node is null, then return 0;
  what data type to ALWAYS return 
    always return a number, and it means the min path sum
  what to do with the return
    since we will recursively calling with each of the 2 children nodes
    we will have two returns from sub trees,
    we will take the smallest and sum it with the current node's value
  how to make problem smaller
    recursively call left and right
 */