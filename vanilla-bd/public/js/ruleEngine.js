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
      codes = [{xd: 1, yd: 1}, {xd: -1, yd: 1}];
    } else { }
    if (spaceState.color == "b" && match.turn.color == "b") {
      codes = [{xd: -1, yd: -1}, {xd: 1, yd: -1}];
    } else { }
  }
  for (var m = 0; m < codes.length; m++) {
    let x = pcx + codes[m].xd;
    if (x < 0 || x > 7 ) {
      return;
    }
    let y = pcy + codes[m].yd;
    if (y < 0 || y > 7 ) {
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

const startBoard = "rrrrrrrrrrrreeeeeeeebbbbbbbbbbbb";

function initMatch( turnColor,redPlayerUID,blkPlayerUID ) {
  setBoard(startBoard, null, null);
  // console.log(board);

  let stat = "pending";
  if (redPlayerUID && blkPlayerUID) {  // local game?
    stat = "active";
  }

  return {turn: {color: turnColor, chain: false, chainSpace: null},
          boardState: startBoard,
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
