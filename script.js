const player1Name = document.querySelector('#player1')
const player2Name = document.querySelector('#player2')
const button = document.querySelector('button')
const currentPlayerDisplay = document.querySelector('.current-player')
const winningPlayerDisplay = document.querySelector('.winning-player')
const gameArea = document.querySelector('.game-area')
const gameBoard = document.querySelectorAll('.game-grid')

const player1 = { name: player1Name.value, marker: 'X' }
const player2 = { name: player2Name.value, marker: 'O' }

let currentPlayer

button.addEventListener('click', (event) => {

    if (player1Name.value != '' && player2Name.value != '' && button.textContent == 'Start Game') {
        
        currentPlayerDisplay.textContent = `${player1Name.value}'s turn`
        gameArea.classList.add('show')
        event.preventDefault();

        button.textContent = 'Restart'
    } else if (player1Name.value != '' && player2Name.value != '' && button.textContent == 'Restart') {
       
        event.preventDefault()
        button.textContent = 'Start Game'
        reset()
    }
})

function switchPlayer() {
    
    if (currentPlayer == player1) {
        currentPlayerDisplay.textContent = `${player2Name.value}'s Turn`
        return player2
    } else if (currentPlayer == player2) {
        currentPlayerDisplay.textContent = `${player1Name.value}'s Turn`
        return player1
    }
}

function winCheck(marker) {
    
    if ((gameBoard[0].textContent == marker && gameBoard[1].textContent == marker && gameBoard[2].textContent == marker) ||
        (gameBoard[3].textContent == marker && gameBoard[4].textContent == marker && gameBoard[5].textContent == marker) ||
        (gameBoard[6].textContent == marker && gameBoard[7].textContent == marker && gameBoard[8].textContent == marker) ||
        (gameBoard[0].textContent == marker && gameBoard[3].textContent == marker && gameBoard[6].textContent == marker) ||
        (gameBoard[1].textContent == marker && gameBoard[4].textContent == marker && gameBoard[7].textContent == marker) ||
        (gameBoard[2].textContent == marker && gameBoard[5].textContent == marker && gameBoard[8].textContent == marker) ||
        (gameBoard[0].textContent == marker && gameBoard[4].textContent == marker && gameBoard[8].textContent == marker) ||
        (gameBoard[2].textContent == marker && gameBoard[4].textContent == marker && gameBoard[6].textContent == marker)){
           
        return('win');
    }
}

function winner(name) {
    
    if (name == player1) {
        winningPlayerDisplay.textContent = `${player1Name.value} wins`
    } else if (name == player2) {
        winningPlayerDisplay.textContent = `${player2Name.value} wins`
    } 
}

function reset() {

    gameArea.classList.remove('show')
    currentPlayerDisplay.textContent = ''
    winningPlayerDisplay.textContent = ''
    player1Name.value = '' 
    player2Name.value = '' 
    currentPlayer = player1;
    
    for (let i = 0; i < 9; i++){
        gameBoard[i].textContent = ''
    }
}

function fullBoard() {
  
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i].textContent == '') {
            return false
        }
    }
    return true  
}

const game = (() => {

    currentPlayer = player1
    gameBoard.forEach((grids) => {

        grids.addEventListener('click', (event) => {
            
            if (gameBoard[event.target.id].textContent == '' && winCheck(currentPlayer.marker) != 'win') {
                gameBoard[event.target.id].textContent = currentPlayer.marker
            }

            if (winCheck(currentPlayer.marker) == 'win') {
                winner(currentPlayer)
            }else {
                    if (fullBoard()) {
                        winningPlayerDisplay.textContent = 'Tie Game'
                    }else {
                        currentPlayer = switchPlayer(currentPlayer)
                    }
            } 
            
        })
    })
})();






