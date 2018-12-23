/***********
*  decoupled checkers rules
*
*
*/
// apply the rules of checkers to a move and calculate the new gameState
function doMove ( match, fm, to )  {
  let turn = match.turn;
  let fmcode = match.boardState[fm];
  let tocode = match.boardState[to];
  let isLJ = false;  // is legal jump
  let captured = null;  // index of captured piece

  console.log(fm, to, turn.chain, turn.chainSpace);

  //  check turn, check space is empty
  if (turn.color != fmcode || tocode != "e") {
    return { lastMove: to, newMatchState: match, msg: "Move is illegal" };
  }

  if ( fm - to > 5 || to - fm > 5){
    [ isLJ, captured ] = isLegalJump( fm, to);

    // Check chain first
    if (turn.chain && isLJ && turn.chainSpace == fm) {
      console.log("chain jump");
      return doTheJump(fm, to);
    }

    // test for a jump
    if (!turn.chain && isLJ) {
      return doTheJump(fm, to);
    }
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
  // console.log(fmcode, x, y, odd, dif);

  let moves = {sw: false, se: false, nw: false, ne: false}

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

  return moves.sw || moves.se || moves.nw || moves.ne;
}

// boolean  assumes somehas already checked that to is "e"
function isLegalJump(match, fm, to) {
  let fmcode = match.boardState[fm];
  let targetCode = 'b';
  if (fmcode == 'b' || fmcode == 'B') { targetCode = 'r'}
  let y = Math.floor(fm / 4);
  let oddOffset = (y % 2)
  let x = fm % 4;
  let dif = to - fm ;  // shifts odd rows
  console.log(fmcode, targetCode, x, y, dif);

  let jumps = {sw: false, se: false, nw: false, ne: false,}
  let isLegalJump = false;
  let captured = null;

  if ( fmcode != 'b' && y < 6  && dif == 7 && x > 0 ){
    captured = fm + 3 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.sw = true;
    }
  }
  if ( fmcode != 'b' && y < 6  && dif == 9 && x < 3 ){
    captured = fm + 4;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.se = true + oddOffset;
    }
  }
  if( fmcode != 'r' && y > 1  && dif == -9 && x > 0 ){
    captured = fm - 5 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.nw = true;
    }
  }
  if ( fmcode != 'r' && y > 1  && dif == -7 && x < 3 ){
    captured = fm - 4 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.ne = true;
    }
  }

  console.log(jumps);
  isLegalJump = jumps.sw || jumps.se || jumps.nw || jumps.ne;
  return [ isLegalJump, captured ];
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

// const startBoard = "eeeeeeerreeeeeeeeereeeeeeeeereee"; // test red moves
const startBoard = "eeeerrerrbreebbeeereebbeeeeereee"; // test red moves
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
