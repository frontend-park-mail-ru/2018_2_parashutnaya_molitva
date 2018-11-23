import './singleplayer.less';
import View from '../../lib/view';
import template from './singleplayer.tmpl.xml';
import GameView from "../game/GameView";
import Timer from '../../components/timer/timer';
import IconPresenter from '../../components/icons-presenter/iconsPresenter';
import userBlockTemplate from '../../components/userblock/userblock.xml';
import Piece from '../../components/chess/piece';
import {COLOR, PIECE_TYPE} from "../../components/chess/consts";
import {GAME} from "../../lib/eventbus/events";

const BLACK_COLOR_BACKGROUND = "#7f8b9575";
const ACTIVE_TIMER_COLOR_BACKGROUND = "#fffff2";

export default class SingleplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._gameView = new GameView({eventBus});

        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
    }

    render (root, data = {}) {
        super.render(root, data);
        this._topElement = this.el.querySelector('.game');
        const board = this.el.querySelector('.js-board-section');
        this._gameView.render(board);

        this._renderFirstUserBlock();
        this._renderSecondUserBlock();

        this._startGame()
    }

    _startGame() {
        this._timerFirst.start();
    }

    _onMoveSuccess({turn, deadPiece = null} = {}){
        if (turn) {
            if (deadPiece != null) {
                this._blackFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            }
            this._whiteTurn();
        } else {
            if (deadPiece != null) {
                this._whiteFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            }
            this._blackTurn();
        }
    }

    _whiteTurn() {
        this._timerSecond.stop();

        this._topElement.style.backgroundColor = "";

        this._timerFirst.start();
    }

    _blackTurn() {
        this._timerFirst.stop();

        this._topElement.style.backgroundColor = BLACK_COLOR_BACKGROUND;

        this._timerSecond.start();
    }

    _renderFirstUserBlock() {
        this._firstUserBlock = this.el.querySelector('.js-first');
        this._firstUserBlock.insertAdjacentHTML('afterbegin',userBlockTemplate({isFirst: true}));

        this._timerFirstElement = this.el.querySelector('.js-timer-first');
        this._timerFirst = new Timer({root: this._timerFirstElement});
        this._timerFirst.render();

        this._whiteFiguresElement = this.el.querySelector('.js-figures-white');
        this._whiteFigures = new IconPresenter({root: this._whiteFiguresElement});
        this._whiteFigures.render();
    }

    _renderSecondUserBlock() {
        this._secondUserBlock = this.el.querySelector('.js-second');
        this._secondUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({isFirst: false}));

        this._timerSecondElement = this.el.querySelector('.js-timer-second');
        this._timerSecond = new Timer({root: this._timerSecondElement});
        this._timerSecond.render();

        this._blackFiguresElement = this.el.querySelector('.js-figures-black');
        this._blackFigures = new IconPresenter({root: this._blackFiguresElement});
        this._blackFigures.render();
    }

}
