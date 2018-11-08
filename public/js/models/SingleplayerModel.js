import Game from '../lib/chess/game';

export default class SingleplayerModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('tryMove', this._onTryMove.bind(this));

        this._game = new Game();
        this._game.printBoard();
        this._game.printLegalMoves();
    }

    _onTryMove (move) {
        const legalMoves = this._game.legalMoves();
        if (legalMoves.includes(move)) {
            this._game.move(move);
            this._eventBus.triggerEvent('moveSuccess', this._game.boardString());
            if (this._game.isGameOver()) {
                this._eventBus.triggerEvent('gameOver');
            }
        } else {
            this._eventBus.triggerEvent('moveFailure');
        }
    }
}
