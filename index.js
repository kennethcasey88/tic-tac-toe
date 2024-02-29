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
        const isCellEmpty = board[row][index].getValue() === '';

        if (!isCellEmpty) return 'cancel';

        board[row][index].addMark(mark);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };
    
    return { getBoard, placeMark, printBoard };
};

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
        if (board.placeMark(row, index, getActivePlayer().mark) === 'cancel') {
            console.log('invalid move');
            return;
        }

        console.log(
          `Putting ${getActivePlayer().name}'s mark into row ${row}, index ${index}...`
        );
        board.placeMark(row, index, getActivePlayer().mark);
    
        
    
        switchPlayer();
        printNewRound();
    };
    
    printNewRound();

    return { playRound, getActivePlayer, getBoard: board.getBoard };
}

const game = gameController();

/*function screenController() {
    const game = gameController();
    const display = document.querySelector('.display');
    const gamePad = document.querySelector('.game-pad');
}*/