/**
 * give an array of positive integers, each interger means how many steps you can hope forward at max
 * find out if you can hop all the way from index 0 to last index.
 * ex: [2,0,1,0], return true
 * at index 0, there is 2, that means you can hop forward 0/1/2 steps
 * if you hop 2 steps forward, you will land on index 2 with a integer of 1 which if you take number and hop
 * forward you will end up on index 3 which is the last index. return true for this config
 */