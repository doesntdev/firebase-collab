let ref = firebase.database().ref("/games");

function createGame() {
    var user = firebase.auth().currentUser;
    var currentGame = {
        creator: {uid: user.uid, displayName: user.displayName},
        state: STATE.OPEN
    };

    ref.push().set(currentGame);
}

function joinGame(key) {
    var user = firebase.auth().currentUser;
    var gameRef = ref.child(key);
    gameRef.transaction(function(game) {
        if(!game.joiner) {
            game.state = STATE.JOINED;
            game.joiner = {uid: user.id, displayName: user.displayName};
        }
        return game;
    });
}

function watchGame(key) {
    var gameRef = ref.child(key);
    //firebase "value" is whevever change is detected
    gameRef.on("value", function(snapshot) {
        var game = snapshot.val();
        switch (game.state) {
            case STATE.JOINED: joinedGame(gameRef, game);
            break;

            case STATE.PLAYING: performMove(gameRef, game);
            break;

            case STATE.COMPLETE: showWinner(game);
            break;
        }
    });
}

function makeCanvas(gameRef, game) {
    var canvas = document.createElement("canvas");
    canvas.width = 560;
    canvas.height = 560;
    var context = canvas.getContext('2d');
    var board = document.querySelector("#board");
    context.drawImage(board, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(function uploadPic(blob) {
        //store the blob somewhere
    });
}

function uploadPic(blob) {
    var imageRef = firebase.storage().ref().child("games/", + key + "/" +
                    firebase.auth().currentUser.uid + ".png");
    
    var uploadTask = imageRef.put(blob);
    uploadTask.on("state_changed",
            function(snapshot) {},
            function(error) {},
            function() {
                var uploadRef = uploadTask.snapshot.ref;
                var gcsPath = "gs://" + uploadRef.bucket + "/" + uploadRef.fullPath;
                addImageToGame(gameRef, game, gcsPath,
                                uploadTask.snapshot.downloadURL);
            });
}

function addImageToGame(gameRef, game, gcsPath, downloadURL) {
    var data = {state: STATE.UPLOADED_PICTURE};

    if(game.creator.uid == firebase.auth().currentUser.uid) {
        data["creator/gcsPath"] = gcsPath;
        data["creator/downloadURL"] = downloadURL;
    }
    else {
        data["joiner/gcsPath"] = gcsPath;
        data["joner/downloadURL"] = downloadURL;
    }

    gameRef.update(data);
}

function updateGameState() {
    gameRef.update({
        state: STATE.COMPLETE,
        "creator/wins": creatorWins,
        "joiner/wins": joinerWins
    });
}
