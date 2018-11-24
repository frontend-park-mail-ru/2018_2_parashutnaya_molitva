import View from "../../lib/view";
import template from './multiplayer.tmpl.xml';
import GameView from "../game/GameView";
import {GAME, ROUTER, SERVICE} from "../../lib/eventbus/events";
import Piece from "../../components/chess/piece";
import userBlockTemplate from "../../components/userblock/userblock.xml";
import Timer from "../../components/timer/timer";
import IconPresenter from "../../components/icons-presenter/iconsPresenter";
import {COLOR} from "../../components/chess/consts";

const BLACK_COLOR_BACKGROUND = "#7f8b9575";

export default class MultiplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._gameView = new GameView({eventBus});

        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));
        this._eventBus.subscribeToEvent(GAME.START_GAME, this._onStartGame.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH_RESPONSE, this._onCheckAuthResponse.bind(this));

    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent(SERVICE.CHECK_AUTH);
    }

    _onCheckAuthResponse({isAuth}) {
        if (!isAuth) {
            this._eventBus.triggerEvent(ROUTER.TO_SIGNIN);
            return;
        }
        this._gameoptionsPopup = this.el.querySelector('.js-game-options-popup');
        this._firstUserBlock = this.el.querySelector('.js-first');
        this._secondUserBlock = this.el.querySelector('.js-second');
        this._board = this.el.querySelector('.js-board-section');

        const backToMenu = this.el.querySelectorAll('.js-menu-back-x-mark');
        backToMenu.forEach((button) => {
            button.addEventListener('click', ()=> {
                this._eventBus.triggerEvent(ROUTER.BACK_TO_MENU);
            });
        });

        this._initPopup();

        this._topElement = this.el.querySelector('.game');

    }

    _hideAll(){
        this._firstUserBlock.classList.add('hidden');
        this._secondUserBlock.classList.add('hidden');
        this._board.classList.add('hidden');
    }

    _showAll(){
        this._firstUserBlock.classList.remove('hidden');
        this._secondUserBlock.classList.remove('hidden');
        this._board.classList.remove('hidden');
    }

    _initPopup() {
        const buttons = this._gameoptionsPopup.querySelectorAll('.js-game-option-button');

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                this._eventBus.triggerEvent(GAME.FIND_ROOM, {duration: +button.value});

            })
        });

        this._hideAll();
        this._gameoptionsPopup.classList.remove('hidden');
    }

    _onStartGame({duration, rival, you,  color}) {
        this._renderFirstUserBlock({duration, user: you});
        this._renderSecondUserBlock({duration, user:rival});
        this._startTimer({color});

        this._renderBoard({color});

        this._showAll();
        this._gameoptionsPopup.classList.add('hidden');
    }

    _startTimer({color}) {
        if (color === COLOR.WHITE) {
            this._timerFirst.start();
        } else {
            this._timerSecond.start();
        }
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


    _onGameOver({turn}){
        this._timerFirst.stop();
        this._timerSecond.stop();

        this._showWinnerPopup({turn});
    }

    _showWinnerPopup({turn}) {

        let popup = this.el.querySelector('.js-winner-popup');
        popup.classList.remove('hidden');


        if (!turn) {
            popup.querySelector('.js-white-winner').classList.remove('hidden');
        } else {
            popup.querySelector('.js-black-winner').classList.remove('hidden');
        }
    }

    _renderBoard({color}) {
        this._gameView.render(this._board, {color});
    }

    _renderFirstUserBlock({duration = 600, user = {}} = {}) {
        this._firstUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({isFirst: true, user: user, isOnline: true}));
        this._firstAvatar = this._firstUserBlock.querySelector('.js-first-avatar');
        this._firstAvatar.style.backgroundImage = `url(${user.avatar})`;

        this._timerFirstElement = this.el.querySelector('.js-timer-first');
        this._timerFirst = new Timer({root: this._timerFirstElement, duration});
        this._timerFirst.render();

        this._whiteFiguresElement = this.el.querySelector('.js-figures-white');
        this._whiteFigures = new IconPresenter({root: this._whiteFiguresElement});
        this._whiteFigures.render();

        this._buttonSurrenderFirst = this.el.querySelector('.js-surrender-first');
        this._buttonSurrenderFirst.addEventListener('click', () => {
            this._onGameOver({turn: true})
        });
    }

    _renderSecondUserBlock({duration = 600, user = {}} = {}) {
        this._secondUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({isFirst: false, user: user, isOnline: true}));
        this._secondAvatar = this._secondUserBlock.querySelector('.js-second-avatar');
        this._secondAvatar.style.backgroundImage = `url(${user.avatar})`;

        this._timerSecondElement = this.el.querySelector('.js-timer-second');
        this._timerSecond = new Timer({root: this._timerSecondElement, duration});
        this._timerSecond.render();

        this._blackFiguresElement = this.el.querySelector('.js-figures-black');
        this._blackFigures = new IconPresenter({root: this._blackFiguresElement});
        this._blackFigures.render();
    }
}
