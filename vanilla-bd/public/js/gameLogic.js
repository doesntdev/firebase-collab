let user = {uid: "A"};
let match = {};
let localPlay = true;
let yourColor = "r";
let selected = null;
let allMoves = [];
let msg = "";
let lastMove = null;


document.addEventListener("DOMContentLoaded", event => {
  initBoard(63);
  console.log("before initMatch")
  match = initMatch( "r","A", "A" );
  console.log("after initMatch")
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
    if (code == 'B') {code = 'b'}
    if (code == 'R') {code = 'r'}
    if (code == match.turn.color ) {
      if (selected == index) {
        selected = null;
      } else {
        selected = index;
      }
      allMoves = getPosSpaces(match)
      setBoard(match.boardState, selected, allMoves);
    } else {
      console.log("not selected.piece or wrong color ");
      return;
    }
  } else {
    if ( selected ) {
      let rslt = doMove(match, selected, index);
      match = rslt.newMatchState;
      lastMove = rslt.lastMove;
      msg = rslt.msg;
      selected = null;
      allMoves = getPosSpaces(match)
      setBoard(match.boardState, selected, allMoves);
      console.log(msg);
    } else {
      console.log("empty space, no selected piece");
    }
  }
}

function _submitMoveRemote( sel, i, j ) {
  alert(" submitting remote move");
}
