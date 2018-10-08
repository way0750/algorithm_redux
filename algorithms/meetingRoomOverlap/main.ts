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

function canAttendAllMeetings(meetings: Array<{start: number, end: number}>): boolean {
  const sortedMeetings = meetings.sort((meet1, meet2) => {
    if (meet1.start === meet2.start) {
      return 0;
    } else {
      return meet1.start > meet2.start ? 1 : -1;
    }
  });
  for (let i = 1; i < sortedMeetings.length; i++) {
    const previousMeeting = sortedMeetings[i-1];
    const curMeeting = sortedMeetings[i];
    if (curMeeting.start > previousMeeting.end) {
      return false;
    }
  }
  return true;
}