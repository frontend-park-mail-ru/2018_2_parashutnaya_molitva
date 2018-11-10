import template from './gameOnline.tmpl.xml';
import View from "../../lib/view";
import Board from "../../components/chess/board";
import {COLOR} from "../../components/chess/consts";
export default class GameOnlineView extends View{
    constructor({eventBus = {}} = {}){
        super(template, eventBus);

        this._eventBus.subscribeToEvent('moveSuccess', this._onMoveSuccess.bind(this));
        this._eventBus.subscribeToEvent('moveFailure', this._onMoveFailure.bind(this));
        this._eventBus.subscribeToEvent('gameOver', this._onGameOver.bind(this));
        this._eventBus.subscribeToEvent('errorResp', this._onErrorResp.bind(this));
        this._eventBus.subscribeToEvent('errorResp', this._onErrorResp.bind(this));
    }

    render(root, data = {}){
        super.render(root, data);

        if (data.color === "w") {
            this._board = new Board({moveCallback: this._moveCallback.bind(this), sideOfView: COLOR.WHITE});
        } else {
            this._board = new Board({moveCallback: this._moveCallback.bind(this), sideOfView: COLOR.BLACK});
        }

        this._whoisTurn = this.el.querySelector(".js-turn");

        const singlePlayerElement = this.el.querySelector('.singleplayer');
        this._fullSingleplayer = this.el.querySelector('.game');
        this._board.render(singlePlayerElement);
    }

    _moveCallback (move) {
        this._eventBus.triggerEvent('tryMove', {turn:move});
    }

    _onMoveSuccess (state, turn) {
        console.log('making a move', state);
        const singlePlayerElement = this.el.querySelector('.singleplayer');
        this._board.setState({ boardState: state });
        this._board.setState({ boardState: state, turn: turn });
        this._board.render(singlePlayerElement);
        console.log("Turn: " + turn);
        if (!turn) {
            console.log(turn);
            this._whoisTurn.innerHTML = "Turn: black"
        } else {
            console.log(turn);
            this._whoisTurn.innerHTML = "Turn: white"
        }

    }

    _onMoveFailure () {
        console.log('move is illegal');
    }

    _onGameOver (data) {
        const gameOver = this.el.querySelector(".js-gameover");
        gameOver.classList.remove('hidden');

        // const singlePlayerElement = this.el.querySelector('.singleplayer');
        // singlePlayerElement.classList.add('hidden');
        this._fullSingleplayer.classList.add('hidden');

        const jsResult = this.el.querySelector('.js-result');
        if (data.result = "w") {
            jsResult.innerHTML = "Winner"
        } else if (data.result = "l") {
            jsResult.innerHTML = "Loser"
        }

    }

    _onErrorResp(data){
        console.log(data.error)
    }

    _onClose(event){
        console.log("")
    }

}