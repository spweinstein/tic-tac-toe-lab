//1) Define the required variables used to track the state of the game.
// board, turn, winner, tie

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let turn = "X"; // Restrict to "X" or "O"
let winner = false; // Restrict to true or false
let tie = false; // Restrict to true or false; true value means no empty strings in board
const board = ["", "", "", "", "", "", "", "", ""];
const state = { board, turn, winner, tie };

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll("div.sqr");
const messageEl = document.querySelector("#message");
const resetBtnEl = document.querySelector("#reset");

/*-------------------------------- Functions --------------------------------*/
const render = () => {
  updateBoard();
  updateMessage();
};

const init = () => {
  board.fill("", 0, 9);
  squareEls.forEach((squareEl) => {
    squareEl.classList.remove("X", "O");
  });
  turn = "X";
  winner = false;
  tie = false;
  console.log(state);
  render();
};

const updateBoard = () => {
  board.forEach((square, index) => {
    const squareEl = squareEls[index];
    squareEl.textContent = square;
  });
};

const updateMessage = () => {
  if (!winner && !tie) {
    messageEl.textContent = `It is ${turn}'s turn`;
  } else if (!winner && tie) {
    messageEl.textContent = "Tie game! Press reset to try again";
  } else {
    messageEl.textContent = `Congratulations, player ${turn}! Hit reset to play again.`;
  }
};

const placePiece = (index) => {
  board[index] = turn;
  squareEls[index].classList.add(turn);
};

const checkForWinner = () => {
  for (let i = 0; i < winningCombos.length; i++) {
    const combo = winningCombos[i];
    const [square1Index, square2Index, square3Index] = winningCombos[i];
    const [square1Val, square2Val, square3Val] = [
      board[square1Index],
      board[square2Index],
      board[square3Index],
    ];

    if (square1Val && square1Val === square2Val && square1Val === square3Val) {
      winner = true;
      break;
    }
  }
};

const checkForTie = () => {
  if (winner) return;
  if (!board.includes("")) {
    tie = true;
  }
};

const switchPlayerTurn = () => {
  if (winner) return;
  turn = turn === "X" ? "O" : "X";
};

const handleClick = (event) => {
  const squareIndex = event.target.id;
  const squareValue = board[squareIndex];
  if (squareValue || winner) {
    return;
  }
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((squareEl) => {
  squareEl.addEventListener("click", handleClick);
});

resetBtnEl.addEventListener("click", init);

/*----------------------------- Initialization ------------------------------*/
init();
