let userName = "Patrick";
let isTestKing = false;

document.addEventListener("DOMContentLoaded", event => {
  boardInit();
  document.addEventListener('bdclickevent', e => {
    alert("yoho - x = " + e.detail.x);
  });
  // const app = firebase.app(); //load up all firebase apps
  // const database = app.database(); //load up only database from app
  //
  // let ref = database.ref('moves');
  // ref.on('value', getMoves, errMoves);

});

// function getMoves(move) {
//   //console.log(move.val());
//   let moves = move.val();
//   let keys = Object.keys(moves);
//   console.log(keys);
//   for (var i = 0; i < keys.length; i++) {
//     let k = keys[i];
//     let userName = moves[k].name;
//     let x = moves[k].x;
//     let y = moves[k].y;
//     let isKing = moves[k].isTestKing;
//     console.log("name:", userName, "x:", x, "y:", y, "isKing:", isTestKing);
//   }
// }
//
// function errMoves(err) {
//   console.log("Error!", err);
// }
//
// let selected = null;
//
// let piecesArray = [
//   { x: 0, y: 0, color: "red", isKing: false },
//   { x: 2, y: 0, color: "red", isKing: false },
//   { x: 4, y: 0, color: "red", isKing: false },
//   { x: 6, y: 0, color: "red", isKing: false },
//   { x: 1, y: 1, color: "red", isKing: false },
//   { x: 3, y: 1, color: "red", isKing: false },
//   { x: 5, y: 1, color: "red", isKing: false },
//   { x: 7, y: 1, color: "red", isKing: false },
//   { x: 0, y: 2, color: "red", isKing: false },
//   { x: 2, y: 2, color: "red", isKing: false },
//   { x: 4, y: 2, color: "red", isKing: false },
//   { x: 6, y: 2, color: "red", isKing: false },
//   { x: 1, y: 5, color: "black", isKing: false },
//   { x: 3, y: 5, color: "black", isKing: false },
//   { x: 5, y: 5, color: "black", isKing: false },
//   { x: 7, y: 5, color: "black", isKing: false },
//   { x: 0, y: 6, color: "black", isKing: false },
//   { x: 2, y: 6, color: "black", isKing: false },
//   { x: 4, y: 6, color: "black", isKing: false },
//   { x: 6, y: 6, color: "black", isKing: false },
//   { x: 1, y: 7, color: "black", isKing: false },
//   { x: 3, y: 7, color: "black", isKing: false },
//   { x: 5, y: 7, color: "black", isKing: false },
//   { x: 7, y: 7, color: "black", isKing: false },
// ];
//
//
// //es6
// function load() {
//   console.log("load event detected!");
//   let elemLeft = document.getElementById('board').offsetLeft;
//   let elemTop = document.getElementById('board').offsetTop;
//   document.getElementById('board').addEventListener('click', e => {
//     let x = Math.floor((e.pageX - elemLeft) / 63);
//     let y = Math.floor((e.pageY - elemTop) / 63);
//     //alert("just clicked in square " + x + ", " + y + "!");
//     console.log("clicked", x, y);
//
//     let item = document.createElement("li"); // Create a <li> node
//     var textnode = document.createTextNode("x:" + x + " y:" + y); // Create a text node
//     item.appendChild(textnode); // Append the text to <li>
//
//     document.getElementById("movesLog").appendChild(item); // Append <li> to <ul> with id="movesLog"
//     saveMove(userName, x, y, isTestKing);
//   });
//   draw();
// }
// window.onload = load;
//
// function saveMove(userName, x, y, isTestKing) {
//   const app = firebase.app(); //load up all firebase apps
//   const database = app.database(); //load up only database from app
//   let ref = database.ref('moves');
//
//   let move = {
//     name: userName,
//     x: x,
//     y: y,
//     isKing: isTestKing
//   }
//
//   ref.push(move);
// }
