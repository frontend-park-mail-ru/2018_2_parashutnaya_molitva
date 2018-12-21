import Game from '../../lib/chess/game';
import {PIECE_COLOR} from '../../lib/chess/enums';
import { GAME } from '../../lib/eventbus/events';
import AI from '../../lib/chess/ai';
import * as tf from '@tensorflow/tfjs';

const TREE_DEPTH = 2;

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
            this._game.move(AI.aiMove(this._game, TREE_DEPTH));
            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
                turn: this._game.turn(),
                deadPiece: this._game.findNewDeadPiece() });
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
            }

            // #### Tensorflow ####
            //
            // tf.loadModel('keras/model.json').then(model => {
            //     const legalMoves = this._game._board.legalMoves(this._game._turn);
            //     const legalMovesKeys = Object.keys(legalMoves);
            //     const oneHotBoards = [];
            //     legalMovesKeys.forEach(move => {
            //         const oneHotBoard = AI.boardToOneHot(legalMoves[move]);
            //         oneHotBoards.push(oneHotBoard);
            //     });
            //     const boardsTensor = tf.tensor(oneHotBoards);
            //
            //     console.log('model loaded');
            //     const predictions = model.predict(boardsTensor);
            //     const predictionsFloat32Array = predictions.dataSync();
            //     const predictionsArray = Array.from(predictionsFloat32Array);
            //
            //     const bestMoveIndex = predictionsArray.indexOf(Math.min(...predictionsArray));
            //     const bestMove = legalMovesKeys[bestMoveIndex];
            //
            //     console.log(predictionsArray);
            //     console.log(legalMovesKeys);
            //     console.log(bestMoveIndex);
            //     console.log(bestMove);
            //     return Promise.resolve(bestMove);
            // }).then(bestMove => {
            //     console.log('last then', bestMove);
            //     this._game.move(bestMove);
            //
            //     this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
            //         turn: this._game.turn(),
            //         deadPiece: this._game.findNewDeadPiece() });
            //     if (this._game.isGameOver()) {
            //         this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
            //     }
            // });
        } else if (this._game.isLegalPromotionMove(move)) {
            this._promotionMove = move;
            this._eventBus.triggerEvent(GAME.PROMOTION, { turn: this._game.turn() });
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }
}
