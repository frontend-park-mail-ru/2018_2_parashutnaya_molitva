import Board from './board';
import { PIECE_COLOR } from './enums';

export default class Game {
    constructor () {
        this._board = new Board();
        this._turn = PIECE_COLOR.WHITE;
    }

    /**
     * changes board if move is legal
     * throws error if not
     * @param {string} uci
     * @throws will throw an error if move is illegal
     */
    move (uci) {
        const legalMoves = this._board.legalMoves(this._turn);
        const newBoard = legalMoves[uci];

        if (newBoard === undefined) {
            throw new Error(`${uci} is illegal`);
        }
        this._board = newBoard.copy();
        this._turn = this._turn === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE;
    }

    /**
     * is checkmate for current turn
     * @return {boolean}
     */
    isCheckmate () {
        return this._board.isCheckmate(this._turn);
    }

    /**
     * is stalemate for current turn
     * @return {boolean}
     */
    isStalemate () {
        return this._board.isStalemate(this._turn);
    }

    /**
     * return true if only 2 kings left
     * @return {boolean}
     */
    isInsufficientMaterial () {
        return this._board.isInsufficientMaterial();
    }

    /**
     * returns true if game ended
     * @return {boolean}
     */
    isGameOver () {
        return this.isCheckmate() || this.isStalemate() || this.isInsufficientMaterial();
    }

    /**
     * prints board
     */
    printBoard () {
        this._board.print();
    }

    /**
     * prints legal moves for current turn
     */
    printLegalMoves () {
        const legalMoves = this._board.legalMoves(this._turn);
        let result = '';
        for (const key in legalMoves) {
            result += key + ' ';
        }
        console.log(result);
    }
}
