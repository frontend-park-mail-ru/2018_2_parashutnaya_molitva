import Board from './board';
import { PIECE_COLOR } from './enums';
import {COLOR, PIECE_TYPE} from "../../components/chess/consts";

export default class Game {
    constructor () {
        this._board = new Board();
        this._turn = PIECE_COLOR.WHITE;

        this._whiteAlive = {
            [PIECE_TYPE.PAWN]: 8,
            [PIECE_TYPE.KNIGHT]: 2,
            [PIECE_TYPE.BISHOP]: 2,
            [PIECE_TYPE.ROOK]: 2,
            [PIECE_TYPE.QUEEN]: 1,
            [PIECE_TYPE.KING]: 1,
        };

        this._blackAlive = {
            [PIECE_TYPE.PAWN]: 8,
            [PIECE_TYPE.KNIGHT]: 2,
            [PIECE_TYPE.BISHOP]: 2,
            [PIECE_TYPE.ROOK]: 2,
            [PIECE_TYPE.QUEEN]: 1,
            [PIECE_TYPE.KING]: 1,
        };
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
     * returns array of moves
     * @return {string[]}
     */
    legalMoves () {
        const legalMoves = this._board.legalMoves(this._turn);
        return Object.keys(legalMoves);
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

    /**
     * returns board state
     * example (new game): 'RNBQKBNRPPPPPPPP................................pppppppprnbqkbnr'
     * @return {string}
     */
    boardString () {
        return this._board.toString();
    }

    /**
     * returns true if white
     * returns false if black
     * @return {boolean}
     */
    turn () {
        return this._turn === PIECE_COLOR.WHITE;
    }

    /**
     *  return last dead piece
      * @returns {{piece: number, color: number}}
     */
    findNewDeadPiece() {
        const board = this.boardString();
        const turn = this.turn();

        if (turn) {
            const pawnCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'P' ? count + 1 : count
            }, 0);

            if (pawnCurrentCount < this._whiteAlive[PIECE_TYPE.PAWN]) {
                this._whiteAlive[PIECE_TYPE.PAWN]--;
                return {piece: PIECE_TYPE.PAWN, color: COLOR.WHITE};
            }

            const knightCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'N' ? count + 1 : count
            }, 0);

            if (knightCurrentCount < this._whiteAlive[PIECE_TYPE.KNIGHT]){
                this._whiteAlive[PIECE_TYPE.KNIGHT]--;
                return {piece: PIECE_TYPE.KNIGHT, color: COLOR.WHITE};
            }

            const bishopCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'B' ? count + 1 : count
            }, 0);

            if (bishopCurrentCount < this._whiteAlive[PIECE_TYPE.BISHOP]){
                this._whiteAlive[PIECE_TYPE.BISHOP]--;
                return {piece: PIECE_TYPE.BISHOP, color: COLOR.WHITE};
            }

            const rookCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'R' ? count + 1 : count
            }, 0);

            if (rookCurrentCount < this._whiteAlive[PIECE_TYPE.ROOK]){
                this._whiteAlive[PIECE_TYPE.ROOK]--;
                return {piece: PIECE_TYPE.ROOK, color: COLOR.WHITE};
            }

            const qCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'Q' ? count + 1 : count
            }, 0);

            if (qCurrentCount < this._whiteAlive[PIECE_TYPE.QUEEN]){
                this._whiteAlive[PIECE_TYPE.QUEEN]--;
                return {piece: PIECE_TYPE.QUEEN, color: COLOR.WHITE};
            }

            const kCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'K' ? count + 1 : count
            }, 0);

            if (kCurrentCount < this._whiteAlive[PIECE_TYPE.KING]){
                this._whiteAlive[PIECE_TYPE.KING]--;
                return {piece: PIECE_TYPE.KING, color: COLOR.WHITE};
            }
        } else {
            const pawnCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'p' ? count + 1 : count
            }, 0);

            if (pawnCurrentCount < this._blackAlive[PIECE_TYPE.PAWN]) {
                this._blackAlive[PIECE_TYPE.PAWN]--;
                return {piece: PIECE_TYPE.PAWN, color: COLOR.BLACK};
            }

            const knightCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'n' ? count + 1 : count
            }, 0);

            if (knightCurrentCount < this._blackAlive[PIECE_TYPE.KNIGHT]){
                this._blackAlive[PIECE_TYPE.KNIGHT]--;
                return {piece: PIECE_TYPE.KNIGHT, color: COLOR.BLACK};
            }

            const bishopCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'b' ? count + 1 : count
            }, 0);

            if (bishopCurrentCount < this._blackAlive[PIECE_TYPE.BISHOP]){
                this._blackAlive[PIECE_TYPE.BISHOP]--;
                return {piece: PIECE_TYPE.BISHOP, color: COLOR.BLACK};
            }

            const rookCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'r' ? count + 1 : count
            }, 0);

            if (rookCurrentCount < this._blackAlive[PIECE_TYPE.ROOK]){
                this._blackAlive[PIECE_TYPE.ROOK]--;
                return {piece: PIECE_TYPE.ROOK, color: COLOR.BLACK};
            }

            const qCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'q' ? count + 1 : count
            }, 0);

            if (qCurrentCount < this._blackAlive[PIECE_TYPE.QUEEN]){
                this._blackAlive[PIECE_TYPE.QUEEN]--;
                return {piece: PIECE_TYPE.QUEEN, color: COLOR.BLACK};
            }

            const kCurrentCount = [...board].reduce((count, piece) => {
                return piece === 'k' ? count + 1 : count
            }, 0);

            if (kCurrentCount < this._blackAlive[PIECE_TYPE.KING]){
                this._blackAlive[PIECE_TYPE.KING]--;
                return {piece: PIECE_TYPE.KING, color: COLOR.BLACK};
            }
        }

    }

    /**
     * example: white pawn e7e8 is promotion if e7e8q, e7e8n, etc. exist
     * @param {string} move
     * @return {boolean}
     */
    isLegalPromotionMove (move) {
        const legalMoves = this.legalMoves();
        for (let i = 0; i < legalMoves.length; i++) {
            if (legalMoves[i].startsWith(move) && legalMoves[i].length === 5) {
                return true;
            }
        }
        return false;
    }
}
