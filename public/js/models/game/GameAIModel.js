import Game from '../../lib/chess/game';
import {PIECE_COLOR} from '../../lib/chess/enums';
import { GAME } from '../../lib/eventbus/events';

export default class GameAIModel {
    constructor ({ eventBus = {}, playerColor = 0 } = {}) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent(GAME.MOVE, this._onMove.bind(this));
        this._eventBus.subscribeToEvent(GAME.INIT_GAME, this._onInitGame.bind(this));
        this._eventBus.subscribeToEvent(GAME.PROMOTION_RESPONSE, this._onPromotionResponse.bind(this));
        this._game = null;
        this._promotionMove = '';

        this._playerColor = playerColor;
    }

    _onInitGame () {
        this._game = new Game();
        this._game.printBoard();
        this._game.printLegalMoves();
    }

    _onPromotionResponse ({ figure }) {
        if (!this._promotionMove) {
            return;
        }

        this._onMove({ move: this._promotionMove + figure });
    }

    _onMove ({ move = '' } = {}) {
        console.log(this._game.isLegalPromotionMove(move));
        const legalMoves = this._game.legalMoves();
        if (legalMoves.includes(move)) {
            this._game.move(move);

            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
                turn: this._game.turn(),
                deadPiece: this._game.findNewDeadPiece() });
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
            }

            // AI
            this._game.move(this._aiMove());

            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
                turn: this._game.turn(),
                deadPiece: this._game.findNewDeadPiece() });
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
            }
        } else if (this._game.isLegalPromotionMove(move)) {
            this._promotionMove = move;
            this._eventBus.triggerEvent(GAME.PROMOTION, { turn: this._game.turn() });
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }

    _aiMove () {
        console.log('material sum', this._game.materialSum());
        console.log('minimax best score', this._minimaxTreeScore(
            this._game._board, 3,
            this._playerColor === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE));
        const legalMoves = this._game.legalMoves();
        return legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    _minimaxTreeScore (board, depth, color) {
        if (depth === 0) {
            return board.materialSum();
        }

        const legalMoves = board.legalMoves(color);
        const legalMovesKeys = Object.keys(legalMoves);
        let bestScore = color === PIECE_COLOR.WHITE ? -13337 : 13337;
        legalMovesKeys.forEach(move => {
            const newBoard = legalMoves[move];
            const newScore = this._minimaxTreeScore(
                newBoard,
                depth - 1,
                color === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE
            );

            bestScore = color === PIECE_COLOR.WHITE ? Math.max(bestScore, newScore) : Math.min(bestScore, newScore);
        });
        return bestScore;
    }
}
