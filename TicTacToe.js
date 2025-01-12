export default class TicTacToe {
  constructor(board = null) {
    this.BLANK = ' ';
    this.X = 'X';
    this.O = 'O';
    this.board = board || [
      [this.BLANK, this.BLANK, this.BLANK],
      [this.BLANK, this.BLANK, this.BLANK],
      [this.BLANK, this.BLANK, this.BLANK]
    ];
  }

  toString() {
    return this.board.map(row => row.join(' | ')).join('\n---------\n');
  }

  clone() {
    const newBoard = this.board.map(row => [...row]);
    return new TicTacToe(newBoard);
  }

  xCount() {
    return this.board.flat().filter(cell => cell === this.X).length;
  }

  oCount() {
    return this.board.flat().filter(cell => cell === this.O).length;
  }

  blankCount() {
    return this.board.flat().filter(cell => cell === this.BLANK).length;
  }

  nextSymbolToMove() {
    const xCount = this.board.flat().filter(cell => cell === this.X).length;
    const oCount = this.board.flat().filter(cell => cell === this.O).length;
    return xCount > oCount ? this.O : this.X;
  }

  availableMoves() {
    const moves = [];
    if (this.isValidGameState() && !this.getWinner()) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.board[row][col] === this.BLANK) {
            moves.push({ symbol: this.nextSymbolToMove(), row, col });
          }
        }
      }
    }
    return moves;
  }

  getWinner() {
    const lines = [
      // Rows
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      // Columns
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      // Diagonals
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]]
    ];

    for (const line of lines) {
      if (line[0] !== this.BLANK && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }

    return null;
  }

  isValidMove({ symbol, row, col }) {
    return this.availableMoves().some(move => move.symbol === symbol && move.row === row && move.col === col);
  }

  makeMove({ symbol, row, col }) {
    if (!this.isValidMove({ symbol, row, col })) {
      return null;
    }
    const updatedGame = this.clone();
    updatedGame.board[row][col] = symbol;
    return updatedGame.isValidGameState() ? updatedGame : null;
  }

  isBoardFull() {
    return this.availableMoves().length === 0;
  }

  isValidGameState() {
    const xCount = this.xCount();
    const oCount = this.oCount();
    const blankCount = this.blankCount();

    if (xCount < oCount || xCount > oCount + 1 || blankCount + xCount + oCount !== 9) {
      return false;
    }

    return true;
  }
}