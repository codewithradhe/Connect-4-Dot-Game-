document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("game-board");
    const columns = 7;
    const rows = 6;
    const board = Array(rows).fill(null).map(() => Array(columns).fill(null));
    let currentPlayer = "blue";

    function createBoard() {
        gameBoard.innerHTML = '';
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = r;
                cell.dataset.col = c;
                cell.addEventListener("click", handleCellClick);
                gameBoard.appendChild(cell);
            }
        }
    }

    function handleCellClick(e) {
        const col = parseInt(e.target.dataset.col);
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][col]) {
                board[r][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${col}"]`);
                cell.classList.add(currentPlayer);
                if (checkWin(r, col)) {
                    setTimeout(() => alert(`${currentPlayer} wins!`), 10);
                    resetBoard();
                } else if (board.flat().every(cell => cell)) {
                    setTimeout(() => alert("It's a tie!"), 10);
                    resetBoard();
                } else {
                    currentPlayer = currentPlayer === "blue" ? "orange" : "blue";
                }
                return;
            }
        }
    }

    function resetBoard() {
        board.forEach(row => row.fill(null));
        createBoard();
        currentPlayer = "blue";
    }

    function checkWin(row, col) {
        const directions = [
            [[-1, 0], [1, 0]], // vertical
            [[0, -1], [0, 1]], // horizontal
            [[-1, -1], [1, 1]], // diagonal \
            [[-1, 1], [1, -1]]  // diagonal /
        ];

        return directions.some(direction => {
            return direction.reduce((count, [dx, dy]) => {
                let r = row + dx;
                let c = col + dy;
                while (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] === currentPlayer) {
                    count++;
                    r += dx;
                    c += dy;
                }
                return count;
            }, 1) >= 4;
        });
    }

    createBoard();
});
