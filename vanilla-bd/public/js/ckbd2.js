/*  Plain vainilla JS checker Board
 *
 *  Needs a canvas with an id="board"  */

// init function to be called by parent in onload
function boardInit() {
  let elemLeft = document.getElementById('board').offsetLeft;
  let elemTop = document.getElementById('board').offsetTop;
  document.getElementById('board').addEventListener('click', e => {
    let x = Math.floor((e.pageX - elemLeft) / 63);
    let y = Math.floor((e.pageY - elemTop) / 63);

    // dispatch event
    let bdClickEvent = new CustomEvent( 'bdclickevent', {
      bubbles: true,
      detail: {
        x: x,
        y: y
      }
    });
    document.dispatchEvent(bdClickEvent);
  });
}

function draw(board, sel, allMvs) {
  // draw the board
  let c = document.getElementById('board');
  let ctx = c.getContext("2d");
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i % 2 == j % 2) {ctx.fillStyle = "white";}
      else {ctx.fillStyle = "grey";  }
      if (sel.piece && i == sel.piece.x && j == sel.piece.y) {ctx.fillStyle = "green";}
      ctx.fillRect(63 * i, 63 * j, 63, 63)
    }
  }

  // draw the pieces
  for (var i = 0; i < 8; i++) {
    for (var k = 0; k < 8; k++) {
      let color = board[i][k].color;
      let isKing = board[i][k].isKing;
      if (isKing && color == "r") {_drawKing("red", i, k, ctx);}
      if (isKing && color == "b") {_drawKing("black", i, k, ctx);}
      if (!isKing && color == "r") {_drawPiece("red", i, k, ctx);}
      if (!isKing && color == "b") {_drawPiece("black", i, k, ctx);}
    }
  }

  // draw possible moves
  for (var i = 0; i < allMvs.length; i++) {
    let pc = allMvs[i];
    let xcorr = pc.x * 63 + 32;
    let ycorr = pc.y * 63 + 32;
    ctx.beginPath();
    ctx.arc(xcorr, ycorr, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill()
  }
}

function _drawPiece( color, x, y, ctx ) {
  let xcorr = x * 63 + 32;
  let ycorr = y * 63 + 32;
  ctx.beginPath();
  ctx.arc(xcorr, ycorr, 25, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill()
}

function _drawKing( color, x, y, ctx ) {
  let xcorr = x * 63 + 32;
  let ycorr = y * 63 + 32;
  ctx.beginPath();
  ctx.arc(xcorr, ycorr, 25, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill()
  ctx.beginPath();
  ctx.arc(xcorr, ycorr, 10, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "yellow";
  ctx.fill()
}
