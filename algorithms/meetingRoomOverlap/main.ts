/**
 * give a list of meeting time, and see if it is possible to atten all of them
 * ex: [
 *   { start: 0, end: 12 },
 *   { start: 13, end: 14 },
 *   { start: 16, end: 19 },
 *   { start: 17, end: 20 }
 * ]
 * 
 * return false because 
 *   { start: 17, end: 20 } intersects with 
 *   { start: 16, end: 19 },
 * 
 * solution 1:
 * just sort the meetings by beginning time then check each meeting's beginning time with the ending time
 * from previous meeting ending time
 * if it is earlier than previous meeting ending time. then nope
 */