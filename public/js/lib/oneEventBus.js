import EventBus from "./eventbus";

const defaultEvent = "";

export default class OneEventBus {
    constructor(){
        this._eventBus = new EventBus([defaultEvent]);
    }

    subscribe(callback){
        this._eventBus.subscribeToEvent(defaultEvent, callback);
    }

    trigger(data){
        debugger;
        this._eventBus.triggerEvent(defaultEvent, data)
    }
}