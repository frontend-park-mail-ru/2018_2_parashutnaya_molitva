export default class ScoreboardModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('load', this._onLoad.bind(this));
    }

    _onLoad() {
        this._getDataJson((data) => {
            this._eventBus.triggerEvent('loadResponse', data);
        });
        this._eventBus.triggerEvent('loadWaiting');
    }

    _getDataJson(callback) {
        return fetch('/api/scoreboard').then(res => res.json()).then(callback).catch();
    }
}
