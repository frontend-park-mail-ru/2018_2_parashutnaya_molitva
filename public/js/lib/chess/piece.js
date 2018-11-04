import { PIECE_TYPE, PIECE_COLOR } from './enums';

export default class Piece {
    /**
     * Конструктор фигуры
     * @param {PIECE_TYPE} pieceType
     * @param {PIECE_COLOR} pieceColor
     */
    constructor (pieceType, pieceColor) {
        this._pieceType = pieceType;
        this._pieceColor = pieceColor;
        this._isMoved = false;
    }

    /**
     * _pieceType getter
     * @returns {PIECE_TYPE}
     */
    type () {
        return this._pieceType;
    }

    /**
     * _pieceColor getter
     * @returns {PIECE_COLOR}
     */
    color () {
        return this._pieceColor;
    }

    /**
     * _isMoved getter
     * @returns {boolean}
     */
    isMoved () {
        return this._isMoved;
    }

    /**
     * _isMoved setter
     * @param {boolean} isMoved
     */
    setMoved (isMoved) {
        this._isMoved = isMoved;
    }

    /**
     * returns short name
     * @returns {string}
     */
    shortName () {
        switch (this._pieceType) {
        case PIECE_TYPE.EMPTY:
            return '.';
        case PIECE_TYPE.NONE:
            return '!';
        case PIECE_TYPE.EN_PASSANT:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'E';
            }
            return 'e';
        case PIECE_TYPE.PAWN:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'P';
            }
            return 'p';
        case PIECE_TYPE.KNIGHT:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'N';
            }
            return 'n';
        case PIECE_TYPE.BISHOP:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'B';
            }
            return 'b';
        case PIECE_TYPE.ROOK:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'R';
            }
            return 'r';
        case PIECE_TYPE.QUEEN:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'Q';
            }
            return 'q';
        case PIECE_TYPE.KING:
            if (this._pieceColor === PIECE_COLOR.WHITE) {
                return 'K';
            }
            return 'k';
        default:
            return 'X';
        }
    }
}
