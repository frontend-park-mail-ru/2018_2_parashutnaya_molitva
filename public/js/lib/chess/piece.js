import { PIECE_TYPE, PIECE_COLOR, MATERIAL_VALUE } from './enums';

const CAT_MAP = {
    '.': 0,
    'e': 1,
    'p': 2,
    'n': 3,
    'b': 4,
    'r': 5,
    'q': 6,
    'k': 7,
    'E': 8,
    'P': 9,
    'N': 10,
    'B': 11,
    'R': 12,
    'Q': 13,
    'K': 14
};

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

    copy () {
        let copied = new Piece(this._pieceType, this._pieceColor);
        copied._isMoved = this._isMoved;

        return copied;
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

    oneHot () {
        const oneHot = new Array(Object.keys(CAT_MAP).length).fill(0);
        oneHot[CAT_MAP[this.shortName()]] = 1;
        return oneHot;
    }

    material () {
        const absValue = MATERIAL_VALUE[this.type()];
        return this.color() === PIECE_COLOR.WHITE ? absValue : -absValue;
    }

    /**
     * white rook
     * @returns {Piece}
     */
    static rw () {
        return new Piece(PIECE_TYPE.ROOK, PIECE_COLOR.WHITE);
    }

    /**
     * white knight
     * @returns {Piece}
     */
    static nw () {
        return new Piece(PIECE_TYPE.KNIGHT, PIECE_COLOR.WHITE);
    }

    /**
     * white bishop
     * @returns {Piece}
     */
    static bw () {
        return new Piece(PIECE_TYPE.BISHOP, PIECE_COLOR.WHITE);
    }

    /**
     * white queen
     * @returns {Piece}
     */
    static qw () {
        return new Piece(PIECE_TYPE.QUEEN, PIECE_COLOR.WHITE);
    }

    /**
     * white king
     * @returns {Piece}
     */
    static kw () {
        return new Piece(PIECE_TYPE.KING, PIECE_COLOR.WHITE);
    }

    /**
     * white pawn
     * @returns {Piece}
     */
    static pw () {
        return new Piece(PIECE_TYPE.PAWN, PIECE_COLOR.WHITE);
    }

    /**
     * white en passant
     * @returns {Piece}
     */
    static ew () {
        return new Piece(PIECE_TYPE.EN_PASSANT, PIECE_COLOR.WHITE);
    }

    /**
     * black rook
     * @returns {Piece}
     */
    static rb () {
        return new Piece(PIECE_TYPE.ROOK, PIECE_COLOR.BLACK);
    }

    /**
     * black knight
     * @returns {Piece}
     */
    static nb () {
        return new Piece(PIECE_TYPE.KNIGHT, PIECE_COLOR.BLACK);
    }

    /**
     * black bishop
     * @returns {Piece}
     */
    static bb () {
        return new Piece(PIECE_TYPE.BISHOP, PIECE_COLOR.BLACK);
    }

    /**
     * black queen
     * @returns {Piece}
     */
    static qb () {
        return new Piece(PIECE_TYPE.QUEEN, PIECE_COLOR.BLACK);
    }

    /**
     * black king
     * @returns {Piece}
     */
    static kb () {
        return new Piece(PIECE_TYPE.KING, PIECE_COLOR.BLACK);
    }

    /**
     * black pawn
     * @returns {Piece}
     */
    static pb () {
        return new Piece(PIECE_TYPE.PAWN, PIECE_COLOR.BLACK);
    }

    /**
     * black en passant
     * @returns {Piece}
     */
    static eb () {
        return new Piece(PIECE_TYPE.EN_PASSANT, PIECE_COLOR.BLACK);
    }

    /**
     * empty piece
     * @returns {Piece}
     */
    static em () {
        return new Piece(PIECE_TYPE.EMPTY, PIECE_COLOR.NONE);
    }

    static no () {
        return new Piece(PIECE_TYPE.NONE, PIECE_COLOR.NONE);
    }
}
