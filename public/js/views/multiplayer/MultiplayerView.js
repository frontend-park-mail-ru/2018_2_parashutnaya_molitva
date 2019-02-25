import View from '../../lib/view';
import './multiplayer.less';
import template from './multiplayer.tmpl.xml';
import GameView from '../game/GameView';
import { GAME, ROUTER, SERVICE } from '../../lib/eventbus/events';
import Piece from '../../components/chess/piece/piece';
import userBlockTemplate from '../../components/userblock/userblock.xml';
import Timer from '../../components/timer/timer';
import IconPresenter from '../../components/icons-presenter/iconsPresenter';
import { COLOR } from '../../components/chess/consts';
import PromotionPopup from '../../components/popup/promotionPopup/promotionPopup';

import '../../components/popup/waitingPopup/watingPopup.less';
import Toggle from '../../components/toggle/toggle';
import voiceRecognition from '../../lib/voice';

const BLACK_COLOR_BACKGROUND = '#7f8b95c2';
export default class MultiplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);

        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));
        this._eventBus.subscribeToEvent(GAME.START_GAME, this._onStartGame.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH_RESPONSE, this._onCheckAuthResponse.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.ON_CLOSE, this._onClose.bind(this));
        this._eventBus.subscribeToEvent(GAME.PROMOTION, this._onPromotion.bind(this));

        this._isOnline = true;
    }

    render (root, data = {}) {
        super.render(root, data);

        this._renderGameOptionPopup();

        this._firstUserBlock = this.el.querySelector('.js-first');
        this._secondUserBlock = this.el.querySelector('.js-second');
        this._board = this.el.querySelector('.js-board-section');

        this._waitingPopup = this.el.querySelector('.js-waiting-popup');

        const backToMenu = this.el.querySelectorAll('.js-menu-back-x-mark');
        backToMenu.forEach((button) => {
            button.addEventListener('click', () => {
                this._eventBus.triggerEvent(ROUTER.BACK_TO_MENU);
            });
        });

        this._initGameOptionPopup();

        this._topElement = this.el.querySelector('.game');
    }

    _onCheckAuthResponse ({ isAuth, error }) {
        if (error) {
            this._eventBus.triggerEvent(ROUTER.BACK_TO_MENU);
            return;
        }
        if (!isAuth) {
            this._eventBus.triggerEvent(ROUTER.TO_SIGNIN);
            return;
        }

        this._gameoptionsPopup.classList.add('hidden');
        this._showWaitingPopup();
        this._eventBus.triggerEvent(GAME.FIND_ROOM, { duration: +this._gameDuration });
    }

    _renderGameOptionPopup () {
        this._gameoptionsPopup = this.el.querySelector('.js-game-options-popup');
        this._chooseMode = this._gameoptionsPopup.querySelector('.js-mode-choose');

        this._toggle = new Toggle({
            values: ['Online', 'Offline'],
            callBacks: [this._onOnlineCallback.bind(this), this._onOfflineCallback.bind(this)],
            classes: ['button', 'submit', 'game-options__button'],
            activeClass: 'game-options__button_active',
            disableClass: 'game-options__button_disable'
        });

        this._toggle.render(this._chooseMode);
    }

    _initGameOptionPopup () {
        const buttons = this._gameoptionsPopup.querySelectorAll('.js-game-option-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                if (this._isOnline) {
                    this._gameDuration = +button.value;
                    this._eventBus.triggerEvent(SERVICE.CHECK_AUTH);
                } else {
                    this._eventBus.triggerEvent(ROUTER.TO_OFFLINE, { duration: +button.value });
                }
            });
        });

        this._hideAll();
        this._gameoptionsPopup.classList.remove('hidden');
    }

    _onOnlineCallback () {
        this._isOnline = true;
    }

    _onOfflineCallback () {
        this._isOnline = false;
    }

    _onClose ({ message = 'Unexpected error' } = {}) {
        if (!this.isViewClosed) {
            const title = this._waitingPopup.querySelector('.js-waiting-title');
            if (!title) {
                return;
            }
            title.innerHTML = message;

            const loader = this._waitingPopup.querySelector('.js-loader');
            loader.innerHTML = '';
            loader.classList.add('hidden');
        }
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

    _renderPromotionPopup () {
        this._promotionPopup = new PromotionPopup({
            promotionCallback: ({ figure }) => {
                this._eventBus.triggerEvent(GAME.PROMOTION_RESPONSE, { figure });
            }
        });
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

    _onStartGame ({ duration, rival, you, color }) {
        this._gameView = new GameView({ eventBus: this._eventBus });
        this._renderFirstUserBlock({ duration, user: you });
        this._renderSecondUserBlock({ duration, user: rival });
        this._startTimer({ color });

        this._renderBoard({ color });
        this._showAll();
        this._closeWaitingPopup();
        this._renderPromotionPopup();

        // EASTER EGG START
        let timers = this.el.querySelectorAll(`.user-timer`);
        timers.forEach(timer => {
            timer.addEventListener('click', (event) => this._onTimerClick(event));
        });
        // EASTER EGG END
    }

    // easter egg with voice api
    _onTimerClick () {
        voiceRecognition.onResult((event) => {
            console.log(event.results);
            const last = event.results.length - 1;
            let move = event.results[last][0].transcript.split(' ').join('').toLowerCase();
            this._eventBus.triggerEvent(GAME.MOVE, { move });
        });
        voiceRecognition.start();
    }

    _startTimer ({ color }) {
        if (color === COLOR.WHITE) {
            this._timerFirst.start();
            this._timerFirstColor = true;
            this._timerSecondColor = false;
        } else {
            this._timerSecond.start();
            this._timerFirstColor = false;
            this._timerSecondColor = true;
        }
    }

    _onMoveSuccess ({ turn, deadPiece = null, yourColor, timeRemainingFirst, timeRemainingSecond } = {}) {
        if (yourColor) {
            this._timerFirst.set({ seconds: timeRemainingFirst });
            this._timerSecond.set({ seconds: timeRemainingSecond });
        } else {
            this._timerFirst.set({ seconds: timeRemainingSecond });
            this._timerSecond.set({ seconds: timeRemainingFirst });
        }
        if (turn) {
            if (deadPiece != null && yourColor) {
                this._secondFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            } else if (deadPiece != null) {
                this._firstFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            }
            this._whiteTurn();
        } else {
            if (deadPiece != null && yourColor) {
                this._firstFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            } else if (deadPiece != null) {
                this._secondFigures.add(new Piece(deadPiece.piece, deadPiece.color));
            }
            this._blackTurn();
        }
    }

    _whiteTurn () {
        if (this._timerFirstColor) {
            this._timerSecond.stop();
            this._timerFirst.start();
        } else {
            this._timerFirst.stop();
            this._timerSecond.start();
        }

        this._topElement.style.backgroundColor = '';
    }

    _blackTurn () {
        if (!this._timerSecondColor) {
            this._timerFirst.stop();
            this._timerSecond.start();
        } else {
            this._timerSecond.stop();
            this._timerFirst.start();
        }

        this._topElement.style.backgroundColor = BLACK_COLOR_BACKGROUND;
    }

    _onGameOver ({ result } = {}) {
        this._timerFirst.stop();
        this._timerSecond.stop();

        this._showWinnerPopup({ result });
    }

    _showWaitingPopup () {
        this._waitingPopup.classList.remove('hidden');
    }

    _closeWaitingPopup () {
        this._waitingPopup.classList.add('hidden');
        this._waitingPopup.innerHTML = '';
    }

    _showWinnerPopup ({ result }) {
        let popup = this.el.querySelector('.js-winner-popup');
        popup.classList.remove('hidden');

        if (result.result === 'win') {
            const win = popup.querySelectorAll('.js-win');
            win.forEach((el) => {
                el.classList.remove('hidden');
            });
            const newScore = popup.querySelector('.js-new-score-win');
            newScore.innerHTML = `New score: ${result.score}`;
        } else {
            const lose = popup.querySelectorAll('.js-lose');
            lose.forEach((el) => {
                el.classList.remove('hidden');
            });
            const newScore = popup.querySelector('.js-new-score-lose');
            newScore.innerHTML = `New score: ${result.score}`;
        }
    }

    _renderBoard ({ color }) {
        this._gameView.render(this._board, { color });
    }

    _renderFirstUserBlock ({ duration = 600, user = {} } = {}) {
        this._firstUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({
            isFirst: true,
            user: user,
            isOnline: true
        }));
        this._firstAvatar = this._firstUserBlock.querySelector('.js-first-avatar');
        this._firstAvatar.style.backgroundImage = `url(${user.avatar})`;

        this._timerFirstElement = this.el.querySelector('.js-timer-first');
        this._timerFirst = new Timer({ root: this._timerFirstElement, duration });
        this._timerFirst.render();

        this._firstFiguresElement = this.el.querySelector('.js-figures-first');
        this._firstFigures = new IconPresenter({ root: this._firstFiguresElement });
        this._firstFigures.render();

        this._buttonSurrenderFirst = this.el.querySelector('.js-surrender-first');
        this._buttonSurrenderFirst.classList.remove('hidden');
        this._buttonSurrenderFirst.addEventListener('click', () => {
            this._eventBus.triggerEvent(GAME.SURRENDER);
        });
    }

    _renderSecondUserBlock ({ duration = 600, user = {} } = {}) {
        this._secondUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({
            isFirst: false,
            user: user,
            isOnline: true
        }));
        this._secondAvatar = this._secondUserBlock.querySelector('.js-second-avatar');
        this._secondAvatar.style.backgroundImage = `url(${user.avatar})`;

        this._timerSecondElement = this.el.querySelector('.js-timer-second');
        this._timerSecond = new Timer({ root: this._timerSecondElement, duration });
        this._timerSecond.render();

        this._secondFiguresElement = this.el.querySelector('.js-figures-second');
        this._secondFigures = new IconPresenter({ root: this._secondFiguresElement });
        this._secondFigures.render();
    }
}
