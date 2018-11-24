import View from '../../lib/view';
import Board from '../../components/chess/board';
import {GAME} from '../../lib/eventbus/events';

export default class GameView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(null, eventBus);
        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.MOVE_FAILURE, this._onMoveFailure.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));

        this._board = null;
    }

    render (root, data = {}) {
        this._root = root;
        this._board = new Board({ moveCallback: this._moveCallback.bind(this), sideOfView: data.color });
        this._board.render(root);
    }

    update () {
        this._board.render(this._root);
    }

    _moveCallback (move) {
        this._eventBus.triggerEvent(GAME.MOVE, {move});
    }

    _onMoveSuccess ({state, turn} = {}) {
        console.log('making a move', state);
        this._board.setState({ boardState: state, turn: turn });
        this.update();
    }

    _onMoveFailure () {
        console.log('move is illegal');
    }

    _onGameOver (loser) {
        console.log(`gameover ${+loser === 1 ? 'white': 'black'} lost`);
    }
}