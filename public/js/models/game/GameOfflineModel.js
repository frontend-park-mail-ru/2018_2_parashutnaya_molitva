import Game from '../../lib/chess/game';
import {GAME} from '../../lib/eventbus/events';
import {COLOR, PIECE_TYPE} from "../../components/chess/consts";
import Timer from "../../components/timer/timer";

export default class GameOfflineModel {
    constructor ({eventBus = {}} = {}) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent(GAME.MOVE, this._onMove.bind(this));

        this._game = new Game();
        this._game.printBoard();
        this._game.printLegalMoves();

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

    _onMove ({move = ""} = {}) {
        const legalMoves = this._game.legalMoves();
        if (legalMoves.includes(move)) {
            this._game.move(move);
            const boardString = this._game.boardString();
            const turn = this._game.turn();
            const deadPiece = this._findNewDeadPiece(boardString, turn);
            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, {state: boardString, turn: this._game.turn(), deadPiece});
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, {turn: this._game.turn()});
            }
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }

    _findNewDeadPiece(board, turn) {
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
                this._whiteAlive[PIECE_TYPE.KNIGHT]--;
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


}
