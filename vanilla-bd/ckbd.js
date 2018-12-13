/*  Plain vainilla JS checker Board
*
*  Needs a canvas with an id="board"  */
console.log("WTF")
let selected = null;

let piecesArray = [
  {x: 0, y: 0, color: "red", isKing: false},
  {x: 2, y: 0, color: "red", isKing: false},
  {x: 4, y: 0, color: "red", isKing: false},
  {x: 6, y: 0, color: "red", isKing: false},
  {x: 1, y: 1, color: "red", isKing: false},
  {x: 3, y: 1, color: "red", isKing: false},
  {x: 5, y: 1, color: "red", isKing: false},
  {x: 7, y: 1, color: "red", isKing: false},
  {x: 0, y: 2, color: "red", isKing: false},
  {x: 2, y: 2, color: "red", isKing: false},
  {x: 4, y: 2, color: "red", isKing: false},
  {x: 6, y: 2, color: "red", isKing: false},
  {x: 1, y: 5, color: "black", isKing: false},
  {x: 3, y: 5, color: "black", isKing: false},
  {x: 5, y: 5, color: "black", isKing: false},
  {x: 7, y: 5, color: "black", isKing: false},
  {x: 0, y: 6, color: "black", isKing: false},
  {x: 2, y: 6, color: "black", isKing: false},
  {x: 4, y: 6, color: "black", isKing: false},
  {x: 6, y: 6, color: "black", isKing: false},
  {x: 1, y: 7, color: "black", isKing: false},
  {x: 3, y: 7, color: "black", isKing: false},
  {x: 5, y: 7, color: "black", isKing: false},
  {x: 7, y: 7, color: "black", isKing: false},
];

function draw() {
  // draw the board
  let c = document.getElementById('board');
  let ctx = c.getContext("2d");
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      if (i%2 == j%2) {
      // if (i%2) {
        ctx.fillStyle = "grey";
        ctx.fillRect(63*i, 63*j, 63, 63)
      } else {
        ctx.fillStyle = "white";
        ctx.fillRect(63*i, 63*j, 63, 63)
      }
    }
  }

  // draw selected box
  if (selected) {
    ctx.fillStyle = "green";
    ctx.fillRect(63 * selected.x, 63 * selected.y, 63, 63)
  }
  // draw the pieces
  for (var i = 0; i < piecesArray.length; i++) {
    let pcs = piecesArray[i];
    let xcorr = pcs.x * 63 + 32;
    let ycorr = pcs.y * 63 + 32;
    ctx.beginPath();
    ctx.arc(xcorr,ycorr,25,0,2*Math.PI);
    ctx.stroke();
    // console.log(pcs);
    pcs.color == "red" ?  ctx.fillStyle = "red": ctx.fillStyle = "black";
    ctx.fill()
    if (pcs.isKing) {
      ctx.beginPath();
      ctx.arc(xcorr,ycorr,10,0,2*Math.PI);
      ctx.stroke();
      ctx.fillStyle = "yellow";
      ctx.fill()
    }
  }
  // console.log(this.diagonals);
  // console.log(this.piecesArray);

}

//es6
function load() {
  console.log("load event detected!");
  let elemLeft = document.getElementById('board').offsetLeft;
  let elemTop = document.getElementById('board').offsetTop;
  document.getElementById('board').addEventListener('click', e => {
    let x = Math.floor((e.pageX - elemLeft) / 63);
    let y = Math.floor((e.pageY - elemTop) / 63);
    alert("just clicked in square " + x + ", " + y + "!");
  });
  draw();
}
window.onload = load;
