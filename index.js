import TicTacToe from "./TicTacToe.js";

const enumerateGameStates = (g = new TicTacToe(), validGameStateHashes = new Set()) => {
  if (!g.isValidGameState()) {
    throw new Error(`Cannot enumerate from invalid game state:\n${g}`);
  }

  validGameStateHashes.add(g.toString());

  const nextStates = g.availableMoves()
    .map(move => g.makeMove(move))
    .filter(next => !validGameStateHashes.has(next.toString()));

  return [g, ...nextStates.flatMap((state) => enumerateGameStates(state, validGameStateHashes))];
};

const validGameStates = enumerateGameStates();

console.log(validGameStates.length); // 5478
validGameStates.forEach((g, i) => {
  console.log(`Game state #${i + 1}:\n${g.toString()}`);
});