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
      boardCell += `<div class="boardCells" id=${index}></div>`;
    });
    document.querySelector("#boardContainer").innerHTML = boardCell;
  };

  /*   const checkCell = (i) => {
    return _board[i] == 0 ? true : false;
  };

  const checkRowsForWin = (rowArray) => {
    const allEqual = (arr) =>
      arr.every((index) => index === arr[0] && index !== 0);
    return allEqual(rowArray);
  };
  const checkColsForWin = (colArray) => {
    const allEqual = (arr) =>
      arr.every((index) => index === arr[0] && index !== 0);
    return allEqual(colArray);
  };
  const checkHorizontalForWin = () => {
    if (
      (_board[0][0] !== 0 && _board[1][1] !== 0 && _board[2][2] !== 0) ||
      (_board[0][2] !== 0 && _board[1][1] !== 0 && _board[2][0] !== 0)
    ) {
      if (_board[0][0] == _board[1][1] && _board[0][0] == _board[2][2]) {
        return true;
      }
      if (_board[0][2] == _board[1][1] && _board[0][2] == _board[2][0]) {
        return true;
      }
    }
    return false;
  };

  const setCell = (i, symbol) => {
    _board[i] = symbol;
  }; */

  return {
    /* createNewBoard,
    setCell,
    checkCell,
    checkRowsForWin,
    checkColsForWin,
    checkHorizontalForWin, */
    render,
  };
})();

//Player object
const createPlayer = (name, symbol) => {
  return { name, symbol };
};

const GameController = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player1").value, "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.render();
  };

  /* const board = Gameboard.getBoard();

  const checkForWin = () => {
    for (i = 0; i < 3; i++) {
      board.checkRowsForWin(_board[i]);
    }
    for (i = 0; i < 3; i++) {
      //collect 3 different arrays
      let colArray = [];
      for (j = 0; j < 3; j++) {
        //loop through rows
        colArray[j] = _board[j][i];
      }
      if (board.checkColsForWin(colArray)) {
        console.log("player wins");
      }
    }

    board.checkHorizontalForWin();
  }; */

  return { start };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  GameController.start();
});
