import { markCell } from "./game.js";

const setupBtn = document.getElementById("setup-btn");
const preview = document.getElementById("preview");
const cellPreview = document.getElementById("cellPreview");
const boardOptions = document.querySelectorAll(".boardOption");
const root = document.querySelector(":root");
const boardTitle = document.getElementById("board-title");
const saveBtn = document.getElementById("saveBtn");
const board = document.getElementById("board");
const customizationSwitch = document.getElementById("customModeSwitch");
const content = document.getElementById("content");

const boardCells = [];
const inputsArray = [];

const setupBoard = () => {
	let boardSize = parseInt(document.getElementById("board-size-select").value);
	let boardCellFontColor = document.getElementById("board-cell-font-color").value;
	let boardCellBgColor = document.getElementById("board-cell-bg-color").value;
	let markColor = document.getElementById("mark-color").value;
	const title = document.getElementById("board-title-input").value;
	boardTitle.textContent = title;

	if (window.getComputedStyle(content).getPropertyValue("display") == "none") {
		boardSize = 5;
		boardCellFontColor = "rgb(87, 177, 183)";
		boardCellBgColor = "hsl(218, 10%, 25%)";
		markColor = "hsl(39, 100%, 45%)";
	}

	document.getElementById("container").remove();
	board.style.setProperty("display", "grid");
	boardTitle.style.setProperty("display", "block");

	root.style.setProperty("--board-size", boardSize);
	root.style.setProperty("--cell-font-clr", boardCellFontColor);
	root.style.setProperty("--cell-bg-clr", boardCellBgColor);
	root.style.setProperty("--mark-clr", markColor);

	saveBtn.style.setProperty("display", "block");

	for (let i = 0; i < boardSize; i++) {
		const row = [];

		for (let j = 0; j < boardSize; j++) {
			const cell = document.createElement("div");
			const inputField = document.createElement("p");
			const hover = document.createElement("div");
			cell.id = `${i}${j}`;
			cell.classList.add("cell");
			inputField.textContent = "WRITE_HERE";
			inputField.setAttribute("contenteditable", "true");
			cell.append(inputField);
			cell.append(hover);
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

	boardCells.forEach(row =>
		row.forEach(cell => {
			cell.addEventListener("contextmenu", e => {
				e.preventDefault();
				e.target.classList.remove("marked");
			});
		})
	);
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

const handleSwitchClick = () => {
	const compStyle = window.getComputedStyle(content);
	if (compStyle.getPropertyValue("display") == "none") {
		saveBtn.style.setProperty("margin-top", "-1em");
		content.style.display = "grid";
	} else content.style.display = "none";
};

setupBtn.addEventListener("click", setupBoard);
boardOptions.forEach(option => option.addEventListener("input", handleSetupClick));
saveBtn.addEventListener("click", startGame, { once: true });
customizationSwitch.addEventListener("input", handleSwitchClick);
