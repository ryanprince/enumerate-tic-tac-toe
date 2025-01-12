# Enumerate Tic-Tac-Toe

To run the program, ensure you have npm and Node.js installed. From the root project directory, use the `start` script from the `package.json` file by entering `npm start` or `npm run start` in the terminal.

Running the program generates an output text file located at `./output/output.txt`.

The output starts with the count of valid Tic-Tac-Toe board states, which is 5478. This count includes the initial blank board state, all terminal board states (where X, O, or a draw has occurred), and all intermediate board states that can occur during valid gameplay, excluding duplicates. The text file also lists every board state included in the count.