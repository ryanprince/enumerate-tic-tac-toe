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
    if (!this.isValidGameState()) {
      throw new Error(`Attempted to construct a game with an invalid state:\n${this}`);
    }
  }

  toString() {
    return this.board.map(row => row.join(' | ')).join('\n---------\n');
  }

  clone() {
    return new TicTacToe(this.board.map(row => [...row]));
  }

  // Returns a list [x] if x appears in a winning tripple, [y] if y does
  // or [x, y] or [y, x] if both do. The method is used both to determine
  // the winner and to check for invalid game states.
  _winners() {
    const deduplicate = (symbols) => [...new Set(symbols)];
    const isTriple = ([a, b, c]) => a !== this.BLANK && a === b && b === c;
    const symbolOfTriple = ([symbol, _]) => symbol;
    return deduplicate([
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
    ]
      .filter(isTriple)
      .map(symbolOfTriple));
  }

  getWinner() {
    const symbolsOfWinningLines = this._winners();
    const deduplicatedSymbolsOfWinningLines = [...new Set(symbolsOfWinningLines)];
    if (deduplicatedSymbolsOfWinningLines.length > 1) {
      throw new Error(`Cannot evaluate winner for invalid game state:\n${this}`);
    } else if (deduplicatedSymbolsOfWinningLines.length === 1) {
      return deduplicatedSymbolsOfWinningLines[0];
    } else {
      return null;
    }
  }

  count(symbol) {
    return this.board.flat().filter(cell => cell === symbol).length;
  }

  xCount() {
    return this.count(this.X);
  }

  oCount() {
    return this.count(this.O);
  }

  blankCount() {
    return this.count(this.BLANK);
  }

  // The symbol of the next player to move. This can produce invalid output if the game
  // state is invalid, so it should only be used in the context of a valid game state.
  nextSymbolToMove() {
    return this.xCount() > this.oCount() ? this.O : this.X;
  }

  isValidGameState() {
    const xCount = this.xCount();
    const oCount = this.oCount();
    const blankCount = this.blankCount();
    return (xCount === oCount || xCount === oCount + 1) && blankCount + xCount + oCount === 9 && this._winners().length < 2;
  }

  availableMoves() {
    return this.getWinner()
      // If there is a winner, there are no available moves.  
      ? []
      // Otherwise, generate candidate moves and filter out moves that are not valid.
      : [0, 1, 2].flatMap(row => [0, 1, 2].map(col => ({ symbol: this.nextSymbolToMove(), row, col })))
        .filter(({ row, col }) => this.board[row][col] === this.BLANK)
        .filter(({ symbol, row, col }) => {
          const nextState = this.clone();
          nextState.board[row][col] = symbol;
          return nextState.isValidGameState();
        });
  }

  isValidMove({ symbol, row, col }) {
    return this.availableMoves().some(({ symbol: s, row: r, col: c }) => symbol === s && row === r && col === c);
  }

  makeMove({ symbol, row, col }) {
    if (!this.isValidMove({ symbol, row, col })) {
      return null;
    }
    const updatedGame = this.clone();
    updatedGame.board[row][col] = symbol;
    return updatedGame;
  }
}