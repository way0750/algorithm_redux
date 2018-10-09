/**
 * give an array of positive integers, each interger means how many steps you can hope forward at max
 * find out if you can hop all the way from index 0 to last index.
 * ex: [2,0,1,0], return true
 * at index 0, there is 2, that means you can hop forward 0/1/2 steps
 * if you hop 2 steps forward, you will land on index 2 with a integer of 1 which if you take number and hop
 * forward you will end up on index 3 which is the last index. return true for this config
 * 
 * 
 * 
 * solution 1
 * if you have an array like this:
 * [4, 3, 0, 0, 1, 0];
 *  0, 1, 2, 3, 4, 5
 * Instead of brute force it by coming up all the possible path and see if at lease 1 of them
 * can make it to th end, if you go backward and find out if certain index can make it to the end, then you
 * when go backward all the way to the first index, you will need very little computation and see if
 * any stepping will make it to an index with known valid path
 */