/***********
*  decoupled checkers rules
***********/

function doMove ( match, turn, nextMove )  {
  let moves = [];
  if (match.turn.color == turn.color) {
    if (turn.chain) {
      if (turn.chainSpace == nextMove.fm) {
        if ( isJumpLegal(nextMove, moves)) {
          return doTheMove( match, turn, nextMove );
        } else {
          return { lastMove: nextMove, newMatchState: match, msg: "Move is illegal" };
        }
      } else {
        return { lastMove: nextMove, newMatchState: match, msg: "This is a chain move, must be same piece" };
      }
    } else {
      if ( isMoveLegal(nextMove, moves)) {
        return doTheMove( match, turn, nextMove );
      } else {
        return { lastMove: nextMove, newMatchState: match, msg: "Move is illegal" };
      }
    }
  } else {
    return { lastMove: nextMove, newMatchState: match, msg: "Not your turn" };
  }
}

function isMoveLegal(boardState, nextMove) {
  return true;
}
function isJumpLegal(boardState, nextMove) {
  return true;
}
function doTheMove( match, turn, nextMove ) {
  let fm = nextMove.fm;
  let to = nextMove.to;
  mvPc = match.boardState[fm.x][fm.y].color;
  match.boardState[fm.x][fm.y].color = "e";
  match.boardState[to.x][to.y].color = mvPc;

}

// ******************  other functions   *****************

const startBoard = [
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
    if (startBoard[f].color == "red") {
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
