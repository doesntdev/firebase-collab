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
}

function _submitMoveRemote( sel, i, j ) {
  alert(" submitting remote move");
}
