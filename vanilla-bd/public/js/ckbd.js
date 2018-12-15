/*  Plain vainilla JS checker Board
 *
 *  Needs a canvas with an id="board"  */

// init function to be called by parent in onload
function boardInit() {
  _draw();
  let elemLeft = document.getElementById('board').offsetLeft;
  let elemTop = document.getElementById('board').offsetTop;
  document.getElementById('board').addEventListener('click', e => {
    let x = Math.floor((e.pageX - elemLeft) / 63);
    let y = Math.floor((e.pageY - elemTop) / 63);

    //search for a piece on (x, y)
    let pcObj = {};
    for (var i = 0; i < piecesArray.length; i++) {
      if (piecesArray[i].x == x  && piecesArray[i].y == y) {
        pcObj = piecesArray[i];
      }
    }

    // dispatch event
    let bdClickEvent = new CustomEvent( 'bdclickevent', {
      bubbles: true,
      detail: {
        x: x,
        y: y,
        pcs: pcObj
      }
    });
    document.dispatchEvent(bdClickEvent);
  });
}

/*********************************
* modifies properties of a piece in the
* piecesArray
* @param pc zero based indiex of piece
* @param Obj Object containing key value pairs
*********************************/
function setPc (pc, Obj) {
  if (pc >= 0 && pc <= 23) {
    let pcState = piecesArray[pc];
    for (var prop in Obj) {
      if (piecesArray[pc].hasOwnProperty(prop)) {
        piecesArray[pc][prop] = Obj[prop];
      } else {
        console.log("this sucks")
      }
    }
  } else {
    console.log("WTF, piece is out of range")
  }
  _draw();
}

let piecesArray = [
  { isAlive: true, x: 0, y: 0, color: "red", isKing: false },
  { isAlive: true, x: 2, y: 0, color: "red", isKing: false },
  { isAlive: true, x: 4, y: 0, color: "red", isKing: false },
  { isAlive: true, x: 6, y: 0, color: "red", isKing: false },
  { isAlive: true, x: 1, y: 1, color: "red", isKing: false },
  { isAlive: true, x: 3, y: 1, color: "red", isKing: false },
  { isAlive: true, x: 5, y: 1, color: "red", isKing: false },
  { isAlive: true, x: 7, y: 1, color: "red", isKing: false },
  { isAlive: true, x: 0, y: 2, color: "red", isKing: false },
  { isAlive: true, x: 2, y: 2, color: "red", isKing: false },
  { isAlive: true, x: 4, y: 2, color: "red", isKing: false },
  { isAlive: true, x: 6, y: 2, color: "red", isKing: false },
  { isAlive: true, x: 1, y: 5, color: "black", isKing: false },
  { isAlive: true, x: 3, y: 5, color: "black", isKing: false },
  { isAlive: true, x: 5, y: 5, color: "black", isKing: false },
  { isAlive: true, x: 7, y: 5, color: "black", isKing: false },
  { isAlive: true, x: 0, y: 6, color: "black", isKing: false },
  { isAlive: true, x: 2, y: 6, color: "black", isKing: false },
  { isAlive: true, x: 4, y: 6, color: "black", isKing: false },
  { isAlive: true, x: 6, y: 6, color: "black", isKing: false },
  { isAlive: true, x: 1, y: 7, color: "black", isKing: false },
  { isAlive: true, x: 3, y: 7, color: "black", isKing: false },
  { isAlive: true, x: 5, y: 7, color: "black", isKing: false },
  { isAlive: true, x: 7, y: 7, color: "black", isKing: false },
];

function _draw() {
  // draw the board
  let c = document.getElementById('board');
  let ctx = c.getContext("2d");
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i % 2 == j % 2) {ctx.fillStyle = "grey";}
      else {ctx.fillStyle = "white";  }
      ctx.fillRect(63 * i, 63 * j, 63, 63)
    }
  }

  // draw the pieces
  for (var i = 0; i < piecesArray.length; i++) {
    let pcs = piecesArray[i];
    if (pcs.isAlive) {
      if (pcs.isSelected) {
        ctx.fillStyle = "green";
        ctx.fillRect(63 * pcs.x, 63 * pcs.y, 63, 63)
      }
      let xcorr = pcs.x * 63 + 32;
      let ycorr = pcs.y * 63 + 32;
      ctx.beginPath();
      ctx.arc(xcorr, ycorr, 25, 0, 2 * Math.PI);
      ctx.stroke();
      // console.log(pcs);
      pcs.color == "red" ? ctx.fillStyle = "red" : ctx.fillStyle = "black";
      ctx.fill()
      if (pcs.isKing) {
        ctx.beginPath();
        ctx.arc(xcorr, ycorr, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "yellow";
        ctx.fill()
      }
    }
  }
}
