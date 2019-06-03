/**
 * tic tac toe
 */

export class TicTacToe {
  private gameOver = false;
  private board = [
    ['_','_','_'],
    ['_','_','_'],
    ['_','_','_']
  ];

  public printBoard() {
    const matrixStr = this.board.map((row) => `${row.join('')}`).join('\n');
    console.log(matrixStr, '\n============\n');
  }

  // if game is not over
  // if it is the correct player's turn
  // if valid move: within matrix, on an empty spot
  public makeAMove(player, rowIndex = 0, colIndex = 0) {
    const rowOutOfBound = rowIndex < 0 || rowIndex > 2;
    const colOutOfBound = colIndex < 0 || colIndex > 2;
    if (this.gameOver || rowOutOfBound || colOutOfBound) {
      return;
    } else if (this.board[rowIndex][colIndex] === '_') {
      this.board[rowIndex][colIndex] = player;
      this.checkWinning();
    }
  }

  // return all lines
  public allLines() {
    const allPossibleLines = this.board.slice();

    for (let c = 0; c < 3; c++) {
      const verticalLine = [this.board[0][c], this.board[1][c], this.board[2][c]];
      allPossibleLines.push(verticalLine);
    }

    const downwardLine = [this.board[0][0], this.board[1][1], this.board[2][2]];
    const upwardLine = [this.board[2][0], this.board[1][1], this.board[0][2]];

    allPossibleLines.push(downwardLine, upwardLine);

    return allPossibleLines;
  }

  public isFull() {
    const lines = this.allLines();
    const isFull = lines.every((line) => line.every((cell) => cell !== '_'));
    if (isFull) {
      this.gameOver = true;
    }
    return isFull;
  }
  
  public checkWinning() {
    const lines = this.allLines();
    const lineIndex = lines.findIndex((line) => line.every((cell) => cell !== '_'));
    if (lineIndex > -1) {
      this.gameOver = true;
      return lines[lineIndex][0];
    } else {
      return null;
    }
  }
}

describe('tic', () => {
  it('should work 1', () => {
    const tic = new TicTacToe();
    expect(tic.isFull()).to.eql(false);
  });
  it('should work 1', () => {
    const tic = new TicTacToe();
    tic.makeAMove('X');
    tic.printBoard();
    tic.makeAMove('X', 0, 1);
    tic.makeAMove('X', 0, 2);
    tic.printBoard();
    expect(tic.isFull()).to.eql(false);
    expect((tic as any).gameOver).to.eql(true);

    tic.makeAMove('O', 0, 0);
    tic.makeAMove('O', 0, 1);
    tic.makeAMove('O', 0, 2);
    tic.printBoard();
    expect((tic as any).gameOver).to.eql(true);
  });
});