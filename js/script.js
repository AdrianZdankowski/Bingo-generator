import { markCell } from "./game.js";

const setupBtn = document.getElementById("setup-btn");
const preview = document.getElementById("preview");
const cellPreview = document.getElementById("cellPreview");
const boardOptions = document.querySelectorAll(".boardOption");
const root = document.querySelector(":root");
const boardTitle = document.getElementById("board-title");
const saveBtn = document.getElementById("saveBtn");
const board = document.getElementById("board");

const boardCells = [];
const inputsArray = [];

const setupBoard = () => {
	const boardSize = parseInt(document.getElementById("board-size-select").value);
	const boardCellFontColor = document.getElementById("board-cell-font-color").value;
	const boardCellBgColor = document.getElementById("board-cell-bg-color").value;

	document.getElementById("container").remove();
	board.style.setProperty("display", "grid");
	boardTitle.style.setProperty("display", "block");
	root.style.setProperty("--board-size", boardSize);
	saveBtn.style.setProperty("display", "block");

	for (let i = 0; i < boardSize; i++) {
		const row = [];
		for (let j = 0; j < boardSize; j++) {
			const cell = document.createElement("div");
			const inputField = document.createElement("p");
			cell.id = `${i}${j}`;
			cell.classList.add("cell");
			inputField.textContent = "WRITE_HERE";
			inputField.classList.add("cellInput");
			inputField.setAttribute("contenteditable", "true");
			inputField.style.setProperty("color", boardCellFontColor);
			cell.style.setProperty("background-color", boardCellBgColor);
			cell.append(inputField);
			board.append(cell);
			row.push(cell);
			inputsArray.push(inputField);
		}
		boardCells.push(row);
	}

	inputsArray.forEach(input => {
		input.addEventListener("keypress", () => {
			if (input.textContent == "WRITE_HERE") {
				input.textContent = "";
			}
		});
	});

	inputsArray.forEach(input => {
		input.addEventListener("focusout", () => {
			if (input.textContent.length == 0) {
				input.textContent = "WRITE_HERE";
			}
		});
	});
};

const startGame = () => {
	inputsArray.forEach(input => {
		input.setAttribute("contenteditable", "false");
	});

	boardCells.forEach(row =>
		row.forEach(cell => {
			cell.addEventListener("click", () => {
				markCell(cell, boardCells);
			});
		})
	);
};

const handleSetupClick = event => {
	const field = event.target;
	if (field.id == "board-bg-color")
		document.body.style.backgroundColor = document.getElementById("board-bg-color").value;
	if (field.id == "board-cell-font-color") preview.style.color = document.getElementById("board-cell-font-color").value;
	if (field.id == "board-cell-bg-color")
		cellPreview.style.backgroundColor = document.getElementById("board-cell-bg-color").value;
};

setupBtn.addEventListener("click", setupBoard);
boardOptions.forEach(option => option.addEventListener("input", handleSetupClick));
saveBtn.addEventListener("click", startGame, { once: true });
