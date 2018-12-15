let user = {};

let gameState = {
  board: [],
  turn: "black"
};

let localPlay = true;

let yourColor = "red";

let selected = null;

document.addEventListener("DOMContentLoaded", event => {
  boardInit();
  initGame();
  document.addEventListener('bdclickevent', e => {
    handleBdClick( e.detail.x, e.detail.y )
  });
});

function initGame () {
  gameState.turn = "black";
  gameState.board = [
    { x: 0, y: 0, color: "red"},
    { x: 2, y: 0, color: "red"},
    { x: 4, y: 0, color: "red"},
    { x: 6, y: 0, color: "red"},
    { x: 1, y: 1, color: "red"},
    { x: 3, y: 1, color: "red"},
    { x: 5, y: 1, color: "red"},
    { x: 7, y: 1, color: "red"},
    { x: 0, y: 2, color: "red"},
    { x: 2, y: 2, color: "red"},
    { x: 4, y: 2, color: "red"},
    { x: 6, y: 2, color: "red"},
    { x: 1, y: 5, color: "black"},
    { x: 3, y: 5, color: "black"},
    { x: 5, y: 5, color: "black"},
    { x: 7, y: 5, color: "black"},
    { x: 0, y: 6, color: "black"},
    { x: 2, y: 6, color: "black"},
    { x: 4, y: 6, color: "black"},
    { x: 6, y: 6, color: "black"},
    { x: 1, y: 7, color: "black"},
    { x: 3, y: 7, color: "black"},
    { x: 5, y: 7, color: "black"},
    { x: 7, y: 7, color: "black"},
  ];
  draw(gameState.board);
}

//  Board Click logic
function handleBdClick ( i, j ) {
  //check for remote play turn
  if ( !localPlay && yourColor != gameState.turn) {
    console.log(" not your turn");
    return;
  }

  // see if space clicked is empty or not
  let piece = _getPc( i, j );
  console.log(piece);
  if (piece) {  //not empty
    // is there a selected piece already for this turn
    if (piece.color == gameState.turn) {
      selected = piece;
      return //  TODO check possible moves?
    } else {
      console.log("not selected or wrong color " + piece.color);
      return;
    }
  } else {  // space is empty
    if (localPlay) {
      _submitMoveLocal( i, j);
    } else {
      _submitMoveRemote( selected, i, j );  // TODO hook up to cloud function
    }
  }
}

function clearBoard () {
  gameState.board = [];
}

// *******************  utilities   **********************

function _submitMoveLocal( i, j) {
  alert(" sumitting local move");
}

function _submitMoveRemote( selected, i, j ) {
  alert(" submitting remote move");
}

function _getPc ( x, y ) {
  for (var i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i].x === x && gameState.board[i].y === y) {
      return gameState.board[i];
    }
  }
}

/*********************************
* modifies properties of a piece in the
* pcs
* @param pc zero based indiex of piece
* @param Obj Object containing key value pairs
*********************************/
function setPc (pc, Obj) {
  if (pc >= 0 && pc <= 23) {
    for (var prop in Obj) {
      if (gameState.board[pc].hasOwnProperty(prop)) {
        gameState.board[pc][prop] = Obj[prop];
      } else {
        console.log("this sucks")
      }
    }
  } else {
    console.log("WTF, piece is out of range, only 24 pieces possible")
  }
}
