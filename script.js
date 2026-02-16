document.title = "Tic-Tac-Toe Game";

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgCont = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;

// Enable all the boxes
const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Reset the Game , New Game
const resGame = () => {
  turn0 = true;
  enableBtn();
  msgCont.classList.add("hide");
};

// Storing Winning Patterns in 2D-Array form
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Disabling the buttons after the game end
const disBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Showing the Winner
const showWinner = (winner) => {
  msg.innerText = `Congratulation the winner is ${winner}`;
  msgCont.classList.remove("hide");
  msg.classList.remove("hide");
  disBtn();
};

// Checking who is the Winner or Draw
const checkWinner = () => {
  let winnerFound = false; // flag to check if someone has won

  for (let patterns of winPatterns) {
    let pos1Val = boxes[patterns[0]].innerText;
    let pos2Val = boxes[patterns[1]].innerText;
    let pos3Val = boxes[patterns[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner is ", pos1Val);
        showWinner(pos1Val);
        winnerFound = true;
        return; // stop checking further
      }
    }
  }

  // Check for draw: all boxes filled and no winner
  let allFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (!winnerFound && allFilled) {
    msg.innerText = "It's a Draw!";
    msgCont.classList.remove("hide");
    msg.classList.remove("hide");
    disBtn(); // disable boxes on draw
  }
};

// Box click handling
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Adding Event Listener for new Game
newGameBtn.addEventListener("click", () => {
  resGame();
});

// Adding Event Listener for Reset Game
reset.addEventListener("click", () => {
  resGame();
});
