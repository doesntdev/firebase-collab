let user = {};
let gameState = {
  board: [],
  turn: "black"
};
let localPlay = true;
let yourColor = "red";
let selected = null;
let jumpExists = false;
let allMoves = [];

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
    { x: 6, y: 2, color: "red", isKing: true},
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
  calculateMoves();
  draw(gameState.board, selected);
}

//  Board Click logic
function handleBdClick ( i, j ) {
  //check for remote play turn
  if ( !localPlay && yourColor != gameState.turn) {
    console.log(" not your turn");
    return;
  }

  // see if space clicked is empty or not
  let [h, piece] = _getPc( i, j );
  if (piece) {  //not empty
    // is there a selected piece already for this turn
    if (piece.color == gameState.turn) {
      if (piece == selected) {
        selected = null;
      } else {
        selected = piece;
      }
      draw(gameState.board, selected);
      return;
    } else {
      console.log("not selected or wrong color " + piece.color);
      return;
    }
  } else {  // space is empty
    if (localPlay) {
      let moveResult = _submitMoveLocal( i, j);
      if (moveResult.isLegal) {
        let [selIndex, s] = _getPc( selected.x, selected.y );
        gameState.board[selIndex].x = i;
        gameState.board[selIndex].y = j;
        selected = null;
        toggleTurn();
        draw(gameState.board, selected);
      } else {
        alert("illegal move");
      }
    } else {
      _submitMoveRemote( selected, i, j );  // TODO hook up to cloud function
    }
  }
}

function _submitMoveLocal( i, j) {
  let result = {isLegal: true};
  return result;
}

function _submitMoveRemote( selected, i, j ) {
  alert(" submitting remote move");
}

// *******************  utilities   **********************

function clearBoard () {
  gameState.board = [];
}

function toggleTurn () {
  gameState.turn == "red" ? gameState.turn = "black" : gameState.turn = "red";
  calculateMoves();
}

function _getPc ( x, y ) {
  let result = [null,null];
  for (var i = 0; i < gameState.board.length; i++) {
    if (gameState.board[i].x === x && gameState.board[i].y === y) {
      result = [i, gameState.board[i]];
    }
  }
  return result;
}

function calculateMoves() {
  allMoves = [];
  jumpExists = false;
  for (var i = 0; i < gameState.board.length; i++) {
    console.log(gameState.turn, gameState.board[i].isKing)
    if (
      (gameState.turn == "red" && gameState.board[i].color == "red" ) ||
      (gameState.board[i].isKing  && gameState.turn == gameState.board[i].color)
    ){
      calculateDiagonals(i, gameState.board[i], 1, 1);
      calculateDiagonals(i, gameState.board[i], -1, 1);
    }
    if (
      (gameState.turn == "black" && gameState.board[i].color == "black")  ||
      (gameState.board[i].isKing  && gameState.turn == gameState.board[i].color)
    ){
      calculateDiagonals(i, gameState.board[i], -1, -1);
      calculateDiagonals(i, gameState.board[i], 1, -1);
    }
  }
  if (jumpExists) {
    let tempArray = [];
    for (var j = 0; j < allMoves.length; j++) {
      if (allMoves[j].jump) {tempArray.push(allMoves[j]);}
    }
    allMoves = tempArray;
  }
  console.log(allMoves);
}

function calculateDiagonals(pcIndex, pc, xdirection, ydirection) {
    let x = pc.x + xdirection;
    if (x < 0 || x > 7 ) {return;}
    let y = pc.y + ydirection;
    if (y < 0 || y > 7 ) {return;}
    let [h, diagpcs] = _getPc( x, y );
    if (!diagpcs ) {
      allMoves.push({index: pcIndex, x: x, y: y, jump: null});
    }
    if (diagpcs && diagpcs.color != gameState.turn) {
      let xx = x + xdirection;
      if (xx < 0 || xx > 7 ) {return;}
      let yy = y + ydirection;
      if (yy < 0 || yy > 7 ) {return;}
      let [hh, diagpcs2] = _getPc( xx, yy );
      if (!diagpcs2) {
        jumpExists = true;
        allMoves.push({index: pcIndex, x: xx, y: yy, jump: diagpcs});
      }
    }
}
