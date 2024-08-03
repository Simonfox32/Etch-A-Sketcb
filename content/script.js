const board = document.querySelector(".board");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const colorPicker = document.querySelector(".color-picker")
const gridRange = document.querySelector(".size")
const clear = document.querySelector(".clear")
const sizeNotification = document.querySelector(".size-notification")

let boardSize = 16;
let reappear = true;
let opacity = 1;
let currentMode = "black"




console.log(boardSize); 
generateGrid()


function generateGrid() {
  board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

  const currentSquares = board.querySelectorAll(".squares");
  const totalSquares = boardSize * boardSize;

  if (currentSquares.length > totalSquares) {
    for (let i = currentSquares.length - 1; i >= totalSquares; i--) {
      currentSquares[i].remove();
    }
  } else {
    for (let i = currentSquares.length; i < totalSquares; i++) {
      const squares = document.createElement("div");
      squares.classList.add("squares");
      board.appendChild(squares);

      squares.addEventListener("mouseover", function () {
        if (currentMode === "black") {
          squares.style.backgroundColor = "#000000";
        } else if (currentMode === "color") {
          squares.style.backgroundColor = colorPicker.value;
        } else if (currentMode === "rainbow") {
          squares.style.backgroundColor = getRandomColor();
        } else if (currentMode === "eraser") {
          squares.style.backgroundColor = "#FFFFFF";
        } else if (currentMode === "darken") {
          let currentOpacity = parseFloat(squares.style.opacity) || 1;
          squares.style.opacity = Math.max(0, currentOpacity - 0.1);
        }
      });
    }
  }
}



clear.addEventListener("click", () => {
  resetGrid()
  generateGrid()
})

rainbow.addEventListener("click", () => {
  currentMode = "rainbow"
})

colorPicker.addEventListener("input", () => {
  currentMode = "color"
})

eraser.addEventListener("click", () => {
  currentMode = "eraser"
})


function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



gridRange.addEventListener("input", (e) => {
  boardSize = e.target.value
  resetGrid()
  generateGrid()
  sizeNotification.innerHTML = `${boardSize} x ${boardSize}`
})

function resetGrid () {
  board.innerHTML = ""
}