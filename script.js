const x_Class = 'x'
const o_Class = 'o'
const possibilities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMsgText = document.querySelector('[winner-text]')
const itemElements = document.querySelectorAll('[data-items]')
const board = document.getElementById('container')
const winningMsg = document.getElementById('results')
const restartBtn = document.getElementById('restart')
let oTurn

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {
    oTurn = false
    itemElements.forEach(item => {
        item.classList.remove(x_Class)
        item.classList.remove(o_Class)
        item.removeEventListener('click', handleClick)
        item.addEventListener('click', handleClick, { once: true })
        
    })
    boardHoverEffects()
    winningMsg.classList.remove('show')
}

function handleClick(e) {
    const item = e.target
    const currentTurn = oTurn ? o_Class : x_Class
    placeMark(item, currentTurn)
    if (checkWin(currentTurn)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        switchTurn()
        boardHoverEffects()
    }
}

function endGame(draw) {
    if (draw) {
        winningMsgText.innerHTML = 'Draw Match!!'
    } else {
        winningMsgText.innerHTML = `${oTurn ? "O's" : "X's"} Won!`
    }
    winningMsg.classList.add('show')
}

function isDraw() {
    return [...itemElements].every(item => {
        return item.classList.contains(x_Class) || item.classList.contains(o_Class)
    })
}

function placeMark(item, currentTurn) {
    item.classList.add(currentTurn)
}

function switchTurn() {
    oTurn = !oTurn
}

function boardHoverEffects() {
    board.classList.remove(x_Class)
    board.classList.remove(o_Class)
    if (oTurn) {
        board.classList.add(o_Class)
    } else board.classList.add(x_Class)
}



function checkWin(currentTurn) {
    return possibilities.some(combination => {
        return combination.every(index => {
            return itemElements[index].classList.contains(currentTurn)
        })
    })
}




