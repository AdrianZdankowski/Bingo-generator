const setupBtn = document.getElementById("setup-btn")
const preview = document.getElementById("preview")
const cellPreview = document.getElementById("cellPreview")
const boardOptions = document.querySelectorAll(".boardOption")
const root = document.querySelector(':root')
const boardTitle = document.getElementById("board-title")
const saveBtn = document.getElementById('saveBtn')
const board = document.getElementById("board")

let boardArray = []


const handleConfirmation = () => {
    const boardSize = document.getElementById("board-size-select")
    const boardCellFontColor = document.getElementById("board-cell-font-color").value
    const boardCellBgColor = document.getElementById("board-cell-bg-color").value
    
    document.getElementById("container").remove();
    board.style.setProperty('display', 'grid');
    boardTitle.style.setProperty('display', 'block');
    root.style.setProperty('--board-size', boardSize.value)
    saveBtn.style.setProperty('display', 'block');

    for (let i = 0; i < boardSize.value; i++) {
        for (let j = 0; j < boardSize.value; j++) {
            const cell = document.createElement("div")
            const inputField = document.createElement("p")
            cell.id = `${i}${j}`
            cell.classList.add("cell")
            inputField.textContent = "SAMPLE"
            inputField.classList.add("cellInput")
            inputField.setAttribute('contenteditable','true')
            inputField.style.setProperty('color', boardCellFontColor)
            cell.style.setProperty('background-color', boardCellBgColor)
            cell.append(inputField)
            board.append(cell)
            boardArray.push(cell)
        }
    }
 
}

const handleSave = () => {
    const cellInputs = document.querySelectorAll('.cellInput');
    cellInputs.forEach(input => {
        input.setAttribute('contenteditable','false')
    });

    boardArray.forEach(cell => {
        cell.addEventListener("click", (e) => {
            console.log(e.target)
        })
    })
}    
   

const handleSetupClick = event => {
    const field = event.target
    if (field.id == "board-bg-color") document.body.style.backgroundColor = document.getElementById("board-bg-color").value
    if (field.id == "board-cell-font-color") preview.style.color = document.getElementById("board-cell-font-color").value
    if (field.id == "board-cell-bg-color") cellPreview.style.backgroundColor = document.getElementById("board-cell-bg-color").value
    
}

setupBtn.addEventListener("click", handleConfirmation)
boardOptions.forEach(option => option.addEventListener("input", handleSetupClick))
saveBtn.addEventListener("click", handleSave)


