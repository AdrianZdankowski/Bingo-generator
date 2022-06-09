export const markCell = (cell, boardCells) => {
	cell.classList.add("marked");
	console.log(checkWin(boardCells));
};

const checkWin = boardCells => {
	let colsCounter = new Array(boardCells.length).fill(0);
	let diagCounter = 0;
	let antiDiagCounter = 0;
	const boardSize = boardCells.length;

	for (let row = 0; row < boardSize; row++) {
		let rowCounter = 0;

		for (let col = 0; col < boardSize; col++) {
			if (boardCells[row][col].classList.contains("marked")) {
				if (++rowCounter == boardSize) return true;
				colsCounter[col]++;
				if (row == col && ++diagCounter == boardSize) return true;
				if (row + col == boardSize - 1 && ++antiDiagCounter == boardSize) return true;
			}
		}
	}

	if (colsCounter.some(count => count === boardSize)) return true;
	return false;
};
