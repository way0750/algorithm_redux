function getDiff(num1, num2) {
  let totalAbsDiff = 0;
  for (let i = 0; i < num1.length; i++) {
    const n1Str = num1[i].toString();
    const n2Str = num2[i].toString();

    for (let j = 0; j < n1Str.length; j++) {
      const n1Digit = +n1Str[j];
      const n2Digit = +n2Str[j];
      totalAbsDiff += Math.abs(n1Digit - n2Digit);
    }
  }

  return totalAbsDiff;
}

describe('getDiff', () => {
  it('test 1', () => {
    const n1 = [123, 543];
    const n2 = [321, 279];
    expect(getDiff(n1, n2)).to.eql(16);
  });
  it('test 2', () => {
    const n1 = [123, 999];
    const n2 = [321, 777];
    expect(getDiff(n1, n2)).to.eql(10);
  });
  it('test 3', () => {
    const n1 = [123, 777];
    const n2 = [321, 777];
    expect(getDiff(n1, n2)).to.eql(4);
  });
});
