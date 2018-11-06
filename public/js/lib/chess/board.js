import { PIECE_TYPE, PIECE_COLOR } from './enums';
import Piece from './piece';
import Coord from './coord';
import Moves from './moves';

export default class Board {
    /**
     * constructor
     */
    constructor () {
        /**
         * field with pieces
         * @type {[Piece[]]}
         * @private
         */
        this._field = [
            [Piece.rw(), Piece.nw(), Piece.bw(), Piece.qw(), Piece.kw(), Piece.bw(), Piece.nw(), Piece.rw()],
            [Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb()],
            [Piece.rb(), Piece.nb(), Piece.bb(), Piece.qb(), Piece.kb(), Piece.bb(), Piece.nb(), Piece.rb()]
        ];
    }

    /**
     * assigns board as value
     * @param {Board} other
     */
    assign (other) {
        this._field = other.copy()._field;
    }

    /**
     * board copy
     * @returns {Board}
     */
    copy () {
        let copied = new Board();
        let field = new Array(8);
        for (let i = 0; i < 8; i++) {
            let row = new Array(8);
            for (let j = 0; j < 8; j++) {
                row[j] = (this._field[i][j].copy());
            }
            field[i] = row;
        }
        copied._field = field;
        return copied;
    }

    /**
     * moves piece from `from` to `to`
     * @param {Coord} from
     * @param {Coord} to
     */
    movePiece (from, to) {
        this._field[to.r()][to.c()] = this._field[from.r()][from.c()];
        this._field[to.r()][to.c()].setMoved(true);
        this._field[from.r()][from.c()] = Piece.em();
    }

    /**
     * piece at coord
     * @param {Coord} pos
     * @return {Piece}
     */
    pieceAt (pos) {
        if (pos.r() < 0 || pos.r() >= 8 || pos.c() < 0 || pos.c() >= 8) {
            return Piece.no();
        }
        return this._field[pos.r()][pos.c()];
    }

    /**
     * sets `piece` at `pos`
     * @param {Coord} pos
     * @param {Piece} piece
     */
    setPieceAt (pos, piece) {
        this._field[pos.r()][pos.c()] = piece;
    }

    /**
     * prints board
     */
    print () {
        let field = '';
        for (let i = 7; i >= 0; i--) {
            let row = '';
            for (let j = 0; j < 8; j++) {
                row += this._field[i][j].shortName();
            }
            field += row + '\n';
        }

        console.log(field);
    }

    /**
     * legal moves for `color`
     * @param color
     * @return {{}}
     */
    legalMoves (color) {
        const pseudoLegalMoves = this.pseudoLegalMovesWithColor(color, false);
        const legalMoves = {};
        for (const key in pseudoLegalMoves) {
            const board = pseudoLegalMoves[key];
            if (!board.isCheck(color)) {
                legalMoves[key] = board;
            }
        }
        return legalMoves;
    }

    /**
     * unfiltered moves for `pos`
     * @param {Coord} pos
     * @param {boolean} attackOnly
     * @return {{}}
     */
    pseudoLegalMovesAtPos (pos, attackOnly) {
        const piece = this.pieceAt(pos);
        switch (piece.type()) {
        case PIECE_TYPE.PAWN:
            return Moves.pawn(this, pos, attackOnly);
        case PIECE_TYPE.KNIGHT:
            return Moves.knight(this, pos);
        case PIECE_TYPE.BISHOP:
            return Moves.bishop(this, pos);
        case PIECE_TYPE.ROOK:
            return Moves.rook(this, pos);
        case PIECE_TYPE.QUEEN:
            return Moves.queen(this, pos);
        case PIECE_TYPE.KING:
            return Moves.king(this, pos, attackOnly);
        default:
            return {};
        }
    }

    /**
     * unfiltered moves for color
     * @param {PIECE_COLOR} color
     * @param {boolean} attackOnly
     * @return {{}}
     */
    pseudoLegalMovesWithColor (color, attackOnly) {
        let availableMoves = {};
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const pos = new Coord(i, j);
                if (this.pieceAt(pos).color() === color) {
                    availableMoves = { ...availableMoves, ...this.pseudoLegalMovesAtPos(pos, attackOnly) };
                }
            }
        }
        return availableMoves;
    }

    /**
     * removes en passant cell from board
     */
    removeEnPassant () {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const pos = new Coord(i, j);
                if (this.pieceAt(pos).type() === PIECE_TYPE.EN_PASSANT) {
                    this.setPieceAt(pos, Piece.em());
                    break;
                }
            }
        }
    }

    /**
     * is king of `color` in check
     * @param {PIECE_COLOR} color
     * @return {boolean}
     */
    isCheck (color) {
        const oppositeColor = color === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE;
        const pseudoMoves = this.pseudoLegalMovesWithColor(oppositeColor, true);

        for (const key in pseudoMoves) {
            if (!pseudoMoves[key].kingExists(color)) {
                return true;
            }
        }
        return false;
    }

    /**
     * checks if king of `color` exists
     * @param color
     * @return {boolean}
     */
    kingExists (color) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.pieceAt(new Coord(i, j));
                if (piece.type() === PIECE_TYPE.KING && piece.color() === color) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * is checkmate for king of `color`
     * @param {PIECE_COLOR} color
     * @return {boolean}
     */
    isCheckmate (color) {
        return this.isCheck(color) && Object.keys(this.legalMoves(color)).length === 0;
    }

    /**
     * is stalemate for king of `color`
     * @param {PIECE_COLOR} color
     * @return {boolean}
     */
    isStalemate (color) {
        return !this.isCheck(color) && Object.keys(this.legalMoves(color)).length === 0;
    }

    /**
     * checks if only 2 kings are on board
     * @return {boolean}
     */
    isInsufficientMaterial () {
        let pieceCounter = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = this.pieceAt(new Coord(i, j));
                if (piece.type() !== PIECE_TYPE.EMPTY && piece.type() !== PIECE_TYPE.NONE &&
                    piece.type() !== PIECE_TYPE.EN_PASSANT) {
                    pieceCounter++;
                    if (pieceCounter > 2) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
