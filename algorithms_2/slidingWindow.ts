const slidingWindow = (s) => {
  let freqCache = {};
  let curMaxLength = 0;
  let backIndex = 0;
  for (let frontIndex = 0; frontIndex < s.length; frontIndex++) {
      let curFrontChar = s[frontIndex];
      freqCache[curFrontChar] = freqCache[curFrontChar] || 0;
      freqCache[curFrontChar]++;
      // as soon as we have one char that has more than 1 frequency
      // start moving the back index forward;
      while(freqCache[curFrontChar] > 1) {
          let backChar = s[backIndex];
          // reduce the count of backChar
          freqCache[backChar]--;
          backIndex++;
      }
      curMaxLength = Math.max(frontIndex - backIndex + 1, curMaxLength);
  }
  return curMaxLength;
};

describe('sliding windows', () => {
  it('should return 3 for abd', () => {
    let s = 'abd';
    expect(slidingWindow(s)).to.eql(3);
  });
  it('should return 3 for abd', () => {
    let s = 'abd';
    expect(slidingWindow(s)).to.eql(3);
  });
  it('should return 3 for nndfddf', () => {
    let s = 'nndfddf';
    expect(slidingWindow(s)).to.eql(3);
  });
});