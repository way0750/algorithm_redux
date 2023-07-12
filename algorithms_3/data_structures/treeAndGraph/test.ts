const numToHex = {
    0: '0',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: "A",
    11: "B",
    12: "C",
    13: "D",
    14: "E",
    15: "F"
};

export function RGBToHEX (r, g, b) {
    const firstRHex = Math.floor(r / 16);
    const secondRHex = (r % 16);
    const RHex = numToHex[firstRHex] + numToHex[secondRHex];

    const firstGHex = Math.floor(g / 16);
    const secondGHex = (g % 16);
    const GHex = numToHex[firstGHex] + numToHex[secondGHex];

    const firstBHex = Math.floor(b / 16);
    const secondBHex = (b % 16);
    const BHex = numToHex[firstBHex] + numToHex[secondBHex];

    return `#${RHex}${GHex}${BHex}`;
}

describe('RGB to HEX', () => {
    it('should convert 255, 0, 0 to  #FF0000', () => {
        expect(RGBToHEX(255, 0, 0)).to.equal('#FF0000');
    });

    it('should convert 255, 0, 255 to  #FF00FF', () => {
        expect(RGBToHEX(255, 0, 255)).to.equal('#FF00FF');
    });
});