/***********
*  decoupled checkers rules
*
*   fmcode ????
*/


// const startBoard = "eeeeeeerreeebeeeeereebbeeeeereee"; // test red moves
// const startBoard = "eeeerrerrbreebbeeereebbeeeeereee"; // test red moves
const startBoard = "rrrrrrrrrrrreeeeeeeebbbbbbbbbbbb";
// const startBoard = "eeeebbbbrrrreeeeeeeebbbbrrrreeee";
// const startBoard = "eeeeeeeeeeeeeeeeeeeerrrrbbbbrrrr";

function initMatch( turnColor,redPlayerUID,blkPlayerUID ) {
  // populate an array
  let initBoard = [];
  for (var i = 0; i < startBoard.length; i++) {
    initBoard[i] = startBoard[i];
  }
  // setBoard(initBoard, null, null);
  let stat = "pending";
  if (redPlayerUID && blkPlayerUID) {  // local game?
    stat = "active";
  }
  return {turn: {color: turnColor, chain: false, chainSpace: null},
    boardState: initBoard,
    redUID: redPlayerUID,
    blkUID: blkPlayerUID,
    status: stat
  };
}


// apply the rules of checkers to a move and calculate the new gameState
function doMove ( match, fm, to )  {
  let turn = match.turn;
  let fmcode = match.boardState[fm];
  let isLJ = false;  // is legal jump
  let captured = null;  // index of captured piece
  let tocode = match.boardState[to];
  let fmcolor = 'e';
  if (fmcode == 'r' || fmcode == 'R') {fmcolor = 'r';}
  if (fmcode == 'b' || fmcode == 'B') {fmcolor = 'b';}



  console.log(fm, to, turn.chain, turn.chainSpace);

  //  check turn, check space is empty
  if (turn.color != fmcolor || tocode != "e") {
    return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal 3" };
  }

  if ( fm - to > 5 || to - fm > 5){
    [ isLJ, captured ] = isLegalJump(match, fm, to);
    console.log("[ isLJ, captured ]", isLJ, captured );

    // Check chain first
    if ( isLJ && ((!turn.chain) || (turn.chain && turn.chainSpace == fm))) {
      console.log("jump");
      let code = match.boardState[fm];
      match.boardState[fm] = 'e';
      match.boardState[captured] = 'e';
      //  check for kinging
      if (to > 27  && code == 'r') {code = 'R'}
      if (to < 4 && code == 'b') {code = 'B'}
      match.boardState[to] = code;
      if ( hasJump(match, to).length == 0 ) {
        match.turn = {color: 'b', chain: false, chainSpace: null};
        if (code == 'b' || code == 'B') {match.turn.color = 'r';}
      } else {
        match.turn = {color: 'b', chain: true, chainSpace: to};
        if (code == 'r' || code == 'R') {match.turn.color = 'r';}
      }

      return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Great Jump!!!" };
    } else {
      return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "WTF ???" };
    }

    // test for a jump
    // if (!turn.chain && isLJ) {
    //   let code = match.boardState[fm];
    //   match.boardState[fm] = 'e';
    //   match.boardState[captured] = 'e';
    //   match.boardState[to] = code;
    //   return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal" };
    // }
  }


  // test for a normal ove
  let jumpNum = getAllJumps(match).length;
  if (jumpNum == 0) {hasAJump = false;} else {hasAJump = true;}

  let isLM = isLegalMv(match, fm, to);
  if (!hasAJump && isLM) {
    let code = match.boardState[fm];
    match.boardState[fm] = 'e';
    if (to > 27  && code == 'r') {code = 'R'}
    if (to < 4 && code == 'b') {code = 'B'}
    match.boardState[to] = code;
    match.turn = {color: 'b', chain: false, chainSpace: null};
    if (code == 'b' || code == 'B') {match.turn.color = 'r';}
    return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Great Move!!" };
  }

  //  illegal move
  return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal 1" };
}


// returns an array of all possible next moves
function getAllMvs(match) {
  let moveSet = new Set();
  let code = match.turn.color;
  for (let i = 0; i < match.boardState.length; i++) {
    let testPiece = match.boardState[i];
    testCode = testPiece.toLowerCase();
    if ( testCode == code ) {
      let testMoves = hasMove( match, i);
      for (var j = 0; j < testMoves.length; j++) {
        moveSet.add(testMoves[j]);
      }
    }
  }
  let allMoves = [];
  for (let move of moveSet) {
    allMoves.push(move);
  }
  return allMoves;
}

//  returns an array of all possible jumps in the gameState
function getAllJumps(match) {
  let jumpSet = new Set();
  let code = match.turn.color;
  for (let i = 0; i < match.boardState.length; i++) {
    let testPiece = match.boardState[i];
    testCode = testPiece.toLowerCase();
    if ( testCode == code ) {
      let testJumps = hasJump( match, i);
      for (var j = 0; j < testJumps.length; j++) {
        jumpSet.add(testJumps[j]);
      }
    }
  }
  let allJumps = [];
  for (let jump of jumpSet) {
    allJumps.push(jump);
  }
  return allJumps;
}

function getPosSpaces(match) {
  let resultArray = []
  let jmps = getAllJumps(match);
  if (jmps.length > 0) {
    for (var i = 0; i < jmps.length; i++) {
      resultArray.push(jmps[i][0]);
    }
  } else {
    resultArray = getAllMvs(match);
  }
  return resultArray;
}


// ******************  other functions   *****************

// returns an array of legal moves from "fm"
function hasMove ( match, fm ) {
  let fmcode = match.boardState[fm];
  let y = Math.floor(fm / 4);
  let x = fm % 4;
  let odd = y % 2;
  // let dif = to - fm ;  // shifts odd rows
  console.log(fmcode, x, y, odd);

  let moves = [];

  let testSpace = match.boardState[ fm + 3 + odd ];
  if (fmcode != 'b' && y < 7  && x + odd > 0 && testSpace == 'e') {
    moves.push( fm + 3 + odd );
    console.log("A");
  }
  testSpace = match.boardState[ fm + 4 + odd ];
  if (fmcode != 'b' && y < 7  &&  x + odd < 4 && testSpace == 'e') {
    moves.push( fm + 4 + odd );
    console.log("B");
  }
  testSpace = match.boardState[ fm - 5 + odd ];
  if (fmcode != 'r' && y > 0  && x + odd > 0 && testSpace == 'e') {
    moves.push( fm - 5 + odd );
    console.log("C");
  }
  testSpace = match.boardState[ fm - 4 + odd ];
  if (fmcode != 'r' && y > 0  && x + odd < 3 && testSpace == 'e') {
    moves.push( fm - 4 + odd );
    console.log("D");
  }

  return moves;
}

// returns an array of legal jumps from "fm"
function hasJump (match, fm) {
  let fmcode = match.boardState[fm];
  let targetCode = 'b';
  if (fmcode == 'b' || fmcode == 'B') { targetCode = 'r'}
  let y = Math.floor(fm / 4);
  let oddOffset = (y % 2)
  let x = fm % 4;
  let jumps = [];

  // console.log(fmcode, targetCode, x, y);

  let testSpace = match.boardState[ fm + 7 ]
  if ( fmcode != 'b' && y < 6  && testSpace == 'e' && x > 0 ){
    captured = fm + 3 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.push([fm + 7, captured]);
    }
  }
  testSpace = match.boardState[ fm + 9 ]
  if ( fmcode != 'b' && y < 6  && testSpace == 'e' && x < 3 ){
    captured = fm + 4 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.push([fm + 9, captured]);
    }
  }
  testSpace = match.boardState[ fm - 9 ]
  if( fmcode != 'r' && y > 1  && testSpace == 'e' && x > 0 ){
    captured = fm - 5 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.push([fm - 9, captured]);
    }
  }
  testSpace = match.boardState[ fm - 7 ]
  if ( fmcode != 'r' && y > 1  && testSpace == 'e' && x < 3 ){
    captured = fm - 4 + oddOffset;
    if (match.boardState[captured].toLowerCase() == targetCode) {
      jumps.push([fm - 7, captured]);
    }
  }

  return jumps;
}

// boolean  assumes somehas already checked that to is "e"
function isLegalMv(match, fm, to) {
  let mvs = hasMove(match, fm);
  let result = mvs.includes( to );
  return result;
}

// boolean  assumes somehas already checked that to is "e"
function isLegalJump(match, fm, to) {
  let jmps = hasJump(match, fm);
  result = [false, null];
  for (var i = 0; i < jmps.length; i++) {
    if ( jmps[i][0] == to ) { result = [true, jmps[i][1]] }
  }
  return result;
}







// function setSpace(chr, index, bdState) {
//   return bdState.substr(0,index) + chr + bdState.substr(index+1);
// }

//  return an array of all possible one space moves from the index
function posMvs(ind, match) {
  return [12, 13, 14, 15];
}

//  return an array of all possible one space jumps from the index
function posJumps(ind) {
  return 2;
}

module.exports = { getPosSpaces, getAllJumps, posJumps, posMvs, initMatch }
