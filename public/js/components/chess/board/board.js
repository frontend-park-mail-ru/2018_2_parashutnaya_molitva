import { PIECE_TYPE, COLOR } from '../consts';
import Cell from '../cell/cell';
import Piece from '../piece/piece';
import './board.less';
import template from './board.tmpl.xml';

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

const PIECE_COLOR_CLASSES = {
    [COLOR.WHITE]: 'piece_white',
    [COLOR.BLACK]: 'piece_black'
};

export default class Board {
    constructor ({ boardState = START_STATE, turn = COLOR.WHITE, sideOfView = COLOR.WHITE, moveCallback = (move) => null } = {}) {
        this._turn = +turn;
        this._moveCallback = moveCallback;
        this._params = {};
        this.setState({ boardState, turn, sideOfView });
        this._root = null;
    }

    render (root, data) {
        root.innerHTML = template(this._params);
        this._root = root;
        const cells = this._root.querySelectorAll('.cell');

        if (data && data.move) {
            this._prevPieceCell = data.move.slice(0, 2);
            this._newPieceCell = data.move.slice(2, 4);
        }

        if (this._prevPieceCell && this._newPieceCell) {
            const prevCell = this._root.querySelector(`#${this._prevPieceCell}`);
            const newCell = this._root.querySelector(`#${this._newPieceCell}`);

            if (prevCell && newCell) {
                prevCell.classList.add('cell_prev-move');
                newCell.classList.add('cell_prev-move');
            }
        }

        console.log(cells);
        cells.forEach(cell => {
            cell.addEventListener('click', (event) => this._onCellClick(event));
        });
    }

    setState ({ boardState = START_STATE, turn = +this._sideOfView, sideOfView = this._sideOfView } = {}) {
        this._turn = +turn;
        if (START_STATE.length !== 64) {
            throw new Error('boardState must be 64 characters long');
        }

        this._boardState = boardState;
        this._sideOfView = sideOfView;
        console.log('selected cell: ' + this._selectedCell);
        this._prevPieceCell = this._selectedCell;
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

        let cells = [];
        let pieces = [];

        // 7 -> 0 if white; 0 -> 7 if black
        for (let i = this._sideOfView === COLOR.BLACK ? 7 : 0; this._sideOfView === COLOR.BLACK ? i >= 0 : i < 8;
            this._sideOfView === COLOR.BLACK ? i-- : i++) {
            cells.push([]);
            pieces.push([]);

            // 0 -> 7  if white; 7 -> 0 if black
            for (let j = this._sideOfView === COLOR.BLACK ? 0 : 7; this._sideOfView === COLOR.BLACK ? j < 8 : j >= 0;
                this._sideOfView === COLOR.BLACK ? j++ : j--) {
                cells[cells.length - 1].push(new Cell(j, i));
                pieces[pieces.length - 1].push(new Piece(...PIECE_PARAMETERS[stateMatrix[j][i]]));
            }
        }
        this._params.cells = cells;
        this._params.pieces = pieces;
    }

    highlightKing ({ turn }) {
        if (turn) {
            const whiteKing = this._root.querySelector('.piece_king .piece_white');
            whiteKing.parent.classList.add('cell__checkmate');
        } else {
            const blackKing = this._root.querySelector('.piece_king .piece_black');
            blackKing.parent.classList.add('cell__checkmate');
        }
    }

    _onCellClick (event) {
        console.log(event.currentTarget.id);
        if (event.currentTarget.firstChild.classList.contains(PIECE_COLOR_CLASSES[this._turn])) {
            if (!event.currentTarget.classList.contains('cell_selected')) {
                if (this._selectedCell !== '') {
                    const prevSelectedCell = this._root.querySelector(`#${this._selectedCell}`);
                    prevSelectedCell.classList.remove('cell_selected');
                }
                event.currentTarget.classList.add('cell_selected');
                this._selectedCell = event.currentTarget.id;
            }
        } else {
            console.log('not your piece');
        }

        if (this._selectedCell !== '' && this._selectedCell !== event.currentTarget.id) {
            this._newPieceCell = event.currentTarget.id;
            this._moveCallback(this._selectedCell + event.currentTarget.id);
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
