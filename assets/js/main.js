
const possibleWinningCombinations = [
    [0,1,2], [3,4,5], [6,7,8], [0, 4, 8], [2, 4, 6], [0,3,6], [2,5,8]
]

let plays={
    "X": [],
    "O": []
}

let isGameOver = false;

let currentPlayer = 'X';

const playerDisplay = document.getElementById("player");
const playDescription = document.getElementById("play-description")
const updatePlayerDisplay = () => {
    playerDisplay.innerHTML = `<img src='./assets/img/${currentPlayer === 'X' ? 'halloween.png' : 'ghost.png'}' alt='${currentPlayer}' style='width: 50px; height: 50px;'>`;
};

updatePlayerDisplay(); 

playDescription.textContent = "ON THE MOVE";


const handlePlay = (id) => {
    if (isGameOver) {
        alert("The game is over");
        return;
    }

    const element = document.getElementById(id);
    if (!plays["X"].includes(Number(id)) && !plays["O"].includes(Number(id))) {
        element.style.backgroundImage = `url('./assets/img/${currentPlayer === 'X' ? 'halloween.png' : 'ghost.png'}`;
        element.style.opacity = '1';
        plays[currentPlayer].push(Number(id));

        if (checkWinning(plays[currentPlayer])) {
            isGameOver = true;
            playDescription.textContent = currentPlayer + " WINS!";
        } else if (checkDraw()) {
            isGameOver = true;
            playerDisplay.innerHTML = ''
            playDescription.textContent = "DRAW!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playDescription.textContent = "ON THE MOVE";
            updatePlayerDisplay(); 
        }
    } else {
        alert("You have already played this position");
    }
};

const checkWinning = (playerPlays) => {
    return possibleWinningCombinations.some((combination) => {
        if (combination.every((index) => playerPlays.includes(index))) {
            combination.forEach((index) => {
                document.getElementById(index).classList.add("win-highlight");
            });
            return true;
        }
        return false;
    });
};

const checkDraw = ()=>{
    return plays["X"].length + plays["O"].length == 9; 
}

document.querySelectorAll("td").forEach(cell => {
    cell.addEventListener("mouseenter", function() {
        if (!plays["X"].includes(Number(cell.id)) && !plays["O"].includes(Number(cell.id)) && !isGameOver) {
            cell.style.backgroundImage = `url('./assets/img/${currentPlayer === 'X' ? 'halloween.png' : 'ghost.png'}`;
            cell.style.opacity = "0.3"; 
        }
    });

    cell.addEventListener("mouseleave", function() {
        if (!plays["X"].includes(Number(cell.id)) && !plays["O"].includes(Number(cell.id))) { 
            cell.style.backgroundImage = "";
            cell.style.opacity = "1";
        }
    });
});
