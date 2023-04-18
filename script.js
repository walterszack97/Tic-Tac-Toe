//Board object
const Gameboard = (() => {
  const _rows = 3;
  const _columns = 3;
  const _board = [];

  const createNewBoard = () => {
    for (let i = 0; i < _rows; i++) {
      _board[i] = []; //create array for each row
      for (let j = 0; j < _columns; j++) {
        _board[i].push(0); //fill array with empty cells
      }
    }
  };

  const getBoard = () => {
    for (let i = 0; i < _rows; i++) {
      console.log(_board[i]);
    }
    return _board;
  };

  const getCell = (i, j) => {
    console.log(_board[i][j]);
  };

  const checkCell = (i, j) => {
    return _board[i][j] == 0 ? true : false;
  };

  const checkRowsForWin = (rowArray) => {
    const allEqual = (arr) => arr.every((index) => index === arr[0]);
    return allEqual(rowArray);
  };
  const checkColsForWin = (colArray) => {
    const allEqual = (arr) => arr.every((index) => index === arr[0]);
    return allEqual(colArray);
  };
  const checkHorizontalForWin = () => {
    if (_board[0][0] == _board[1][1] && _board[0][0] == _board[2][2]) {
      return true;
    }
    if (_board[0][2] == _board[1][1] && _board[0][2] == _board[2][0]) {
      return true;
    }
    return false;
  };

  const setCell = (i, j, symbol) => {
    //_board[i][j] = player.getSymbol();
    _board[i][j] = symbol;
  };

  return {
    createNewBoard,
    getBoard,
    getCell,
    setCell,
    checkCell,
    checkRowsForWin,
    checkColsForWin,
    checkHorizontalForWin,
  };
})();

//Player object
const Player = (symbol) => {
  const _playerSymbol = symbol;

  const getSymbol = () => {
    console.log(_playerSymbol);
  };

  const placeSymbol = (i, j) => {
    if (Gameboard.checkCell(i, j)) {
      Gameboard.setCell(i, j, symbol);
    } else {
      console.log("Pick empty cell");
    }
  };

  const checkForWin = () => {
    let _board = Gameboard.getBoard();

    for (i = 0; i < 3; i++) {
      Gameboard.checkRowsForWin(_board[i]);
    }
    for (i = 0; i < 3; i++) {
      //collect 3 different arrays
      let colArray = [];
      for (j = 0; j < 3; j++) {
        //loop through rows
        colArray[j] = _board[j][i];
      }
      Gameboard.checkColsForWin(colArray);
    }

    console.log(Gameboard.checkHorizontalForWin());
  };

  return { getSymbol, placeSymbol, checkForWin };
};

/* const GameController = (() => {
  const choosePlayerSymbol = () => {
    const pickSymbol = prompt("Will you be X or O?")
    if
  }

  const getPlayerTurn = (player) => {
    let _playerTurn = false;
    if (player.getSymbol == 'O'){
        _playerTurn = true
        if (_playerTurn == true)
    }
  }
  
  //start new round if no winner found
})(); */

//newGame
const me = Player("X");
const them = Player("O");

Gameboard.createNewBoard();

me.placeSymbol(0, 1);
Gameboard.getBoard();
me.checkForWin();
