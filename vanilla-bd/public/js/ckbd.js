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

// /*********************************
// * modifies properties of a piece in the
// * pcs
// * @param pc zero based indiex of piece
// * @param Obj Object containing key value pairs
// *********************************/
// function setPc (pc, Obj) {
//   if (pc >= 0 && pc <= 23) {
//     let pcState = pcs[pc];
//     for (var prop in Obj) {
//       if (pcs[pc].hasOwnProperty(prop)) {
//         pcs[pc][prop] = Obj[prop];
//       } else {
//         console.log("this sucks")
//       }
//     }
//   } else {
//     console.log("WTF, piece is out of range")
//   }
//   draw();
// }



function draw(pcs, sel) {
  // draw the board
  let c = document.getElementById('board');
  let ctx = c.getContext("2d");
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i % 2 == j % 2) {ctx.fillStyle = "grey";}
      else {ctx.fillStyle = "white";  }
      if (sel && i == sel.x && j == sel.y) {ctx.fillStyle = "green";}
      ctx.fillRect(63 * i, 63 * j, 63, 63)
    }
  }

  // draw the pieces
  for (var i = 0; i < pcs.length; i++) {
    let pc = pcs[i];
    let xcorr = pc.x * 63 + 32;
    let ycorr = pc.y * 63 + 32;
    ctx.beginPath();
    ctx.arc(xcorr, ycorr, 25, 0, 2 * Math.PI);
    ctx.stroke();
    pc.color == "red" ? ctx.fillStyle = "red" : ctx.fillStyle = "black";
    ctx.fill()
    if (pc.isKing) {
      ctx.beginPath();
      ctx.arc(xcorr, ycorr, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "yellow";
      ctx.fill()
    }

  }
}
