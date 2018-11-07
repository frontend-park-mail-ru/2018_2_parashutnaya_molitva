import Api from "../lib/api";
import Game from "../lib/chess/game";

export default class GameOnlineModel {
    constructor({eventBus = {}} = {}) {
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('tryMove', this._onTryMove.bind(this));
        this._game = new Game();
    }

    initGameConnection({roomid = ''} = {}) {
        this._ws = new WebSocket(Api.getGameAddress());
        this._ws.onopen = () => {
            this._ws.send(JSON.stringify({MsgType: "init", Data: {roomid}}));
        };

        this._ws.onerror = (event) => {
            // Добавить реконнект
            console.log("On error" + event.message);
        };

        this._ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            switch (msg.MsgType) {
                case "start":
                    this._eventBus.triggerEvent('startGame', msg.Data);
                    break;
                case "turn":
                    this._game.move(msg.Data.turn);
                    this._eventBus.triggerEvent('moveSuccess', this._game.boardString());
                    break;
                case "result":
                    this._eventBus.triggerEvent('gameOver', msg.Data);
                    break;
                case "error":
                    this._eventBus.triggerEvent('errorResp', msg.Data);
                    break;
            }
            console.log("On message" + event.data);
        };

        this._ws.onclose = (event) => {
            console.log("Close - Code: " + event.code + " reason" + event.reason);
            this._eventBus.triggerEvent('onClose'. event)
        };
    }

    _onTryMove(data) {
        if (!data.turn) {
            console.log("no turn");
            return;
        }

        let turn = {
            MsgType: "turn",
            Data: {
                turn: data.turn,
            }
        };

        this._ws.send(JSON.stringify(turn));
    }

}