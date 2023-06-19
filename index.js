const statut = document.querySelector("h2");
let gameIsActive = true;
let activePlayer = Math.random() < 0.5 ? "X" : "O";
console.log(activePlayer);
let gameStatus = ["", "", "", "", "", "", "", "", ""];
let score = [0, 0]

// Condition de victoire sous forme de tableau avec les différentes possibilités
const winsCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages d'informations pour l'utilisateur (victoire egalité et "a qui le tour")
const win = () => `Player ${activePlayer} win this game ! `;
const equality = () => "No one win. Restart the game !";
const playerTurn = () => `${activePlayer} it's your turn !`;

statut.innerHTML = playerTurn();

document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", clickedCase));

// Récupere l'id du bouton pour pourvoir restart la game
document.getElementById("restart").addEventListener("click", restart);


// Vérification de la case cliquée
function clickedCase() {
    // Récuperation de l'index de la case cliquée par l'utilisateur
    const indexCase = parseInt(this.dataset.index);
    //console.log(indexCase);

    if (gameStatus[indexCase] != "" || !gameIsActive) {
        return;
    }

    gameStatus[indexCase] = activePlayer;
    this.innerHTML = activePlayer;
    // console.log(gameStatus)

    gameIsWin();
}
function gameIsWin() {
    let winTurn = false;
    let winner = "";

    for (let winCondition of winsCondition) {
        let win1 = gameStatus[winCondition[0]]
        let win2 = gameStatus[winCondition[1]]
        let win3 = gameStatus[winCondition[2]]
        if (win1 === "" || win2 === "" || win3 == "") {
            continue;
        }
        if (win1 === win2 && win2 === win3) {
            winTurn = true;
            winner = win1;
            break;
        }
    }
    if (winTurn) {
        statut.innerHTML = win();
        gameIsActive = false;
        updateScore(winner);
        return;
    }

    if (!gameStatus.includes("")) {
        statut.innerHTML = equality();
        gameIsActive = false;
        return;
    }

    activePlayer = activePlayer === "X" ? "O" : "X";
    statut.innerHTML = playerTurn();
}
//Fonction pour la gestion des score
function updateScore(winner) {
    if (winner === "X") {
        score[0]++; // Incrémente le score du joueur X
    } else if (winner === "O") {
        score[1]++; // Incrémente le score du joueur O
    }

    // Mettre à jour l'affichage du score
    document.getElementById("scoreX").innerHTML = score[0];
    document.getElementById("scoreO").innerHTML = score[1];
}


//Fonction pour remettre l'état du jeu a 0 lors d'une victoire.
function restart() {
    activePlayer = "X";
    gameIsActive = true;
    gameStatus = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = playerTurn();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}