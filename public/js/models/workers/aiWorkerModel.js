
import Game from '../../lib/chess/game';
import AI from '../../lib/chess/ai';
import * as tf from '@tensorflow/tfjs';

export default class AiModel {
    constructor (mode) {
        this._mode = mode;
        this._game = new Game();

        switch (mode) {
        case 1:
            this.move = this.moveFirstMode;
            break;
        case 2:
            this.move = this.moveSecondMode;
            break;
        case 3:
            this.move = this.moveThirdMode;
            break;
        default:
            console.log('Unknow mode');
            break;
        }
    }

    move (move) {}

    moveFirstMode (move) {
        return new Promise((resolve) => {
            this._game.move(move);
            const aiMove = AI.aiMove(this._game, 1);
            this._game.move(aiMove);
            resolve(aiMove);
        }).catch((err) => {});
    }

    moveSecondMode (move) {
        return new Promise((resolve) => {
            this._game.move(move);
            const aiMove = AI.aiMove(this._game, 2);
            this._game.move(aiMove);
            resolve(aiMove);
        }).catch((err) => console.log(err));
    }

    moveThirdMode (move) {

        return tf.loadModel('keras/model.json').then(model => {
            this._game.move(move);
            const legalMoves = this._game._board.legalMoves(this._game._turn);
            const legalMovesKeys = Object.keys(legalMoves);
            const oneHotBoards = [];
            legalMovesKeys.forEach(move => {
                const oneHotBoard = AI.boardToOneHot(legalMoves[move]);
                oneHotBoards.push(oneHotBoard);
            });
            const boardsTensor = tf.tensor(oneHotBoards);

            console.log('model loaded');
            const predictions = model.predict(boardsTensor);
            const predictionsFloat32Array = predictions.dataSync();
            const predictionsArray = Array.from(predictionsFloat32Array);

            const bestMoveIndex = predictionsArray.indexOf(Math.min(...predictionsArray));
            const bestMove = legalMovesKeys[bestMoveIndex];

            console.log(predictionsArray);
            console.log(legalMovesKeys);
            console.log(bestMoveIndex);
            console.log(bestMove);
            this._game.move(bestMove);
            return bestMove;
        }).catch((err) => console.log(err));
    }
}
