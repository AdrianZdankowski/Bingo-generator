const setupBtn = document.getElementById("setup-btn")
const preview = document.getElementById("preview")
const cellPreview = document.getElementById("cellPreview")
const boardOptions = document.querySelectorAll(".boardOption")

const handleConfirmation = () => {
    const boardSize = document.getElementById("board-size-select")
    const boardBgColor = document.getElementById("board-bg-color").value
    const boardCellFontColor = document.getElementById("board-cell-font-color").value
    const boardCellBgColor = document.getElementById("board-cell-bg-color").value
    const board = document.getElementById("board") 
        
    document.getElementById("container").remove();
    board.style.setProperty('display', 'grid');
    board.style.setProperty('grid-template-columns', 'repeat(' + boardSize.value + ', 1fr)');
    board.style.setProperty('grid-template-rows', 'repeat(' + boardSize.value + ', 1fr)');
    
    // Zamienić na zmienne css ^^^^

    for (let i = 1; i <= (boardSize.value ** 2); i++) {
        const cell = document.createElement("div");
        const inputField = document.createElement("input")
        cell.id = i
        cell.classList.add("cell");
        inputField.placeholder = "TEST"
        cell.append(inputField)
        board.append(cell)
    }


}

const handleSetupClick = event => {
    const field = event.target
    if (field.id == "board-bg-color") document.body.style.backgroundColor = document.getElementById("board-bg-color").value
    if (field.id == "board-cell-font-color") preview.style.color = document.getElementById("board-cell-font-color").value
    if (field.id == "board-cell-bg-color") cellPreview.style.backgroundColor = document.getElementById("board-cell-bg-color").value
    
}

setupBtn.addEventListener("click", handleConfirmation)
boardOptions.forEach(option => option.addEventListener("input", handleSetupClick))
