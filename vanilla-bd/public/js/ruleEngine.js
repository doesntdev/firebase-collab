

function _submitMoveLocal( i, j) {
  let result = {isLegal: true};
  return result;
}

function _submitMoveRemote( selected, i, j ) {
  alert(" submitting remote move");
}

let jumpExists = false;
let allMoves = [];

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


function updateGameState(move) {

}
