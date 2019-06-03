/**
 * give a string and a pattern which include characters a-z . (any char) and * (1 or -)
 * 
 * whenever running into a *, decide what should happen if you take it or not
 * taking it
 * 
 * always check current second character
 */

export function matchPattern(s, p) {
  if (s === p) {
    return true;
  } else if (!s.length || !p.length) { 
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const pChar = p[i];
    const nextPChar = p[i+1];
    const nextSChar = s[i+1];
    if (nextPChar === '*') {
      let isMatch = false;
      if (char === pChar && char === nextSChar) {
        isMatch = matchPattern(s.slice(i+2), p.slice(i+2));
      }
      return isMatch || matchPattern(s, p.slice(i+2));
    } else if (char !== pChar && pChar !== '.') {
      return false;
    }
  }

  return true;
}

describe('basic regexp match', () => {
  it('001', () => {
    const s = '';
    const p = '';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('002', () => {
    const s = 'a';
    const p = 'a';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('003', () => {
    const s = 'a';
    const p = 'b';
    expect(matchPattern(s, p)).to.be.false;
  });
  it('003', () => {
    const s = 'a';
    const p = '.';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('004', () => {
    const s = 'ab';
    const p = 'a.';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('005', () => {
    const s = 'ab';
    const p = 'a.k*';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('006', () => {
    const s = 'abkk';
    const p = 'a.k*';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('006', () => {
    const s = 'abkk';
    const p = 'm*n*o*p*q*a.k*';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('007', () => {
    const s = 'abkk';
    const p = 'zm*n*o*p*q*a.k*';
    expect(matchPattern(s, p)).to.be.false;
  });
  it('008', () => {
    const s = 'aab';
    const p = 'c*a*b';
    expect(matchPattern(s, p)).to.be.true;
  });
  it('009', () => {
    const s = 'bbabc';
    const p = 'a*abc';
    expect(matchPattern(s, p)).to.be.false;
  });
});