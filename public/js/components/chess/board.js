import { PIECE_TYPE, COLOR } from './consts';
import Cell from './cell';
import Piece from './piece';
import './board.css';

const START_STATE = 'RNBQKBNRPPPPPPPP................................pppppppprnbqkbnr';
const PIECE_PARAMETERS = {
    'R': [PIECE_TYPE.ROOK, COLOR.WHITE],
    'N': [PIECE_TYPE.KNIGHT, COLOR.WHITE],
    'B': [PIECE_TYPE.BISHOP, COLOR.WHITE],
    'Q': [PIECE_TYPE.QUEEN, COLOR.WHITE],
    'K': [PIECE_TYPE.KING, COLOR.WHITE],
    'P': [PIECE_TYPE.PAWN, COLOR.WHITE],
    'E': [PIECE_TYPE.EN_PASSANT, COLOR.WHITE],
    'r': [PIECE_TYPE.ROOK, COLOR.BLACK],
    'n': [PIECE_TYPE.KNIGHT, COLOR.BLACK],
    'b': [PIECE_TYPE.BISHOP, COLOR.BLACK],
    'q': [PIECE_TYPE.QUEEN, COLOR.BLACK],
    'k': [PIECE_TYPE.KING, COLOR.BLACK],
    'p': [PIECE_TYPE.PAWN, COLOR.BLACK],
    'e': [PIECE_TYPE.EN_PASSANT, COLOR.BLACK],
    '.': [PIECE_TYPE.EMPTY, COLOR.NONE]
};

const BOARD_CLASS = 'board';

export default class Board {
    constructor ({ boardState = START_STATE, sideOfView = COLOR.WHITE, moveCallback = (move) => null } = {}) {
        this._moveCallback = moveCallback;
        this.setState({ boardState, sideOfView });
    }

    render (root) {
        root.innerHTML = '';
        root.appendChild(this._board);
    }

    setState ({ boardState = START_STATE, sideOfView = this._sideOfView } = {}) {
        if (START_STATE.length !== 64) {
            throw new Error('boardState must be 64 characters long');
        }

        this._boardState = boardState;
        this._sideOfView = sideOfView;
        this._selectedCell = '';
        // 8 x 8 board
        let stateMatrix = [];
        for (let i = 0; i < 8; i++) {
            let row = [];
            for (let j = 0; j < 8; j++) {
                row.push(boardState[i * 8 + j]);
            }
            stateMatrix.push(row);
        }

        // table with chess class
        this._board = document.createElement('table');
        this._board.classList.add(BOARD_CLASS);

        // table won't work without tbody
        const tbody = document.createElement('tbody');

        // 7 -> 0 if white; 0 -> 7 if black
        for (let i = this._sideOfView === COLOR.WHITE ? 7 : 0; this._sideOfView === COLOR.WHITE ? i >= 0 : i < 8;
            this._sideOfView === COLOR.WHITE ? i-- : i++) {
            let tr = document.createElement('tr');

            // 0 -> 7  if white; 7 -> 0 if black
            for (let j = this._sideOfView === COLOR.WHITE ? 0 : 7; this._sideOfView === COLOR.WHITE ? j < 8 : j >= 0;
                this._sideOfView === COLOR.WHITE ? j++ : j--) {
                let td = document.createElement('td');
                const piece = new Piece(...PIECE_PARAMETERS[stateMatrix[i][j]]);
                const cell = new Cell(i, j);
                cell.div.addEventListener('click', (event) => this._onCellClick(event));
                piece.render(cell.div);
                cell.render(td);
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        this._board.appendChild(tbody);
    }

    _onCellClick (event) {
        console.log(event.currentTarget.id);
        if (!event.currentTarget.classList.contains('cell_selected')) {
            event.currentTarget.classList.add('cell_selected');
            if (this._selectedCell !== '') {
                this._moveCallback(this._selectedCell + event.currentTarget.id);
                this._deselectAllCells();
            } else {
                this._selectedCell = event.currentTarget.id;
            }
        } else {
            event.currentTarget.classList.remove('cell_selected');
            this._selectedCell = '';
        }
    }

    _deselectAllCells () {
        this._selectedCell = '';
        this._board.querySelectorAll('.cell').forEach((element) => {
            if (element.classList.contains('cell_selected')) {
                element.classList.remove('cell_selected');
            }
        });
    }
}
