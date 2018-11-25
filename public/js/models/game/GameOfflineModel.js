import Game from '../../lib/chess/game';
import {GAME} from '../../lib/eventbus/events';
import {COLOR, PIECE_TYPE} from "../../components/chess/consts";
import Timer from "../../components/timer/timer";

export default class GameOfflineModel {
    constructor ({eventBus = {}} = {}) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent(GAME.MOVE, this._onMove.bind(this));
        this._eventBus.subscribeToEvent(GAME.INIT_GAME, this._onInitGame.bind(this));
        this._game = null;
    }

    _onInitGame(){
        this._game = new Game();
        this._game.printBoard();
        this._game.printLegalMoves();
    }

    _onMove ({move = ""} = {}) {
        console.log(this._game.isLegalPromotionMove(move));
        const legalMoves = this._game.legalMoves();
        if (legalMoves.includes(move)) {
            this._game.move(move);

            this._eventBus.triggerEvent(GAME.MOVE_SUCCESS, {state: this._game.boardString(), turn: this._game.turn(),
                deadPiece: this._game.findNewDeadPiece()});
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent(GAME.GAMEOVER, {turn: this._game.turn()});
            }
        } else if (this._game.isLegalPromotionMove(move)) {
            const promotionPiece = prompt('promotion (q,r,b,n)');
            this._onMove({ move: move + promotionPiece });
        } else {
            this._eventBus.triggerEvent(GAME.MOVE_FAILURE);
        }
    }

}
