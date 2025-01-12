import TicTacToe from "./TicTacToe.js";

const enumerateGameStates = (g = new TicTacToe(), seenGameStatesHashes = new Set()) => {
  if (!g.isValidGameState()) {
    throw new Error(`Cannot enumerate from invalid game state:\n${g}`);
  }

  seenGameStatesHashes.add(g.toString());

  const nextStates = g.availableMoves()
    .map(move => g.makeMove(move))
    .filter(next => !seenGameStatesHashes.has(next.toString()));

  return [g, ...nextStates.flatMap((state) => enumerateGameStates(state, seenGameStatesHashes))];
};

const validGameStates = enumerateGameStates();

// Print the numer of valid game states, which should be 5478.
console.log(validGameStates.length);

// Print the valid game states that were counted.
validGameStates.forEach((g, i) => {
  console.log(`Game state #${i + 1}:\n${g.toString()}`);
});