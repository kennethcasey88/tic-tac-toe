//Create the gameboard and handle the player marks//
function gameBoard() {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    };

    const getBoard = () => board;

    const placeMark = (row, index, mark) => {
        /*const isCellEmpty = board[row][index].getValue() === '';

        if (!isCellEmpty) return 'cancel'; 
            */
        board[row][index].addMark(mark);

    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };
    
    return { getBoard, placeMark, printBoard };
};
//This function allows the gameboard to place marks in chosen cells//
function cell() {
    let value = '';

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addMark, getValue };
};

function createPlayer(name, mark) {
    return { name, mark };
}

// Here we control the flow of the game using the above functions//
let roundCount = 0;
function gameController() {
    const pappa = createPlayer('Pappa', 'X');
    const leia = createPlayer('Leia', 'O');

    const board = gameBoard();

    let activePlayer = pappa;

    const switchPlayer = () => {
        activePlayer = activePlayer === pappa ? leia : pappa;
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };
    
    const playRound = (row, index) => {
        const board2 = board.getBoard();
        if (board.placeMark(row, index, getActivePlayer().mark) === 'cancel') {
            console.log('invalid move');
            return;
        }

        
        roundCount++;

        console.log(
            `Putting ${getActivePlayer().name}'s mark into row ${row}, index ${index}...`
        );
        board.placeMark(row, index, getActivePlayer().mark);
    
        if (roundCount === 5) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board2[i][0].getValue() === board2[i][1].getValue()
                        && board2[i][0].getValue() === board2[i][2].getValue()
                        && board2[i][0].getValue() !== '') {
                        console.log(`${getActivePlayer().name} wins`);
                        return 'game over';
                    } else if (board2[0][j].getValue() === board2[1][j].getValue()
                        && board2[0][j].getValue() === board2[2][j].getValue()
                        && board2[0][j].getValue() !== '') {
                        console.log(`${getActivePlayer().name} wins`);
                        return 'game over';
                    } else if (board2[0][0].getValue() === board2[1][1].getValue()
                        && board2[0][0].getValue() === board2[2][2].getValue()
                        && board2[0][0].getValue() !== '') {
                        console.log(`${getActivePlayer().name} wins`);
                        return 'game over';
                    } else if (board2[0][2].getValue() === board2[1][1].getValue()
                        && board2[0][2].getValue() === board2[2][0].getValue()
                        && board2[0][2].getValue() !== '') {
                        console.log(`${getActivePlayer().name} wins`);
                        return 'game over';
                        }
                }
            }
        }
        
    
            switchPlayer();
            printNewRound();
        };
    
        printNewRound();

        return { playRound, getActivePlayer, getBoard: board.getBoard };
    }


function screenController() {
    const game = gameController();
    const display = document.querySelector('.display');
    const gamePad = document.querySelector('.game-pad');

    const updateScreen = () => {
        gamePad.textContent = '';

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        display.textContent = `${activePlayer.name}'s turn...`;
        let data = 0;
        board.forEach(row => {
            row.forEach((cell, index) => {
              const cellButton = document.createElement("button");
              cellButton.classList.add("cell");
              cellButton.setAttribute('id', data++);
              cellButton.textContent = cell.getValue();
              gamePad.appendChild(cellButton);
            })
          })
    }
    function clickHandlerBoard(e) {
        const selectedCell = e.target.id;
        /*let round = game.playRound();*/
        if (e.target.textContent === 'X' || e.target.textContent === 'O') return;
        if (!selectedCell) return;
        let row;
        let newId;
    
        if (selectedCell >= 0 && selectedCell < 3) {
          row = 0;
          game.playRound(row, selectedCell);
        } else if (selectedCell >= 3 && selectedCell < 6) {
          newId = selectedCell - 3;
          row = 1;
          game.playRound(row, newId);
        } else if (selectedCell >= 6 && selectedCell < 9) {
          newId = selectedCell - 6;
          row = 2;
          game.playRound(row, newId);
        }
    
        /*if (round === 'Player1') {
          display.textContent = 'Player 1 wins!';
          return;
        } else if (round === 'Player2') {
          display.textContent = 'Player 2 wins!';
          return;
        }*/
    
        updateScreen();
      }
      gamePad.addEventListener("click", clickHandlerBoard);
    
      // Initial render
      updateScreen();
}

screenController();