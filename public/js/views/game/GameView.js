import View from '../../lib/view';
import Board from '../../components/chess/board/board';
import { GAME } from '../../lib/eventbus/events';

export default class GameView extends View {
    constructor ({ eventBus = {}, color = null } = {}) {
        super(null, eventBus);
        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.MOVE_FAILURE, this._onMoveFailure.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));

        this._board = null;
    }

    render (root, data = {}) {
        this._root = root;
        this._board = new Board({ moveCallback: this._moveCallback.bind(this), sideOfView: data.color });
        this._board.render(root, { move: data.move });
    }

    update ({ move = '' } = {}) {
        this._board.render(this._root, { move });
    }

    _moveCallback (move) {
        this._eventBus.triggerEvent(GAME.MOVE, { move });
    }

    _onMoveSuccess ({ state, turn, move, isCheckmate } = {}) {
        console.log('making a move', state);
        if (!this._board) {
            return;
        }
        this._board.setState({ boardState: state, turn: turn });
        this.update({ move });
        if (isCheckmate) {
            this._board.highlightKing({ turn });
        }
    }

    _onMoveFailure ({ isCheckmate, turn }) {
        console.log('move is illegal');
        if (!this._board) {
            return;
        }
        if (isCheckmate) {
            this._board.highlightKing({ turn });
        }
    }

    _onGameOver (loser) {
        console.log(`gameover ${+loser === 1 ? 'white' : 'black'} lost`);
    }
}
