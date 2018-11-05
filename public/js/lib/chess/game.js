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

    isCheckmate () {
        return this._board.isCheckmate(this._turn);
    }

    isStalemate () {
        return this._board.isStalemate(this._turn);
    }

    isGameOver () {
        return this.isCheckmate() || this.isStalemate();
    }

    printBoard () {
        this._board.print();
    }

    printLegalMoves () {
        const legalMoves = this._board.legalMoves(this._turn);
        let result = '';
        for (const key in legalMoves) {
            result += key + ' ';
        }
        console.log(result);
    }
}
