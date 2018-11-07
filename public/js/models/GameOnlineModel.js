import Api from "../lib/api";

export default class GameOnlineModel {
    constructor({eventBus = {}} = {}){
        this._eventBus = eventBus;

        this._eventBus.subscribeToEvent('sendTurn', this._sendTurn.bind(this))
    }

    initGameConnection({roomid = ''} = {}){
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
                     this._eventBus.triggerEvent('startGame', msg.color);
                     break;
                case "turn":
                    this._eventBus.triggerEvent('turn', msg.turn);
                    break;
            }
            console.log("On message" + event.data);
        };

        this._ws.onclose = (event) => {
            console.log("On close" + event.reason);
        };
    }

    _sendTurn(data){
        if (!data.turn){
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