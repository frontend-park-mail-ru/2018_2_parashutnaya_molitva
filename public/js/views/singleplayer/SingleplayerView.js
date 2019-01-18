import './singleplayer.less';
import '../../components/popup/winnerPopup/winnerPopup.less';
import '../../components/popup/gameoptionPopup/gameoptionPopup.less';
import template from './singleplayer.tmpl.xml';
import '../../components/userblock/userblock.less';
import userBlockTemplate from '../../components/userblock/userblock.xml';
import '../../components/popup/promotionPopup/promotion-popup.less';
import PromotionPopup from '../../components/popup/promotionPopup/promotionPopup';
import View from '../../lib/view';
import GameView from '../game/GameView';
import Timer from '../../components/timer/timer';
import IconPresenter from '../../components/icons-presenter/iconsPresenter';
import Piece from '../../components/chess/piece/piece';
import { GAME, ROUTER, VIEW } from '../../lib/eventbus/events';
import Toggle from '../../components/toggle/toggle';
import { GAME_MODE } from '../../models/game/mode';
import { COLOR } from '../../components/chess/consts';
import voiceRecognition from '../../lib/voice';

const BLACK_COLOR_BACKGROUND = '#7f8b95c2';

export default class SingleplayerView extends View {
    constructor ({ eventBus = {}, eventBusAi = {} } = {}) {
        super(template, eventBus);
        this._gameView = null;
        this._eventBusAi = eventBusAi;

        this._eventBusAi.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBusAi.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));
        this._eventBusAi.subscribeToEvent(GAME.PROMOTION, this._onPromotion.bind(this));

        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));
        this._eventBus.subscribeToEvent(GAME.PROMOTION, this._onPromotion.bind(this));

        this._currentEventBus = null;
    }

    close () {
        this.isViewClosed = true;
        try {
            this._currentEventBus.triggerEvent(VIEW.CLOSE);
        } catch (e) {
            console.log('no such event: VIEW.CLOSE');
        }
        this._gameView = null;
        if (this._timerFirst) {
            this._timerFirst.stop();
        }

        if (this._timerSecond) {
            this._timerSecond.stop();
        }
    }

    render (root, data = {}) {
        super.render(root, data);

        this._gameMode = GAME_MODE.EASY_OFFLINE;

        this._firstUserBlock = this.el.querySelector('.js-first');
        this._secondUserBlock = this.el.querySelector('.js-second');
        this._board = this.el.querySelector('.js-board-section');

        this._topElement = this.el.querySelector('.game');

        if (data.duration && data.mode === GAME_MODE.OFFLINE) {
            this._gameMode = GAME_MODE.OFFLINE;
            this._currentEventBus = this._eventBus;
            this._gameView = new GameView({ eventBus: this._currentEventBus });
            this._aiView = false;
            this._initGameView({ duration: data.duration });
        } else {
            this._aiView = true;
            this._playerColor = COLOR.WHITE;
            this._currentEventBus = this._eventBusAi;
            this._gameView = new GameView({ eventBus: this._currentEventBus, color: COLOR.WHITE });
            this._renderGameOptionPopup();
            this._showGameOptionPopup();
        }

        this._currentEventBus.triggerEvent(GAME.INIT_GAME);

        const backToMenu = this.el.querySelectorAll('.js-menu-back-x-mark');
        backToMenu.forEach((button) => {
            button.addEventListener('click', () => {
                this._currentEventBus.triggerEvent(ROUTER.BACK_TO_MENU);
            });
        });
    }

    _renderGameOptionPopup () {
        this._gameoptionsPopup = this.el.querySelector('.js-game-options-popup');
        this._chooseMode = this._gameoptionsPopup.querySelector('.js-mode-choose');
        this._toggle = new Toggle({
            values: ['Easy', 'Normal', 'Hard'],
            callBacks: [this._onEasyCallback.bind(this), this._onNormalCallback.bind(this),
                this._onHardCallback.bind(this)],
            classes: ['button', 'submit', 'game-options__button'],
            activeClass: 'game-options__button_active',
            disableClass: 'game-options__button_disable'
        });
        this._toggle.render(this._chooseMode);
    }

    _onEasyCallback () {
        this._gameMode = GAME_MODE.EASY_OFFLINE;
    }

    _onNormalCallback () {
        this._gameMode = GAME_MODE.NORMAL_OFFLINE;
    }

    _onHardCallback () {
        this._gameMode = GAME_MODE.HARD_OFFLINE;
    }

    _hideAll () {
        this._firstUserBlock.classList.add('hidden');
        this._secondUserBlock.classList.add('hidden');
        this._board.classList.add('hidden');
    }

    _showAll () {
        this._firstUserBlock.classList.remove('hidden');
        this._secondUserBlock.classList.remove('hidden');
        this._board.classList.remove('hidden');
    }

    _showGameOptionPopup () {
        const buttons = this._gameoptionsPopup.querySelectorAll('.js-game-option-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this._initGameView({ duration: +button.value });
                this._gameoptionsPopup.classList.add('hidden');
            });
        });

        this._hideAll();
        this._gameoptionsPopup.classList.remove('hidden');
    }

    _initGameView ({ duration }) {
        this._renderBoard();
        this._renderFirstUserBlock({ duration: duration });
        this._renderSecondUserBlock({ duration: duration });
        this._renderPromotionPopup();

        this._startGame();

        this._showAll();

        this._currentEventBus.triggerEvent(GAME.MODE_CHOOSE, { mode: this._gameMode });
    }

    _startGame () {
        this._timerFirst.start();
        // EASTER EGG START
        let timers = this.el.querySelectorAll(`.user-timer`);
        timers.forEach(timer => {
            timer.addEventListener('click', (event) => this._onTimerClick(event));
        });
        // EASTER EGG END
    }

    // easter egg with voice api
    _onTimerClick (event) {
        voiceRecognition.onResult((event) => {
            console.log(event.results);
            const last = event.results.length - 1;
            let move = event.results[last][0].transcript.split(' ').join('').toLowerCase();
            this._currentEventBus.triggerEvent(GAME.MOVE, { move });
        });
        voiceRecognition.start();
    }

    _renderPromotionPopup () {
        this._promotionPopup = new PromotionPopup({ promotionCallback: ({ figure }) => {
            this._currentEventBus.triggerEvent(GAME.PROMOTION_RESPONSE, { figure });
        } });
        this._promotionPopupElement = this.el.querySelector('.js-promotion-popup-container');
        this._promotionPopup.render(this._promotionPopupElement);
    }

    _onPromotion ({ turn }) {
        if (turn) {
            this._promotionPopup._showPromotionPopupWhite();
        } else {
            this._promotionPopup._showPromotionPopupBlack();
        }
    }

    _onMoveSuccess ({ turn, deadPiece = null } = {}) {
        console.log('m');
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

    _whiteTurn () {
        this._timerSecond.stop();
        this._timerFirst.start();
        this._topElement.style.backgroundColor = '';

        if (this._aiView && this._playerColor === COLOR.WHITE) {
            this._board.style.pointerEvents = 'auto';
        } else {
            this._buttonSurrenderFirst.classList.remove('hidden_visibility');
            this._buttonSurrenderSecond.classList.add('hidden_visibility');
        }
    }

    _blackTurn () {
        this._timerFirst.stop();
        this._timerSecond.start();
        this._topElement.style.backgroundColor = BLACK_COLOR_BACKGROUND;

        if (this._aiView && this._playerColor === COLOR.WHITE) {
            this._board.style.pointerEvents = 'none';
        } else {
            this._buttonSurrenderSecond.classList.remove('hidden_visibility');
            this._buttonSurrenderFirst.classList.add('hidden_visibility');
        }
    }

    _whiteTimerExpire () {
        console.log('Black win');
        this._showWinnerPopup({ turn: true });
        this._timerSecond.stop();
    }

    _blackTimerExpire () {
        console.log('White win');
        this._showWinnerPopup({ turn: false });
        this._timerFirst.stop();
    }

    _onGameOver ({ turn }) {
        this.close();
        this._showWinnerPopup({ turn });
    }

    _showWinnerPopup ({ turn }) {
        let popup = this.el.querySelector('.js-winner-popup');
        popup.classList.remove('hidden');

        if (!turn) {
            popup.querySelector('.js-white-winner').classList.remove('hidden');
        } else {
            popup.querySelector('.js-black-winner').classList.remove('hidden');
        }
    }

    _renderBoard () {
        this._gameView.render(this._board);
    }

    _renderFirstUserBlock ({ duration = 600 } = {}) {
        this._firstUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({ isFirst: true }));

        this._timerFirstElement = this.el.querySelector('.js-timer-first');
        this._timerFirst = new Timer({ root: this._timerFirstElement,
            duration,
            timerExpireCallback: this._whiteTimerExpire.bind(this) });
        this._timerFirst.render();

        this._whiteFiguresElement = this.el.querySelector('.js-figures-first');
        this._whiteFigures = new IconPresenter({ root: this._whiteFiguresElement });
        this._whiteFigures.render();

        this._buttonSurrenderFirst = this.el.querySelector('.js-surrender-first');
        this._buttonSurrenderFirst.addEventListener('click', () => {
            this._onGameOver({ turn: true });
        });
    }

    _renderSecondUserBlock ({ duration = 600 } = {}) {
        this._secondUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({ isFirst: false }));

        this._timerSecondElement = this.el.querySelector('.js-timer-second');
        this._timerSecond = new Timer({ root: this._timerSecondElement,
            duration,
            timerExpireCallback: this._blackTimerExpire.bind(this) });
        this._timerSecond.render();

        this._blackFiguresElement = this.el.querySelector('.js-figures-second');
        this._blackFigures = new IconPresenter({ root: this._blackFiguresElement });
        this._blackFigures.render();

        this._buttonSurrenderSecond = this.el.querySelector('.js-surrender-second');
        this._buttonSurrenderSecond.classList.add('hidden_visibility');
        this._buttonSurrenderSecond.addEventListener('click', () => {
            this._onGameOver({ turn: false });
        });
    }
}
