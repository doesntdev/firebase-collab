# performant checker boards

The state of the board is modeled as a String of 32 characters, "e" || "r" || "R" || "b" || "B".  
Essentially an 8 x 4 array of empty, red, redKing, black, blackKing.
The method of display is left to the implementations as long as they implement the interface.

## constructor

* will build all needed DOM elements and append to a <div id="checkerboard> 

* will add a listener for "bdclickevent"  tevent o the document
  with detail: { index: [0..31], state: ["e" || "r" || "R" || "b" || "B] }

## methods

* initBoard( boardState: String.length == 32 ) => 
  replaces currently displayed pieces gameState with the new one

* setSpace( index: 0..31, pc: ["e" || "r" || "R" || "b" || "B"] )

## Example

    initBoard("rrrrrrrrrrrreeeeeeeebbbbbbbbbbbb"); 
    setSpace(8, "e");
    setSpace(12, "r");
