
/* javascript */
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

playerDisplay.textContent = currentPlayer;

const handlePlay = (id)=>{
    if(isGameOver){
        alert("The game is over")
        return;
    }

    const element = document.getElementById(id);
    if(!element.innerText){
        element.textContent = currentPlayer
        plays[currentPlayer].push(Number(id));
        if(checkWinning(plays[currentPlayer])){
            isGameOver = true;
            playerDisplay.textContent = currentPlayer +" WINS!";
        }else{
            if(checkDraw()){
                isGameOver = true;
                playerDisplay.textContent = "DRAW!";
            }else{
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                playerDisplay.textContent = currentPlayer;
            }
        }
    }else{
        alert("You have already played this position")
    }
}

const checkWinning = (playerPlays)=>{
    return possibleWinningCombinations.some(combination=>
        combination.every(index=>playerPlays.includes(index))
    );
}

const checkDraw = ()=>{
    return plays["X"].length + plays["O"].length == 9; 
}