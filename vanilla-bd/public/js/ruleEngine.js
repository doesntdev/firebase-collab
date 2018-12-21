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
function isLegalMv(match, fm, to) {
  let fmcode = match.boardState[fm];
  let y = Math.floor(fm / 4);
  let x = fm % 4;
  let odd = (y % 2) ? true: false;;
  let dif = to - fm ;  // shifts odd rows
  console.log(fmcode, x, y, odd, dif);

  let itsLegal = false;
  let moves = {sw: false, se: false, nw: false, ne: false,}

  moves.sw = fmcode != 'b' && y < 7  && (
    (!odd && dif == 3 && x > 0) || (odd && dif == 4 )
  )
  moves.se = fmcode != 'b' && y < 7  && (
    (odd && dif == 5 && x < 3) || (!odd && dif == 4 )
  )
  moves.nw = fmcode != 'r' && y > 0  && (
    (!odd && dif == -5 && x > 0) || (odd && dif == -4 )
  )
  moves.ne = fmcode != 'r' && y > 0  && (
    (odd && dif == -3 && x < 3) || (!odd && dif == -4 )
  )

  return moves;
}

// boolean  assumes somehas already checked that to is "e"
function isLegalJump(match, fm, to) {
  let fmcode = match.boardState[fm];
  let yfm = Math.floor(fm / 4);
  let xfm = fm % 4;
  let diff = to - fm - (yfm % 2);  // shifts odd rows
  console.log(fmcode, xfm, yfm, diff);

  let itsLegal = [false, 32];
  let jumpPc = 'e';

  if ( fmcode != "b" && yfm < 6 && xfm > 0 && diff == 7) {
    jumpPc = match.boardState[fm + 3]
    if ((fmcode == 'r' || fmcode == 'R') && (jumpPc == 'b' || jumpPc == 'B')){
      itsLegal = [true, fm + 3];
    }
    console.log("hit 1");
  } else {
    console.log("hit 1",fmcode != "b", jumpPc, yfm < 7, xfm > 0, diff == 7)
    console.log("yo ", (fmcode == 'r' || fmcode == 'R'), (jumpPc == 'b' || jumpPc == 'B'))
  }
  if ( fmcode != "b" && yfm < 6 && xfm < 4 && diff == 9) {
    jumpPc = match.boardState[fm + 4]
    if ((fmcode == 'r' || fmcode == 'R') && (jumpPc == 'b' || jumpPc == 'B')){
      itsLegal = [true, fm + 4];
    }
    console.log("hit 2");
  } else {
    console.log("hit 2",fmcode != "b", jumpPc, yfm < 6, xfm < 4, diff == 9)
    console.log("yo ", (fmcode == 'r' || fmcode == 'R'), (jumpPc == 'b' || jumpPc == 'B'))
  }
  if ( fmcode != "r" && yfm > 1 && xfm > 0 && diff == -9) {
    jumpPc = match.boardState[fm + -4]
    if ((fmcode == 'b' || fmcode == 'B') && (jumpPc == 'r' || jumpPc == 'R')){
      itsLegal = [true, fm + -4];
    }
    console.log("hit 3");
  } else {
    console.log("hit 3",fmcode != "r", jumpPc, yfm >1, xfm > 0, diff == -9)
    console.log("yo ", (fmcode == 'b' || fmcode == 'B'), (jumpPc == 'r' || jumpPc == 'R'))
  }
  if ( fmcode != "r" && yfm > 1 && xfm < 4 && diff == -7) {
    jumpPc = match.boardState[fm + -3]
    if ((fmcode == 'b' || fmcode == 'B') && (jumpPc == 'r' || jumpPc == 'R')){
      itsLegal = [true, fm + -3];
    }
    console.log("hit 4");
  }
  else {
    console.log("hit 4",fmcode != "r", jumpPc, yfm > 1, xfm < 4, diff == -7)
    console.log("yo ", (fmcode == 'b' || fmcode == 'B'), (jumpPc == 'r' || jumpPc == 'R'))
  }

  return itsLegal;
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

const startBoard = "eeeeeeerreeeeeeeeereeeeeeeeereee"; // test red moves
// const startBoard = "rrrrbbbbrrrreeeeeeeeeeeeeeeeeeee";
// const startBoard = "eeeeeeeeeeeeeeeeeeeerrrrbbbbrrrr";

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
