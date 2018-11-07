import Api from "./api";
import EventBus from "./eventbus";
import OneEventBus from "./oneEventBus";

export default class Websocket {
    constructor(){
        this.onMessage = new OneEventBus();
        this.onConnect = new OneEventBus();
        this.onClose = new OneEventBus();
        this.onError = new OneEventBus();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this._ws = new WebSocket(Api.getGameAddress());
            this._ws.onmessage = (event) => this.onMessage.trigger(event);
            this._ws.onclose = (event) => this.onClose.trigger(event);
            this._ws.onopen = () => resolve();
            this._ws.onerror = (event) => reject(event);
        });
    }
}