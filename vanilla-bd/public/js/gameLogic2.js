let user = {uid: "A"};
let match = {};
let localPlay = true;
let yourColor = "r";
let selected = null;
let allMoves = [];


document.addEventListener("DOMContentLoaded", event => {
  initBoard(63);
  // initGame();
  match = initMatch( "r","A", "A" );
  setBoard(match.boardState, selected, allMoves);
  document.addEventListener('bdclickevent', e => {
    handleBdClick( e.detail.index, e.detail.code )
  });
});

// function initGame () {
//   match = initMatch( "r","A", "B" )
//   //calculateMoves();
//   console.log(match);
//   draw(match.boardState, selected, allMoves);
// }


function handleBdClick ( index, code ) {

  // check for remote play and turn
  if ( match.redUID != match.blkUID && yourColor != match.turn.color) {
    console.log(" not your turn");
    return;
  }

  console.log("in the board click", index, code);

  if (code != "e") {  //not empty
    // is there a selected.piece piece already for this turn
    if (code == match.turn.color) {
      if (selected == index) {
        selected = null;
        setSel(null);
      } else {
        selected = index;
        setSel(index);
      }
      //  TODO calculate possible moves
    } else {
      console.log("not selected.piece or wrong color ");
      return;
    }
  } else {
    if ( selected ) {
      let hoh = doMove(match, selected, index);
      console.log(hoh);
    } else {
      console.log("empty space, no selected piece");
    }
  }
  //
  //
  // // see if space clicked is empty or not
  // let [pcIndex, piece] = _getPc( i, j );
  // if (piece) {  //not empty
  //
  //   // is there a selected.piece piece already for this turn
  //   if (piece.color == gameState.turn) {
  //     if (piece == selected.piece) {
  //       selected = {index: null, piece: null};
  //     } else {
  //       selected = {index: pcIndex, piece: piece};
  //     }
  //     calculateMoves();
  //     draw(gameState.board, selected, allMoves);
  //     return;
  //   } else {
  //     console.log("not selected.piece or wrong color " + piece.color);
  //     return;
  //   }
  // } else {  // space is empty
  //   if (localPlay && selected.piece) {
  //     // let moveResult = _submitMoveLocal( i, j);
  //     let isLegal = false;
  //     let capture = null;
  //     for (var z = 0; z < allMoves.length; z++) {
  //       if (allMoves[z].x == i &&
  //           allMoves[z].y == j) {
  //         isLegal = true;
  //         capture = allMoves[z].jump;
  //       }
  //     }
  //     if (isLegal) {
  //       gameState.board[selected.index].x = i;
  //       gameState.board[selected.index].y = j;
  //
  //       if (capture) {
  //         removePcs(capture);
  //         calculateMoves()
  //         console.log("special capture calculation")
  //         console.log(allMoves);
  //         let chain = false;
  //         for (var i = 0; i < allMoves.length; i++) {
  //           if (allMoves[i].jump) {chain = true;}
  //         }
  //         console.log("chain", chain);
  //         if (!chain) {
  //           console.log("in not chain");
  //           selected = {index: null, piece: null};
  //           toggleTurn();
  //         }
  //       } else {
  //         selected = {index: null, piece: null};
  //         toggleTurn();
  //       }
  //
  //       draw(gameState.board, selected, allMoves);
  //     } else {
  //       console.log("illegal move");
  //     }
  //   } else {
  //     _submitMoveRemote( selected, i, j );  // TODO hook up to cloud function
  //   }
  // }
}

function _submitMoveRemote( sel, i, j ) {
  alert(" submitting remote move");
}

// *******************  utilities   **********************

// function clearBoard () {
//   gameState.board = [];
// }
//
// function toggleTurn () {
//   gameState.turn == "r" ? gameState.turn = "b" : gameState.turn = "r";
//   calculateMoves();
// }

// function removePcs (pc) {
//   console.log("yoho", pc.x, pc.y, pc.color)
//   let [pcIndex, pcObj] = _getPc(pc.x, pc.y)
//   gameState.board.splice(pcIndex, 1);
// }

// function _getPc ( x, y ) {
//   let result = [null,null];
//   for (var i = 0; i < gameState.board.length; i++) {
//     if (gameState.board[i].x === x && gameState.board[i].y === y) {
//       result = [i, gameState.board[i]];
//     }
//   }
//   return result;
// }

// function calculateMoves() {
//   allMoves = [];
//   jumpExists = false;
//   for (var i = 0; i < gameState.board.length; i++) {
//     console.log(gameState.turn, gameState.board[i].isKing)
//     if (
//       (gameState.turn == "red" && gameState.board[i].color == "red" ) ||
//       (gameState.board[i].isKing  && gameState.turn == gameState.board[i].color)
//     ){
//       calculateDiagonals(i, gameState.board[i], 1, 1);
//       calculateDiagonals(i, gameState.board[i], -1, 1);
//     }
//     if (
//       (gameState.turn == "black" && gameState.board[i].color == "black")  ||
//       (gameState.board[i].isKing  && gameState.turn == gameState.board[i].color)
//     ){
//       calculateDiagonals(i, gameState.board[i], -1, -1);
//       calculateDiagonals(i, gameState.board[i], 1, -1);
//     }
//   }
//
//   if (selected.piece) {
//     let tempArray = [];
//     for (var j = 0; j < allMoves.length; j++) {
//       if (selected.index == allMoves[j].index) {tempArray.push(allMoves[j]);}
//     }
//     allMoves = tempArray;
//   }
//
//   if (jumpExists) {
//     let tempArray = [];
//     for (var j = 0; j < allMoves.length; j++) {
//       if (allMoves[j].jump) {tempArray.push(allMoves[j]);}
//     }
//     allMoves = tempArray;
//   }
//
//   console.log(allMoves);
// }

// function calculateDiagonals(pcIndex, pc, xdirection, ydirection) {
//     let x = pc.x + xdirection;
//     if (x < 0 || x > 7 ) {return;}
//     let y = pc.y + ydirection;
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
