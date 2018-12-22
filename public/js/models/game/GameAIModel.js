import Game from '../../lib/chess/game';
import { GAME, VIEW } from '../../lib/eventbus/events';

const moveMsg = {
    type: 'move'
};

const startMsg = {
    type: 'start'
};

export default class GameAIModel {
    constructor ({ eventBus = {}, playerColor = 0 } = {}) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent(GAME.MOVE, this._onMove.bind(this));
        this._eventBus.subscribeToEvent(VIEW.CLOSE, this._onClose.bind(this));
        this._eventBus.subscribeToEvent(GAME.INIT_GAME, this._onInitGame.bind(this));
        this._eventBus.subscribeToEvent(GAME.MODE_CHOOSE, this._onModeChoose.bind(this));
        this._eventBus.subscribeToEvent(GAME.PROMOTION_RESPONSE, this._onPromotionResponse.bind(this));
        this._game = null;
        this._promotionMove = '';

        this._playerColor = playerColor;
    }

    _onInitGame () {
        if (window.Worker) {
            this._worker = new Worker('dist/aiWorker.js');
        }
        this._game = new Game();
        this._game.printBoard();
        this._game.printLegalMoves();
    }

    _onClose () {
        this._game = null;
        if (this._worker) {
            this._worker.terminate();
        }
    }

    _onModeChoose ({ mode = 1 } = {}) {
        if (!this._worker) {
            console.log('no worker');
            return;
        }

        this._worker.onmessage = this._onWorkerMsg.bind(this);

        this._worker.postMessage({ ...startMsg, data: { mode } });
    }

    _onWorkerMsg (msg) {
        switch (msg.data.type) {
        case 'move':
            this._onWorkerMove(msg.data.data);
            break;
        default:
            console.log('Undefind msg: ' + msg.data.type);
        }
    }

    _onWorkerMove (data) {
        if (!data || !data.move) {
            console.log('NO move');
            return;
        }

        this._game.move(data.move);
        this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
            turn: this._game.turn(),
            deadPiece: this._game.findNewDeadPiece(),
            move: data.move
        });
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

            this._worker.postMessage({ ...moveMsg, data: { move: move } });
            // AI
            // this._game.move(AI.aiMove(this._game, TREE_DEPTH));
            // this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
            //     turn: this._game.turn(),
            //     deadPiece: this._game.findNewDeadPiece() });
            // if (this._game.isGameOver()) {
            //     this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
            // }

            // #### Tensorflow ####

            tf.loadModel('keras/model.json').then(model => {
                const legalMoves = this._game._board.legalMoves(this._game._turn);
                const legalMovesKeys = Object.keys(legalMoves);
                const minimaxScores = [];

                const scoreWeights = [];

                // AI.shuffleMoves(legalMovesKeys);

                legalMovesKeys.forEach(move => {
                    const newScore = AI.minimaxTreeScoreModel(legalMoves[move], TREE_DEPTH - 1, !this._game.turn(), model);
                    minimaxScores.push(newScore);
                    const weight = AI.minimaxTreeScoreModel(legalMoves[move], 0, !this._game.turn(), model);
                    scoreWeights.push(weight);
                });

                console.log('minimax', minimaxScores);
                console.log('weights', scoreWeights);

                const bestScore = Math.min(...minimaxScores);
                const bestMoveIndices = [];
                const bestMoveWeights = [];
                for (let i = 0; i < minimaxScores.length; i++) {
                    const score = minimaxScores[i];
                    if (score === bestScore) {
                        bestMoveIndices.push(i);
                        bestMoveWeights.push(scoreWeights[i]);
                    }
                }

                const bestWeightIndex = bestMoveWeights.indexOf(Math.min(...bestMoveWeights));
                const bestMoveIndex = bestMoveIndices[bestWeightIndex];



                // console.log('best moves', bestMoveIndices);
                // const bestMoveIndex = bestMoveIndices[Math.floor(Math.random() * bestMoveIndices.length)];

                // const bestMoveIndex = minimaxScores.indexOf(Math.min(...minimaxScores));
                const bestMove = legalMovesKeys[bestMoveIndex];

                console.log(minimaxScores);
                console.log(legalMovesKeys);
                console.log(bestMoveIndex);
                console.log(bestMove);
                return Promise.resolve(bestMove);
            }).then(bestMove => {
                console.log('last then', bestMove);
                this._game.move(bestMove);

                this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, { state: this._game.boardString(),
                    turn: this._game.turn(),
                    deadPiece: this._game.findNewDeadPiece() });
                if (this._game.isGameOver()) {
                    this._eventBus.triggerEvent(GAME.GAMEOVER, { turn: this._game.turn() });
                }
            });
        } else if (this._game.isLegalPromotionMove(move)) {
            this._promotionMove = move;
            this._eventBus.triggerEvent(GAME.PROMOTION, { turn: this._game.turn() });
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }
}
