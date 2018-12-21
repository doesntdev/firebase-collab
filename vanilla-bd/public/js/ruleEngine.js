/***********
*  decoupled checkers rules
*/
// apply the rules of checkers to a move and calculate the new gameState
function doMove ( match, fm, to )  {
  let turn = match.turn;
  let fmcode = match.boardState[fm];
  let tocode = match.boardState[to];

  console.log(fm, to, turn.chain, turn.chainSpace);

  //  check turn, check space is empty
  if (turn.color != fmcode || tocode != "e") {
    return { lastMove: to, newMatchState: match, msg: "Move is illegal" };
  }

  // Check chain first
  let isLJ = isLegalJump( fm, to);
  if (turn.chain && isLJ && turn.chainSpace == fm) {
    console.log("chain jump");
    return doTheJump(fm, to);
  }

  // test for a jump
  if (!turn.chain && isLJ) {
    return doTheJump(fm, to);
  }

  // test for a normal ove
  let hasNoJump = getAllJumps().length == 0;
  let isLM = isLegalMv(fm, to);
  if (hasNoJump && isLM) {
    return doTheMove(fm, to);
  }

  //  illegal move
  return { lastMove: to, newMatchState: match, msg: "Move is illegal" };
}



//  return an array of all possible one space moves from the index
function posMvs(ind, match) {

}

//  return an array of all possible one space jumps from the index
function posJumps(ind) {

}

// returns an array of all possible next moves
function getAllMvs(match) {

}

//  returns an array of all possible jumps in the gameState
function getAllJumps(match) {
  return [];
}

// boolean  assumes somehas already checked that to is "e"
function isLegalMv(fmcode, fm, to) {
  let itsLegal = false;
  let yfm = Math.floor(fm / 4);
  let xfm = fm % 4;
  let diff = to - fm - (yfm % 2);  // shifts odd rows
  console.log(fmcode, xfm, yfm, diff);

  if ( fmcode != "b" && yfm < 7 && xfm > 0 && diff == 3) {
    itsLegal = true;
    console.log("hit 1");
  } else {
    console.log("hit 1",fmcode != "b", yfm < 7, xfm > 0, diff == 3)
  }
  if ( fmcode != "b" && yfm < 7 && xfm < 4 && diff == 4) {
    itsLegal = true;
    console.log("hit 2");
  } else {
    console.log("hit 2",fmcode != "b", yfm < 7, xfm < 4, diff == -4)
  }
  if ( fmcode != "r" && yfm > 0 && xfm > 0 && diff == -5) {
    itsLegal = true;
    console.log("hit 3");
  } else {
    console.log("hit 3",fmcode != "r", yfm > 0, xfm > 0, diff == -5)
  }
  if ( fmcode != "r" && yfm > 0 && xfm < 4 && diff == -4) {
    itsLegal = true;
    console.log("hit 4");
  } else {
    console.log("hit 4",fmcode != "r", yfm > 0, xfm < 4, diff == -4)
  }


  return itsLegal;
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
