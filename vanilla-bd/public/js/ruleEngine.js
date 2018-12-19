/***********
*  decoupled checkers rules
***********/

function doMove ( match, nextMove )  {
  let moves = [];
  let turn = match.turn;
  console.log(turn);
  let movefm = match.boardState[nextMove.fm.x][nextMove.fm.y];
  console.log(movefm);
  let moveto = match.boardState[nextMove.to.x][nextMove.to.y];
  console.log(moveto)
  //  check turn
  if (turn.color == movefm.color) {
    if (turn.chain) {
      if (turn.chainSpace == nextMove.fm) {
        console.log("in the chain loop")
        if ( isJumpLegal(nextMove, nextMove )) {
          return doTheJump( match, nextMove );
        } else {
          return { lastMove: nextMove, newMatchState: match, msg: "Move is illegal" };
        }
      } else {
        return { lastMove: nextMove, newMatchState: match, msg: "This is a chain move, must be same piece" };
      }
    } else {
      console.log("in the first move loop")
      if ( isJump() ){
        console.log("is a first jump")
        calculateMoves(match);
        if ( isJumpLegal(nextMove, nextMove )) {
          return doTheJump( match, nextMove );
        } else {
          return { lastMove: nextMove, newMatchState: match, msg: "Move is illegal" };
        }
      } else {
        calculateMoves(match);
        if ( isMoveLegal(nextMove, nextMove )) {
          return doTheMove( match, nextMove );
        } else {
          return { lastMove: nextMove, newMatchState: match, msg: "Move is illegal" };
        }
      }
    }
  } else {
    return { lastMove: nextMove, newMatchState: match, msg: "Not your turn" };
  }
}

function isJump (move) {

  return false;
}
function isMoveLegal(boardState, nextMove) {
  return true;
}
function isJumpLegal(boardState, nextMove) {
  return true;
}
function doTheMove( match, nextMove ) {
  console.log("doing the move");
  let fm = nextMove.fm;
  let to = nextMove.to;
  mvPc = match.boardState[fm.x][fm.y].color;
  match.boardState[fm.x][fm.y].color = "e";
  match.boardState[to.x][to.y].color = mvPc;

  return { lastMove: nextMove, newMatchState: match, msg: "successful move"};
}

function doTheJump( match, nextMove ) {
  console.log("doing the Jump");
  let fm = nextMove.fm;
  let to = nextMove.to;
  mvPc = match.boardState[fm.x][fm.y].color;
  match.boardState[fm.x][fm.y].color = "e";
  match.boardState[to.x][to.y].color = mvPc;

  return { lastMove: nextMove, newMatchState: match, msg: "successful move"};
}



function calculateMoves(match) {
  let allMvs = [];
  let gameState = match.boardState;
  let turnColor = match.turn.color;

  for (var i = 0; i < gameState.length; i++) {
    for (var j = 0; j < gameState[i].length; j++) {
      let spaceState =  gameState[i][j];
      calculateDiagonals( i, j, spaceState, match, allMvs);
    }
  }
  console.log(allMvs);

}

function calculateDiagonals(  pcx, pcy, spaceState, match, almvs) {
  // console.log(  pcx, pcy);
  let codes = [];

  if (spaceState.isKing) {
    codes = [{xd: 1, yd: 1}, {xd: -1, yd: 1}, {xd: -1, yd: -1}, {xd: 1, yd: -1}];
  } else {
    // console.log(pcx, pcy)
    if (spaceState.color == "r" && match.turn.color == "r") {
      console.log("red stone", pcx, pcy)
      codes = [{xd: 1, yd: 1}, {xd: -1, yd: 1}];
    }
    if (spaceState.color == "b" && match.turn.color == "b") {

      codes = [{xd: -1, yd: -1}, {xd: 1, yd: -1}];
    }
  }
  for (var m = 0; m < codes.length; m++) {
    // console.log(pcx, pcy);
    let x = pcx + codes[m].xd;
    if (x < 0 || x > 7 ) {
      // console.log(pcx, pcy, x);
      return;
    }
    let y = pcy + codes[m].yd;
    console.log("y = ", y, "x = ", x, "for ", pcx, pcy)
    if (y < 0 || y > 7 ) {
      // console.log(pcx, pcy, x, y);
      return;
    }
    // console.log("color of target", match.boardState[x][y].color, x, y)
    if ( match.boardState[x][y].color == "e" ) {
      console.log("pushed", x, y)
      almvs.push({fm: {x: pcx , y: pcy}, to: {x: x, y: y} });
      // console.log(almvs);
    }
    if (match.boardState[x][y].color != spaceState.color) {
      let xx = x + codes[m].xd;
      if (xx < 0 || xx > 7 ) {return;}
      let yy = y + codes[m].yd;
      if (yy < 0 || yy > 7 ) {return;}
      if ( match.boardState[x][y] == "e" ) {
        almvs.push({fm: {x: pcx, y: pcy}, to: {x: xx, y: yy}, jump: {x: x, y: y} });
      }
    }
  }
  // console.log(almvs);
  return almvs;
}

// function calculateDiagonals( pcx, pcy, pc, xdirection, ydirection) {
//     let x = pcx + xdirection;
//     if (x < 0 || x > 7 ) {return;}
//     let y = pcy + ydirection;
//     if (y < 0 || y > 7 ) {return;}
//     let [h, diagpcs] = _getPc( x, y );
//     if (!diagpcs ) {
//       allMoves.push({index: pcIndex, x: x, y: y, jump: null});
//     }
//     if (diagpcs && diagpcs.color != gameState.turn) {
//       let xx = x + xdirection;
//       if (xx < 0 || xx > 7 ) {return;}
//       let yy = y + ydirection;
//       if (yy < 0 || yy > 7 ) {return;}
//       let [hh, diagpcs2] = _getPc( xx, yy );
//       if (!diagpcs2) {
//         jumpExists = true;
//         allMoves.push({index: pcIndex, x: xx, y: yy, jump: diagpcs});
//       }
//     }
// }




// ******************  other functions   *****************

const startBoard = [
  { x: 0, y: 0, color: "r"},
  { x: 2, y: 0, color: "r"},
  { x: 4, y: 0, color: "r"},
  { x: 6, y: 0, color: "r"},
  { x: 1, y: 1, color: "r"},
  { x: 3, y: 1, color: "r"},
  { x: 5, y: 1, color: "r"},
  { x: 7, y: 1, color: "r"},
  { x: 0, y: 2, color: "r"},
  { x: 2, y: 2, color: "r"},
  { x: 4, y: 2, color: "r"},
  { x: 6, y: 2, color: "r"},
  { x: 1, y: 5, color: "b"},
  { x: 3, y: 5, color: "b"},
  { x: 5, y: 5, color: "b"},
  { x: 7, y: 5, color: "b"},
  { x: 0, y: 6, color: "b"},
  { x: 2, y: 6, color: "b"},
  { x: 4, y: 6, color: "b"},
  { x: 6, y: 6, color: "b"},
  { x: 1, y: 7, color: "b"},
  { x: 3, y: 7, color: "b"},
  { x: 5, y: 7, color: "b"},
  { x: 7, y: 7, color: "b"},
];

function initMatch( turnColor,redPlayerUID,blkPlayerUID ) {

  //  construct the arrays
  let board = new Array(8);
  for (var i = 0; i < board.length; i++) {
    board[i] = new Array(8);
  }
  // set all spaces to empty
  for (let d = 0; d < 8; d++) {
    for (let e = 0; e < 8; e++) {
      board[d][e] = { color: "e", isKing: false};
    }
  }

  // set the pieces
  for (let f = 0; f < startBoard.length; f++) {
    // console.log(startBoard[f].color);
    if (startBoard[f].color == "r") {
      // console.log("red one");
      board[startBoard[f].x][startBoard[f].y] = {color: "r", isKing: false};
    } else {
      // console.log("black one");
      board[startBoard[f].x][startBoard[f].y] = {color: "b", isKing: false};
    }
  }

  // console.log(board);

  let stat = "pending";
  if (redPlayerUID && blkPlayerUID) {
    stat = "active";
  }

  return {turn: {color: turnColor, chain: false, chainSpace: {x: -1, y: -1}},
          boardState: board,
          redUID: redPlayerUID,
          blkUID: blkPlayerUID,
          status: stat
        };
}

function setPlayer ( color, UID) {
  let stat = "active";
  let msg = "what the hell";
  return { status: stat, msg: msg};
}
function setStatus ( stat ) {
  let stat = "active";
  let msg = "what the hell";
  return { status: stat, msg: msg};
}
