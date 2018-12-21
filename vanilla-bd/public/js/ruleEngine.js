/***********
*  decoupled checkers rules
***********/
// apply the rules of checkers to a move and calculate the new gameState
function doMove ( match, fm, to )  {
  let turn = match.turn;
  let movefm = match.boardState[fm];
  let moveto = match.boardState[to];

  console.log(fm, to, turn.chain, turn.chainSpace);

  //  check turn
  if (turn.color != movefm) {
    return { lastMove: to, newMatchState: match, msg: "Move is illegal" };
  }

  // Check chain first
  let isLJ = isLegalJump( fm, to);
  if (turn.chain && isLJ && turn.chainSpace == fm) {
    console.log("chain jump");
    return doTheJump(fm, to);
  }

  if (!turn.chain && isLJ) {
    return doTheJump(fm, to);
  }

  let hasNoJump = getAllJumps().length == 0;
  let isLM = isLegalMv(fm, to);
  if (hasNoJump && isLM) {
    return doTheMove(fm, to);
  }

  return { lastMove: to, newMatchState: match, msg: "Move is illegal" };
}



//  return an array of all possible one space moves from the index
function posMvs(ind) {

}

//  return an array of all possible one space jumps from the index
function posJumps(ind) {

}

// returns an array of all possible next moves
function getAllMvs() {

}

//  returns an array of all possible jumps in the gameState
function getAllJumps() {
  return [];
}

// boolean
function isLegalMv(fm, to) {
  return true;
}

// boolean
function isLegalJump(fm, to) {
  return true;
}

// modifies the match state by processing the moves
function doTheMove( fm, to) {
  return { lastMove: to, newMatchState: match, msg: "Move Great" };
}

// modifies the match state by processing a jumps
function doTheJump( fm, to ) {
  return { lastMove: to, newMatchState: match, msg: "Jump is cool" };
}

// ******************  other functions   *****************

const startBoard = "rrrrrrrrrrrreeeeeeeebbbbbbbbbbbb";

function initMatch( turnColor,redPlayerUID,blkPlayerUID ) {
  setBoard(startBoard, null, null);
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
