export function makeTime(str) {
    const hour = str.slice(0, 2);
    const minutes = str.slice(3);
    let newHour;
    if (hour === '??') {
        newHour = '23';
    } else if (hour[0] === '?') {
        newHour = (hour[1] > 3 ? '1' : '2') + hour[1];
    } else {
        newHour = hour[0] + (hour[0] === 2 ? '3' : '9');
    }
    let newMin;
    if (minutes === '??') {
        newMin = '59';
    } else if (minutes[0] === '?') {
        newMin = '5' + minutes[1];
    } else {
        newMin = minutes[0] + '9';
    }
    return `${newHour}:${newMin}`;
}