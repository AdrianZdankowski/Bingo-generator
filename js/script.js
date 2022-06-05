const setupBtn = document.getElementById("setup-btn")
const preview = document.getElementById("preview")
const cellPreview = document.getElementById("cellPreview")
const boardOptions = document.querySelectorAll(".boardOption")

const handleConfirmation = () => {
    const boardSize = document.getElementById("board-size-select").value
    const boardBgColor = document.getElementById("board-bg-color").value
    const boardCellFontColor = document.getElementById("board-cell-font-color").value
    const boardCellBgColor = document.getElementById("board-cell-bg-color").value
    document.getElementById("setup").style.display = "none"
}

const handleSetupClick = event => {
    const field = event.target
    if (field.id == "board-bg-color") document.body.style.backgroundColor = document.getElementById("board-bg-color").value
    if (field.id == "board-cell-font-color") preview.style.color = document.getElementById("board-cell-font-color").value
    if (field.id == "board-cell-bg-color") cellPreview.style.backgroundColor = document.getElementById("board-cell-bg-color").value
    
}

setupBtn.addEventListener("click", handleConfirmation)
boardOptions.forEach(option => option.addEventListener("input", handleSetupClick))
