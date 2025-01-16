// MOVE SOUND - "./sounds/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_001_111185_xNoise.mp3"
// WIN SOUND - "./sounds/zapsplat_science_fiction_anime_digital_swell_112228_oNoise.mp3"

// let board = [
//     [" ", " ", " "],
//     [" ", " ", " "],
//     [" ", " ", " "]
// ];
// let currentPlayer = "X";
// let gameOver = false;
// let winner = ""; // Tracks the winner of the game
// let gameMode = ""; // "two-player" or "ai"

// // Sound effects
// const moveSound = new Audio("./sounds/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_001_111185_xNoise.mp3"); // Play when a player makes a move
// const winSound = new Audio("./sounds/zapsplat_science_fiction_anime_digital_swell_112228_oNoise.mp3");  // Play when there's a winner

// // Initialize event listeners
// window.onload = function () {
//     document.getElementById("two-player").addEventListener("click", () => startGame("two-player"));
//     document.getElementById("ai-mode").addEventListener("click", () => startGame("ai"));
//     document.getElementById("restart").addEventListener("click", restartGame);
// };

// function startGame(mode) {
//     gameMode = mode;
//     document.getElementById("mode-selection").style.display = "none";
//     document.getElementById("board-container").style.display = "block";
//     document.getElementById("restart").style.display = "block";
//     setGame();
// }

// function setGame() {
//     board = [
//         [" ", " ", " "],
//         [" ", " ", " "],
//         [" ", " ", " "]
//     ];
//     document.getElementById("board").innerHTML = "";
//     gameOver = false;
//     winner = ""; // Reset winner
//     currentPlayer = "X";

//     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn

//     for (let r = 0; r < 3; r++) {
//         for (let c = 0; c < 3; c++) {
//             let tile = document.createElement("div");
//             tile.id = `${r}-${c}`;
//             tile.classList.add("tile");
//             tile.addEventListener("click", setTile);
//             document.getElementById("board").appendChild(tile);
//         }
//     }
// }

// // function setTile() {
// //     if (gameOver) return;

// //     let coords = this.id.split("-");
// //     let r = parseInt(coords[0]);
// //     let c = parseInt(coords[1]);

// //     if (board[r][c] !== " ") return;

// //     board[r][c] = currentPlayer;
// //     this.innerText = currentPlayer;
// //     this.classList.add("taken");
// //     moveSound.play(); // Play move sound

// //     checkWinner();

// //     if (gameMode === "ai" && !gameOver) {
// //         currentPlayer = currentPlayer === "X" ? "O" : "X";
// //         setTimeout(() => {
// //             aiMove(); // Add delay for AI's move
// //         }, 500); // 500ms delay
// //     }

// //     if (!gameOver && gameMode === "two-player") {
// //         currentPlayer = currentPlayer === "X" ? "O" : "X";
// //     }

// //     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
// // }

// function setTile() {
//     if (gameOver) return;

//     let coords = this.id.split("-");
//     let r = parseInt(coords[0]);
//     let c = parseInt(coords[1]);

//     if (board[r][c] !== " ") return;

//     board[r][c] = currentPlayer;
//     this.innerText = currentPlayer;
//     this.classList.add("taken");
//     moveSound.play(); // Play move sound

//     // Delay the winner check
//     setTimeout(() => {
//         checkWinner();

//         if (gameMode === "ai" && !gameOver) {
//             currentPlayer = currentPlayer === "X" ? "O" : "X";
//             setTimeout(() => {
//                 aiMove(); // Add delay for AI's move
//             }, 500); // 500ms delay
//         }

//         if (!gameOver && gameMode === "two-player") {
//             currentPlayer = currentPlayer === "X" ? "O" : "X";
//         }

//         document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
//     }, 300); // 300ms delay for allowing last move
// }

// function aiMove() {
//     let bestMove = getBestMove();
//     board[bestMove.row][bestMove.col] = currentPlayer;

//     let aiTile = document.getElementById(`${bestMove.row}-${bestMove.col}`);
//     aiTile.innerText = currentPlayer;
//     aiTile.classList.add("taken");
//     moveSound.play(); // Play AI move sound

//     checkWinner();

//     if (!gameOver) {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//     }

//     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
// }

// function getBestMove() {
//     let bestScore = -Infinity;
//     let move = { row: -1, col: -1 };

//     for (let r = 0; r < 3; r++) {
//         for (let c = 0; c < 3; c++) {
//             if (board[r][c] === " ") {
//                 board[r][c] = currentPlayer; // Make the move
//                 let score = minimax(board, 0, false); // Evaluate move
//                 board[r][c] = " "; // Undo the move

//                 if (score > bestScore) {
//                     bestScore = score;
//                     move = { row: r, col: c };
//                 }
//             }
//         }
//     }
//     return move;
// }

// function minimax(board, depth, isMaximizing) {
//     let result = checkWinnerForMinimax();
//     if (result !== null) {
//         if (result === "X") return -10 + depth; // Minimize depth for faster win
//         else if (result === "O") return 10 - depth; // Prefer faster wins
//         else return 0; // Draw
//     }

//     if (isMaximizing) {
//         let bestScore = -Infinity;
//         for (let r = 0; r < 3; r++) {
//             for (let c = 0; c < 3; c++) {
//                 if (board[r][c] === " ") {
//                     board[r][c] = "O"; // AI is "O"
//                     let score = minimax(board, depth + 1, false);
//                     board[r][c] = " "; // Undo the move
//                     bestScore = Math.max(score, bestScore);
//                 }
//             }
//         }
//         return bestScore;
//     } else {
//         let bestScore = Infinity;
//         for (let r = 0; r < 3; r++) {
//             for (let c = 0; c < 3; c++) {
//                 if (board[r][c] === " ") {
//                     board[r][c] = "X"; // Opponent is "X"
//                     let score = minimax(board, depth + 1, true);
//                     board[r][c] = " "; // Undo the move
//                     bestScore = Math.min(score, bestScore);
//                 }
//             }
//         }
//         return bestScore;
//     }
// }

// function checkWinner() {
//     let winningCombinations = [
//         [[0, 0], [0, 1], [0, 2]],
//         [[1, 0], [1, 1], [1, 2]],
//         [[2, 0], [2, 1], [2, 2]],
//         [[0, 0], [1, 0], [2, 0]],
//         [[0, 1], [1, 1], [2, 1]],
//         [[0, 2], [1, 2], [2, 0]],
//         [[0, 0], [1, 1], [2, 2]],
//         [[0, 2], [1, 1], [2, 0]]
//     ];

//     for (let combo of winningCombinations) {
//         let [a, b, c] = combo;
//         if (
//             board[a[0]][a[1]] !== " " &&
//             board[a[0]][a[1]] === board[b[0]][b[1]] &&
//             board[a[0]][a[1]] === board[c[0]][c[1]]
//         ) {
//             gameOver = true;
//             winner = currentPlayer;
//             winSound.play(); // Play win sound
//             displayWinner();
//             return;
//         }
//     }

//     if (board.flat().every(cell => cell !== " ")) {
//         gameOver = true;
//         displayDraw();
//     }
// }

// function checkWinnerForMinimax() {
//     let winningCombinations = [
//         [[0, 0], [0, 1], [0, 2]],
//         [[1, 0], [1, 1], [1, 2]],
//         [[2, 0], [2, 1], [2, 2]],
//         [[0, 0], [1, 0], [2, 0]],
//         [[0, 1], [1, 1], [2, 1]],
//         [[0, 2], [1, 2], [2, 0]],
//         [[0, 0], [1, 1], [2, 2]],
//         [[0, 2], [1, 1], [2, 0]]
//     ];

//     for (let combo of winningCombinations) {
//         let [a, b, c] = combo;
//         if (
//             board[a[0]][a[1]] !== " " &&
//             board[a[0]][a[1]] === board[b[0]][b[1]] &&
//             board[a[0]][a[1]] === board[c[0]][c[1]]
//         ) {
//             return board[a[0]][a[1]]; // Return winner
//         }
//     }

//     if (board.flat().every(cell => cell !== " ")) {
//         return "draw"; // Return draw if board is full
//     }

//     return null; // Game is not over
// }

// function displayWinner() {
//     let winnerMessage = `Player ${winner} wins!`;
//     document.getElementsByTagName("h1")[0].innerText = winnerMessage;
// }


// function displayDraw() {
//     document.getElementsByTagName("h1")[0].innerText = "It's a draw!";
// }

// function restartGame() {
//     document.getElementById("mode-selection").style.display = "block";
//     document.getElementById("board-container").style.display = "none";
//     document.getElementById("restart").style.display = "none";
// }


























let board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
];
let currentPlayer = "X";
let gameOver = false;
let winner = ""; // Tracks the winner of the game
let gameMode = ""; // "two-player" or "ai"

// Sound effects
const moveSound = new Audio("./sounds/zapsplat_cartoon_swoosh_swipe_whoosh_snatch_001_111185_xNoise.mp3"); // Play when a player makes a move
const winSound = new Audio("./sounds/zapsplat_science_fiction_anime_digital_swell_112228_oNoise.mp3");  // Play when there's a winner

// Initialize event listeners
window.onload = function () {
    document.getElementById("two-player").addEventListener("click", () => startGame("two-player"));
    document.getElementById("ai-mode").addEventListener("click", () => startGame("ai"));
    document.getElementById("restart").addEventListener("click", restartGame);
};

function startGame(mode) {
    gameMode = mode;
    document.getElementById("mode-selection").style.display = "none";
    document.getElementById("board-container").style.display = "block";
    document.getElementById("restart").style.display = "block";
    document.getElementsByTagName("h1")[0].innerText = "Tic Tac Toe"; // Reset title at game start
    setGame();
}

// function setGame() {
//     board = [
//         [" ", " ", " "],
//         [" ", " ", " "],
//         [" ", " ", " "]
//     ];
//     document.getElementById("board").innerHTML = "";
//     gameOver = false;
//     winner = ""; // Reset winner
//     currentPlayer = "X";

//     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn

//     for (let r = 0; r < 3; r++) {
//         for (let c = 0; c < 3; c++) {
//             let tile = document.createElement("div");
//             tile.id = `${r}-${c}`;
//             tile.classList.add("tile");
//             tile.addEventListener("click", setTile);
//             document.getElementById("board").appendChild(tile);
//         }
//     }
// }


function setGame() {
    board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];
    document.getElementById("board").innerHTML = "";
    gameOver = false;
    winner = "";
    currentPlayer = "X";

    // Set initial game state message
    document.getElementsByTagName("h1")[0].innerText = gameMode === "ai" ? 
        "Player vs AI" : "Player X's turn";

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}



// function setTile() {
//     if (gameOver) return;

//     let coords = this.id.split("-");
//     let r = parseInt(coords[0]);
//     let c = parseInt(coords[1]);

//     if (board[r][c] !== " ") return;

//     board[r][c] = currentPlayer;
//     this.innerText = currentPlayer;
//     this.classList.add("taken");
//     moveSound.play(); // Play move sound

//     checkWinner();

//     if (gameMode === "ai" && !gameOver) {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//         setTimeout(() => {
//             aiMove(); // Add delay for AI's move
//         }, 500); // 500ms delay
//     }

//     if (!gameOver && gameMode === "two-player") {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//     }

//     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
// }

// function setTile() {
//     if (gameOver) return;

//     let coords = this.id.split("-");
//     let r = parseInt(coords[0]);
//     let c = parseInt(coords[1]);

//     if (board[r][c] !== " ") return;

//     board[r][c] = currentPlayer;
//     this.innerText = currentPlayer;
//     this.classList.add("taken");
//     moveSound.play(); // Play move sound

//     // Delay the winner check
//     setTimeout(() => {
//         checkWinner();

//         if (gameMode === "ai" && !gameOver) {
//             currentPlayer = currentPlayer === "X" ? "O" : "X";
//             setTimeout(() => {
//                 aiMove(); // Add delay for AI's move
//             }, 500); // 500ms delay
//         }

//         if (!gameOver && gameMode === "two-player") {
//             currentPlayer = currentPlayer === "X" ? "O" : "X";
//         }

//         document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
//     }, 300); // 300ms delay for allowing last move
// }


function setTile() {
    if (gameOver) return;

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] !== " ") return;

    board[r][c] = currentPlayer;
    this.innerText = currentPlayer;
    this.classList.add("taken");
    moveSound.play();

    // Remove the setTimeout around checkWinner
    checkWinner();

    // Only update the current player and title if the game isn't over
    if (!gameOver) {
        if (gameMode === "ai") {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            setTimeout(() => {
                aiMove();
            }, 500);
        } else if (gameMode === "two-player") {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}



// function aiMove() {
//     let bestMove = getBestMove();
//     board[bestMove.row][bestMove.col] = currentPlayer;

//     let aiTile = document.getElementById(`${bestMove.row}-${bestMove.col}`);
//     aiTile.innerText = currentPlayer;
//     aiTile.classList.add("taken");
//     moveSound.play(); // Play AI move sound

//     checkWinner();

//     if (!gameOver) {
//         currentPlayer = currentPlayer === "X" ? "O" : "X";
//     }

//     document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`; // Update title to show current player's turn
// }


function aiMove() {
    if (gameOver) return;  // Add this check
    
    let bestMove = getBestMove();
    board[bestMove.row][bestMove.col] = currentPlayer;

    let aiTile = document.getElementById(`${bestMove.row}-${bestMove.col}`);
    aiTile.innerText = currentPlayer;
    aiTile.classList.add("taken");
    moveSound.play();

    checkWinner();

    // Only update current player and title if game isn't over
    if (!gameOver) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementsByTagName("h1")[0].innerText = `Player ${currentPlayer}'s turn`;
    }
}





function getBestMove() {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 };

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r][c] === " ") {
                board[r][c] = currentPlayer; // Make the move
                let score = minimax(board, 0, false); // Evaluate move
                board[r][c] = " "; // Undo the move

                if (score > bestScore) {
                    bestScore = score;
                    move = { row: r, col: c };
                }
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) {
    let result = checkWinnerForMinimax();
    if (result !== null) {
        if (result === "X") return -10 + depth; // Minimize depth for faster win
        else if (result === "O") return 10 - depth; // Prefer faster wins
        else return 0; // Draw
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === " ") {
                    board[r][c] = "O"; // AI is "O"
                    let score = minimax(board, depth + 1, false);
                    board[r][c] = " "; // Undo the move
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (board[r][c] === " ") {
                    board[r][c] = "X"; // Opponent is "X"
                    let score = minimax(board, depth + 1, true);
                    board[r][c] = " "; // Undo the move
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

function checkWinner() {
    let winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]], // Fixed diagonal win condition
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (
            board[a[0]][a[1]] !== " " &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]
        ) {
            gameOver = true;
            winner = board[a[0]][a[1]]; // Set winner to the actual winning symbol
            winSound.play();
            displayWinner();
            return;
        }
    }

    if (board.flat().every(cell => cell !== " ")) {
        gameOver = true;
        winner = "draw";
        displayDraw();
    }
}

function checkWinnerForMinimax() {
    let winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 0]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (
            board[a[0]][a[1]] !== " " &&
            board[a[0]][a[1]] === board[b[0]][b[1]] &&
            board[a[0]][a[1]] === board[c[0]][c[1]]
        ) {
            return board[a[0]][a[1]]; // Return winner
        }
    }

    if (board.flat().every(cell => cell !== " ")) {
        return "draw"; // Return draw if board is full
    }

    return null; // Game is not over
}

// function displayWinner() {
//     let winnerMessage = `Player ${winner} wins!`;
//     document.getElementsByTagName("h1")[0].innerText = winnerMessage;
// }

function displayWinner() {
    console.log("displayWinner function called");
    console.log("Current winner:", winner);
    console.log("Current gameMode:", gameMode);
    
    let winnerMessage;
    
    if (gameMode === "ai") {
        if (winner === "X") {
            winnerMessage = "Winner of the game is Player";
        } else {
            winnerMessage = "Winner of the game is AI";
        }
    } else {
        winnerMessage = `Winner of the game is ${winner}`;
    }
    
    console.log("Winner message:", winnerMessage);
    
    // Try a more specific way to update the h1
    const titleElement = document.querySelector("h1");
    console.log("Found h1 element:", titleElement); // Debug log
    
    if (titleElement) {
        titleElement.textContent = winnerMessage;
        console.log("Updated h1 text to:", winnerMessage);
    } else {
        console.log("Could not find h1 element!");
    }
}


// function displayDraw() {
//     document.getElementsByTagName("h1")[0].innerText = "It's a draw!";
// }

function displayDraw() {
    document.getElementsByTagName("h1")[0].innerText = "Game is a Draw!";
}

function restartGame() {
    document.getElementById("mode-selection").style.display = "block";
    document.getElementById("board-container").style.display = "none";
    document.getElementById("restart").style.display = "none";
    document.getElementsByTagName("h1")[0].innerText = "Tic Tac Toe"; // Reset title when restarting
}
