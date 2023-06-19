const statut = document.querySelector("h2");
let gameIsActive = true;
let activePlayer = "X";
let gameStatus = ["", "", "", "", "", "", "", "", ""];

const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [3, 5, 8],
    [0, 4, 8],
    [3, 4, 6]
]

const win = () => `Player ${joueurActif} win this game`
const equality = () => "No one win. Restart the game!"
const playerTurn = () => `${activePlayer} it's your turn !`

statut.innerHtml = playerTurn()