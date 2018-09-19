export default class ScoreboardModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('load', this._onLoad.bind(this));
    }

    _onLoad() {
        this._getData((data) => {
            this._eventBus.triggerEvent('loadResponse', data);
        });
    }

    _getData(callback) {
        return fetch('/api/scoreboard').then(res => res.json()).then(callback);
    }
}
