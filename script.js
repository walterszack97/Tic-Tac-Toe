//Board object
const Gameboard = (() => {
  const _cells = 9;
  const _board = [];

  for (let i = 0; i < _cells; i++) {
    _board[i] = ""; //fill array with 9 empty cells
  }

  const render = () => {
    let boardCell = "";
    _board.forEach((cell, index) => {
      boardCell += `<div class="boardCells" id=${index}>${cell}</div>`;
    });
    document.querySelector("#boardContainer").innerHTML = boardCell;

    const cells = document.querySelectorAll(".boardCells");
    cells.forEach((cell) => {
      cell.addEventListener("click", GameController.handleClick);
    });
  };

  const updateCells = (index, value) => {
    _board[index] = value;
    render();
  };

  const checkCell = (i) => {
    return _board[i] == 0 ? true : false;
  };

  const getBoard = () => {
    return _board;
  };

  const isFilled = (currentValue) => {
    if (currentValue != "") {
      return true;
    }
  };

  const checkRowsForWin = () => {
    //collect each row of array to store in a new array of 3

    let row1 = [_board[0], _board[1], _board[2]];
    let row2 = [_board[3], _board[4], _board[5]];
    let row3 = [_board[6], _board[7], _board[8]];

    if (row1.every(isFilled)) {
      if (row1[0] === row1[1] && row1[1] === row1[2]) {
        console.log(row1);
        return true;
      }
    }
    if (row2.every(isFilled)) {
      if (row2[0] === row2[1] && row2[1] === row2[2]) {
        console.log(row2);
        return true;
      }
    }
    if (row3.every(isFilled)) {
      if (row3[0] === row3[1] && row3[1] === row3[2]) {
        return true;
      }
      return false;
    }
  };

  const checkColsForWin = () => {
    let col1 = [_board[0], _board[3], _board[6]];
    let col2 = [_board[1], _board[4], _board[7]];
    let col3 = [_board[2], _board[5], _board[8]];

    if (col1.every(isFilled)) {
      if (col1[0] === col1[1] && col1[1] === col1[2]) {
        return true;
      }
    }
    if (col2.every(isFilled)) {
      if (col2[0] === col2[1] && col2[1] === col2[2]) {
        return true;
      }
    }
    if (col3.every(isFilled)) {
      if (col3[0] === col3[1] && col3[1] === col3[2]) {
        return true;
      }
    }

    return false;
  };

  const checkHorizontalForWin = () => {
    if (
      (_board[0] !== "" && _board[4] !== "" && _board[8] !== "") ||
      (_board[2] !== "" && _board[4] !== "" && _board[6] !== "")
    ) {
      if (_board[0] == _board[4] && _board[0][0] == _board[8]) {
        return true;
      }
      if (_board[2] == _board[4] && _board[2] == _board[6]) {
        return true;
      }
    }
    return false;
  };

  const checkForWin = () => {
    if (checkColsForWin()) {
      return true;
    }

    if (checkRowsForWin()) {
      return true;
    }

    if (checkHorizontalForWin()) {
      return true;
    }
    return false;
  };

  const clearBoard = () => {
    _board.forEach((element, index) => {
      _board[index] = "";
    });
  };

  const checkForTie = () => {
    if (_board.every(isFilled)) {
      return true;
    }
    return false;
  };

  return {
    render,
    updateCells,
    checkCell,
    checkForWin,
    getBoard,
    clearBoard,
    checkForTie,
  };
})();

//Player object
const createPlayer = (name, symbol) => {
  return { name, symbol };
};

//GAME CONTROL
const GameController = (() => {
  let players = [];
  let currentPlayerIndex;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    Gameboard.render();
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id);
    if (Gameboard.checkCell(index)) {
      Gameboard.updateCells(index, players[currentPlayerIndex].symbol);
      if (Gameboard.checkForWin()) {
        gameOver();
        return;
      }
      if (Gameboard.checkForTie()) {
        tieGame();
      }
      currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    }
  };

  const tieGame = () => {
    gameOver();
    winnerDisplay.textContent = `TIE GAME`;
  };

  const gameOver = () => {
    const cells = document.querySelectorAll(".boardCells");
    cells.forEach((cell) => {
      cell.removeEventListener("click", GameController.handleClick);
    });
    const startButton = document.querySelector("#start-button");
    startButton.textContent = "New Game";
    const winnerDisplay = document.querySelector("#winnerDisplay");
    winnerDisplay.textContent = `${players[currentPlayerIndex].name} wins`;
    Gameboard.clearBoard();
    startButton.style.display = "block";
    const playerContainer = document.querySelector("#playerContainer");
    playerContainer.style.display = "block";
  };

  return { start, handleClick };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  if (validateStart()) {
    GameController.start();
    startButton.style.display = "none";
    const winnerDisplay = document.querySelector("#winnerDisplay");
    winnerDisplay.textContent = "";
    const playerContainer = document.querySelector("#playerContainer");
    playerContainer.style.display = "none";
  }
});

function validateStart() {
  let player1 = document.querySelector("#player1");
  let player2 = document.querySelector("#player2");
  if (player1.value == "" || player2.value == "") {
    alert("ENTER NAMES");
    return false;
  }
  return true;
}
