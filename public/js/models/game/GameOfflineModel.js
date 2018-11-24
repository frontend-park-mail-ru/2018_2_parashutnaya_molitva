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

    }

    _onInitGame(){

    }

    _onMove ({move = ""} = {}) {
        const legalMoves = this._game.legalMoves();
        if (legalMoves.includes(move)) {
            this._game.move(move);

            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, {state: this._game.boardString(), turn: this._game.turn(),
                deadPiece: this._game.findNewDeadPiece()});
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, {turn: this._game.turn()});
            }
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }

}
