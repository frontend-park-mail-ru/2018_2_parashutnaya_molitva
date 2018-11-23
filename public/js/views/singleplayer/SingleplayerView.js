import './singleplayer.less';
import View from '../../lib/view';
import template from './singleplayer.tmpl.xml';
import GameView from "../game/GameView";
import Timer from '../../components/timer/timer';
import IconPresenter from '../../components/icons-presenter/iconsPresenter';
import userBlockTemplate from '../../components/userblock/userblock.xml';
import Piece from '../../components/chess/piece';
import {GAME, ROUTER} from "../../lib/eventbus/events";

const BLACK_COLOR_BACKGROUND = "#7f8b9575";

export default class SingleplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._gameView = new GameView({eventBus});

        this._eventBus.subscribeToEvent(GAME.MOVE_SUCCESS, this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent(GAME.GAMEOVER, this._onGameOver.bind(this));

    }

    render (root, data = {}) {
        super.render(root, data);
        this._gameoptionsPopup = this.el.querySelector('.js-game-options-popup');
        this._firstUserBlock = this.el.querySelector('.js-first');
        this._secondUserBlock = this.el.querySelector('.js-second');
        this._board = this.el.querySelector('.js-board-section');

        const backToMenu = this.el.querySelectorAll('.js-menu-back-x-mark');
        backToMenu.forEach((button) => {
           button.addEventListener('click', ()=>{
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

               this._renderBoard();
               this._renderFirstUserBlock({duration: button.value});
               this._renderSecondUserBlock({duration: button.value});

               this._startGame();

               this._showAll();
               this._gameoptionsPopup.classList.add('hidden');
           })
        });


        this._hideAll();
        this._gameoptionsPopup.classList.remove('hidden');
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

    _whiteTimerExpire() {
        console.log("Black win");
        this._timerSecond.stop();
    }

    _blackTimerExpire() {
        console.log("White win");
        this._timerFirst.stop();
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

    _renderBoard() {
        this._gameView.render(this._board);
    }

    _renderFirstUserBlock({duration = 600} = {}) {
        this._firstUserBlock.insertAdjacentHTML('afterbegin',userBlockTemplate({isFirst: true}));

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

    _renderSecondUserBlock({duration = 600} = {}) {
        this._secondUserBlock.insertAdjacentHTML('afterbegin', userBlockTemplate({isFirst: false}));

        this._timerSecondElement = this.el.querySelector('.js-timer-second');
        this._timerSecond = new Timer({root: this._timerSecondElement, duration});
        this._timerSecond.render();

        this._blackFiguresElement = this.el.querySelector('.js-figures-black');
        this._blackFigures = new IconPresenter({root: this._blackFiguresElement});
        this._blackFigures.render();

        this._buttonSurrenderSecond = this.el.querySelector('.js-surrender-second');
        this._buttonSurrenderSecond.addEventListener('click', () => {
            this._onGameOver({turn: false})
        });
    }

}
