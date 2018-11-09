import View from '../../lib/view';
import template from './singleplayer.tmpl.xml';
import Board from '../../components/chess/board';

export default class SingleplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('moveSuccess', this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent('moveFailure', this._onMoveFailure.bind(this));
        this._eventBus.subscribeToEvent('gameOver', this._onGameOver.bind(this));

        this._board = new Board({ moveCallback: this._moveCallback.bind(this) });
    }

    render (root, data = {}) {
        super.render(root, data);

        const singlePlayerElement = this.el.querySelector('.singleplayer');
        this._board.render(singlePlayerElement);
    }

    _moveCallback (move) {
        this._eventBus.triggerEvent('tryMove', move);
    }

    _onMoveSuccess (state, turn) {
        console.log('making a move', state);
        const singlePlayerElement = this.el.querySelector('.singleplayer');
        this._board.setState({ boardState: state, turn: turn });
        this._board.render(singlePlayerElement);
    }

    _onMoveFailure () {
        console.log('move is illegal');
    }

    _onGameOver () {
        console.log('gameover');
    }
}
