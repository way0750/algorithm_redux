/**
 * given an array of integers, find the smallest index range that you have to
 * sort in order to sort the entire array
 * ex: [1 3 2 4]
 * return 1,2
 * meaning: you just need to sort the range 1..2 (inclusive) to make this array sorted
 * 
 * solution 1:
 * you can create a sorted version of the input array first 
 * then compare both version and see where the values first and last to appear.
 *   meaning comparing from front to back and back to front
 * time and space
 * time: first sorting the array could be nlogn
 * then comparing will be worst case n
 * so n + nlogn, which could be simplified to nlogn
 * space: n for the sorted version of the input array
 */

 export function smallestSortingRange(arr) {
   const sorted = arr.slice().sort((v1, v2) => v1 >= v2);
   let FI = 0;
   let BI = arr.length - 1;
   while ((arr[FI] === sorted[FI] || arr[BI] === sorted[BI]) && BI > FI) {
     if (arr[FI] === sorted[FI]) {
       FI++;
     }
     if (arr[BI] === sorted[BI]) {
       BI--
     }
   }

   return FI >= BI ? [] : [FI, BI];
 }

 describe('Sorting Range', () => {
   it('Should work with empty array', () => {
    const arr = [];
    expect(smallestSortingRange(arr)).to.eql([]);
   });
   it('Should work with array of 1 element', () => {
    const arr = [2];
    expect(smallestSortingRange(arr)).to.eql([]);
   });
   it('Should work with array of 2 element', () => {
    const arr = [2, 3];
    expect(smallestSortingRange(arr)).to.eql([]);
   });
   it('Should work with array of 2 out of ordered element', () => {
    const arr = [3, 2];
    expect(smallestSortingRange(arr)).to.eql([0,1]);
   });
   it('Should work example', () => {
    const arr = [1, 3, 2, 4];
    expect(smallestSortingRange(arr)).to.eql([1,2]);
   });
   it('Should return empty array for no range found', () => {
    const arr = [1,2,3,4,5];
    expect(smallestSortingRange(arr)).to.eql([]);
   });
 });