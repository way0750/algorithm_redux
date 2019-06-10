/**
 * Time Planner
  Implement a function meetingPlanner that given the availability, slotsA and slotsB, of two people and a meeting duration dur, returns the earliest time slot that works for both of them and is of duration dur. If there is no common time slot that satisfies the duration requirement, return an empty array.

  Time is given in a Unix format called Epoch, which is a nonnegative integer holding the number of seconds that have elapsed since 00:00:00 UTC, Thursday, 1 January 1970.

  Each person’s availability is represented by an array of pairs. Each pair is an epoch array of size two. The first epoch in a pair represents the start time of a slot. The second epoch is the end time of that slot. The input variable dur is a positive integer that represents the duration of a meeting in seconds. The output is also a pair represented by an epoch array of size two.

  In your implementation assume that the time slots in a person’s availability are disjointed, i.e, time slots in a person’s availability don’t overlap. Further assume that the slots are sorted by slots’ start time.

  Implement an efficient solution and analyze its time and space complexities.

  Examples:

  input:  slotsA = [[10, 50], [60, 120], [140, 210]]
          slotsB = [[0, 15], [60, 70]]
          dur = 8
  output: [60, 68]

  input:  slotsA = [[10, 50], [60, 120], [140, 210]]
          slotsB = [[0, 15], [60, 70]]
          dur = 12
  output: [] # since there is no common slot whose duration is 12
  Constraints:

  [time limit] 5000ms

  [input] array.array.integer slotsA

  1 ≤ slotsA.length ≤ 100
  slotsA[i].length = 2
  [input] array.array.integer slotsB

  1 ≤ slotsB.length ≤ 100
  slotsB[i].length = 2
  [input] integer

  [output] array.integer


  solution 1:
  get the first range from A and B, compare see if they even overlap
  if yes get new range and see if it is large enough for the dur
    if yes return newStart, newStart + dur
  if they don't overlap, then check A and B and see who has the earliest
    ending time
    if A, then get the next time range from A
      if B, then do from B
  
  default return []

  time and space:
  time: n + m
  space: constant
 */

export function eventPlanner(slotsA, slotsB, dur) {
  let slotsAIndex = 0;
  let slotsBIndex = 0;
  while(slotsAIndex < slotsA.length && slotsBIndex < slotsB.length) {
    // check if there is overlapping range:
    const rangeA = slotsA[slotsAIndex];
    const rangeB = slotsB[slotsBIndex];
    if (rangeA[0] < rangeB[1] || rangeA[1] > rangeB[0]) {
      const newStart = Math.max(rangeA[0], rangeB[0]);
      const newEnd = Math.min(rangeA[1], rangeB[1]);
      if ((newEnd - newStart) >= dur) {
        return [newStart, newStart+dur];
      }
    }

    // if we ever get here, that means we need a new range for A/B
    // check and see whose ending time is earlier
    if (rangeA[1] < rangeB[1]) {
      slotsAIndex++;
    } else {
      slotsBIndex++
    }
  }

  return [];
}