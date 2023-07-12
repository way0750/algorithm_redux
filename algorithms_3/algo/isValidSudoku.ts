export function isValidSudoku(matrix) {
    const records = new Map();
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            const cellVal = matrix[x][y];
            if (cellVal !== '.') {
                const n = +cellVal;
                const bigSqrtKey = `${Math.floor(x/3)}:${Math.floor(y/3)}`;
                if (records.has(`${n}@${x}`) || records.has(`${n}@${y}`) || records.has(`${n}@${bigSqrtKey}`)) {
                    return false;
                }
                records.set(`${n}@${x}`, true);
                records.set(`${n}@${y}`, true);
                records.set(`${n}@${bigSqrtKey}`, true);
            }
        }
    }

    return true;
}