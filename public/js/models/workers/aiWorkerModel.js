
import Game from '../../lib/chess/game';
import AI from '../../lib/chess/ai';

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
        default:
            console.log('Unknow mode');
            break;
        }
    }

    move (move) {}

    moveFirstMode (move) {
        this._game.move(move);
        const aiMove = AI.aiMove(this._game, 1);
        this._game.move(aiMove);
        return aiMove;
    }

    moveSecondMode (move) {
        this._game.move(move);
        const aiMove = AI.aiMove(this._game, 2);
        this._game.move(aiMove);
        return aiMove;
    }

    moveThirdMode () {

    }
}
